import { PrismaClient } from "../generated/prisma/index.js";
import { prismaAdapter } from "../config/database.js";
import fs from "fs";
import path from "path";

const originalPrisma = new PrismaClient({ adapter: prismaAdapter });

// Path to local JSON fallback database
const LOCAL_DB_PATH = path.join(process.cwd(), "lib", "local_db.json");

// Helper to read local JSON
function readLocalDb() {
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    // Write default structure to mimic a fresh database
    const defaultData = {
      columns: [
        { id: "col-1", title: "Khách hàng mới", order: 0 },
        { id: "col-2", title: "Đang tư vấn", order: 1 },
        { id: "col-3", title: "Chờ xử lý", order: 2 },
        { id: "col-4", title: "Thành công", order: 3 }
      ],
      tasks: [],
      activities: [],
      notifications: []
    };
    fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(defaultData, null, 2), "utf8");
    return defaultData;
  }
  try {
    return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
  } catch (e) {
    return { columns: [], tasks: [], activities: [], notifications: [] };
  }
}

// Helper to write local JSON
function writeLocalDb(data) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

// Emulated local handlers for Prisma operations
const localHandlers = {
  column: {
    findMany: async (args) => {
      const db = readLocalDb();
      let cols = [...db.columns];
      cols.sort((a, b) => a.order - b.order);
      if (args && args.include && args.include.tasks) {
        cols = cols.map(col => {
          const colTasks = db.tasks.filter(t => t.columnId === col.id);
          if (args.include.tasks.include && args.include.tasks.include.activities) {
            colTasks.forEach(t => {
              t.activities = db.activities
                .filter(act => act.taskId === t.id)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            });
          }
          return { ...col, tasks: colTasks };
        });
      }
      return cols;
    },
    create: async (args) => {
      const db = readLocalDb();
      const newCol = {
        id: args.data.id,
        title: args.data.title,
        order: args.data.order || 0
      };
      db.columns.push(newCol);
      writeLocalDb(db);
      return newCol;
    },
    update: async (args) => {
      const db = readLocalDb();
      const colId = args.where.id;
      const index = db.columns.findIndex(c => c.id === colId);
      if (index !== -1) {
        db.columns[index] = { ...db.columns[index], ...args.data };
      }
      writeLocalDb(db);
      return db.columns[index];
    },
    delete: async (args) => {
      const db = readLocalDb();
      const colId = args.where.id;
      db.columns = db.columns.filter(c => c.id !== colId);
      writeLocalDb(db);
      return { id: colId };
    }
  },
  task: {
    findMany: async (args) => {
      const db = readLocalDb();
      return db.tasks;
    },
    findUnique: async (args) => {
      const db = readLocalDb();
      return db.tasks.find(t => t.id === args.where.id) || null;
    },
    create: async (args) => {
      const db = readLocalDb();
      const newTask = {
        ...args.data,
        createdAt: args.data.createdAt || new Date().toISOString()
      };
      db.tasks.push(newTask);
      writeLocalDb(db);
      return newTask;
    },
    update: async (args) => {
      const db = readLocalDb();
      const taskId = args.where.id;
      const index = db.tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        db.tasks[index] = { ...db.tasks[index], ...args.data };
      }
      writeLocalDb(db);
      return db.tasks[index];
    },
    delete: async (args) => {
      const db = readLocalDb();
      const taskId = args.where.id;
      db.tasks = db.tasks.filter(t => t.id !== taskId);
      writeLocalDb(db);
      return { id: taskId };
    },
    deleteMany: async (args) => {
      const db = readLocalDb();
      if (args && args.where && args.where.columnId) {
        db.tasks = db.tasks.filter(t => t.columnId !== args.where.columnId);
      }
      writeLocalDb(db);
      return { count: 0 };
    }
  },
  activity: {
    create: async (args) => {
      const db = readLocalDb();
      const newAct = {
        ...args.data,
        id: args.data.id || `act-${Date.now()}`,
        createdAt: args.data.createdAt || new Date().toISOString()
      };
      db.activities.push(newAct);
      writeLocalDb(db);
      return newAct;
    },
    update: async (args) => {
      const db = readLocalDb();
      const actId = args.where.id;
      const index = db.activities.findIndex(a => a.id === actId);
      if (index !== -1) {
        db.activities[index] = { ...db.activities[index], ...args.data };
      }
      writeLocalDb(db);
      return db.activities[index];
    },
    delete: async (args) => {
      const db = readLocalDb();
      const actId = args.where.id;
      db.activities = db.activities.filter(a => a.id !== actId);
      writeLocalDb(db);
      return { id: actId };
    },
    deleteMany: async (args) => {
      const db = readLocalDb();
      if (args && args.where && args.where.taskId && args.where.taskId.in) {
        const ids = args.where.taskId.in;
        db.activities = db.activities.filter(a => !ids.includes(a.taskId));
      }
      writeLocalDb(db);
      return { count: 0 };
    }
  },
  notification: {
    create: async (args) => {
      const db = readLocalDb();
      const newNotif = {
        id: `notif-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...args.data
      };
      db.notifications.push(newNotif);
      writeLocalDb(db);
      return newNotif;
    },
    findMany: async (args) => {
      const db = readLocalDb();
      return db.notifications;
    }
  }
};

function makeModelProxy(modelName) {
  return new Proxy({}, {
    get(target, prop) {
      return async (...args) => {
        try {
          return await originalPrisma[modelName][prop](...args);
        } catch (error) {
          const errMsg = error.message || "";
          const isConnError =
            error.code === 'ECONNREFUSED' ||
            error.code === 'P1000' ||
            error.code === 'P1001' ||
            error.code === 'P1002' ||
            error.code === 'P1003' ||
            error.code === 'P1008' ||
            error.code === 'P1017' ||
            errMsg.includes('conn') ||
            errMsg.includes('Credentials') ||
            errMsg.includes('Authentication') ||
            errMsg.includes('denied');

          if (isConnError) {
            console.warn(`⚠️ Local Fallback: Database offline or connection failed (${error.code || 'ERR'}). Redirecting ${modelName}.${prop} to local JSON storage.`);
            if (localHandlers[modelName] && localHandlers[modelName][prop]) {
              return await localHandlers[modelName][prop](...args);
            }
            console.error(`❌ Local handler not implemented for ${modelName}.${prop}`);
          }
          throw error;
        }
      };
    }
  });
}

const prisma = new Proxy({}, {
  get(target, prop) {
    if (localHandlers[prop]) {
      return makeModelProxy(prop);
    }
    return originalPrisma[prop];
  }
});

export { prisma };
