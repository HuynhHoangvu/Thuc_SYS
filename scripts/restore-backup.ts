import { EJSON } from 'bson';
import { MongoClient } from 'mongodb';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

// Restores a backups/atlas-json-* folder (made by backup-atlas.ts) into another MongoDB.
// Never overwrites: a collection that already holds documents is skipped, so it is safe to re-run.
// RESTORE_TARGET_URL must name the database, e.g. mongodb://user:pass@host:port/thucsys?authSource=admin
async function main() {
  if (!process.argv.includes('--yes')) throw new Error('Add --yes to confirm restoring into the target database.');
  const uri = process.env.RESTORE_TARGET_URL;
  if (!uri) throw new Error('RESTORE_TARGET_URL is not set.');
  const dirArg = process.argv.find((a) => a.startsWith('--dir='))?.slice(6);
  const directory = path.resolve(dirArg ?? (await readFile('backups/LATEST', 'utf8')).trim());
  const databaseName = new URL(uri).pathname.replace(/^\//, '') || 'thucsys';

  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(databaseName);
    const files = (await readdir(directory)).filter((f) => f.endsWith('.ejson') && !f.endsWith('.indexes.ejson'));
    for (const file of files) {
      const name = file.replace(/\.ejson$/, '');
      const docs = EJSON.parse(await readFile(path.join(directory, file), 'utf8'), { relaxed: false }) as Record<string, unknown>[];
      const collection = db.collection(name);
      if ((await collection.estimatedDocumentCount()) > 0) {
        console.log(`${name}: skipped (target already has documents)`);
        continue;
      }
      if (docs.length) await collection.insertMany(docs);
      const indexes = EJSON.parse(await readFile(path.join(directory, `${name}.indexes.ejson`), 'utf8'), { relaxed: false }) as Array<
        Record<string, unknown> & { name: string; key: Record<string, 1 | -1> }
      >;
      for (const { key, name: indexName, v: _v, ns: _ns, ...options } of indexes) {
        if (indexName === '_id_') continue;
        await collection.createIndex(key, { name: indexName, ...options });
      }
      console.log(`${name}: ${docs.length} documents`);
    }
    console.log('RESTORE_OK');
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
