import dotenv from 'dotenv';
import { EJSON } from 'bson';
import { MongoClient } from 'mongodb';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

dotenv.config({ path: '.env.local' });

async function main() {
  if (!process.argv.includes('--yes')) throw new Error('Add --yes to confirm creating a live Atlas backup.');
  const uri = process.env.ATLAS_DATABASE_URL;
  if (!uri) throw new Error('ATLAS_DATABASE_URL is not set.');
  const databaseName = 'thucsys';
  const stamp = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).replace(/[-: ]/g, '').slice(0, 14);
  const relativeDirectory = `backups/atlas-json-${stamp}`;
  const directory = path.join(process.cwd(), relativeDirectory);
  await mkdir(directory, { recursive: true });

  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(databaseName);
    const collections = await db.listCollections({}, { nameOnly: true }).toArray();
    const manifest: Array<{ collection: string; documents: number; indexes: number }> = [];
    for (const { name } of collections) {
      const collection = db.collection(name);
      const [documents, indexes] = await Promise.all([collection.find({}).toArray(), collection.indexes()]);
      const dataFile = path.join(directory, `${name}.ejson`);
      const indexFile = path.join(directory, `${name}.indexes.ejson`);
      await writeFile(dataFile, EJSON.stringify(documents, { relaxed: false }), 'utf8');
      await writeFile(indexFile, EJSON.stringify(indexes, { relaxed: false }), 'utf8');
      // Read and parse immediately so a partial/corrupt export never counts as a valid backup.
      EJSON.parse(await readFile(dataFile, 'utf8'), { relaxed: false });
      EJSON.parse(await readFile(indexFile, 'utf8'), { relaxed: false });
      manifest.push({ collection: name, documents: documents.length, indexes: indexes.length });
    }
    await writeFile(
      path.join(directory, 'manifest.json'),
      JSON.stringify({ database: databaseName, createdAt: new Date().toISOString(), collections: manifest }, null, 2),
      'utf8'
    );
    await writeFile(path.join(process.cwd(), 'backups', 'LATEST'), relativeDirectory, 'utf8');
    console.log(`BACKUP_PATH=${relativeDirectory}`);
    console.log(`COLLECTIONS=${manifest.length}`);
    console.log(`DOCUMENTS=${manifest.reduce((sum, item) => sum + item.documents, 0)}`);
    console.log('EJSON_OK');
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
