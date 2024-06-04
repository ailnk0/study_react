import { openDB } from "idb";
import { HDBSchema, ItemType, StoreName } from "./dataSchema";
import { v4 as uuidv4 } from "uuid";

export class DataApi {
  static async initDB() {
    const db = await openDB<HDBSchema>("hdb", 1, {
      upgrade(db) {
        const wsStore = db.createObjectStore("wsItems", { keyPath: "id" });
        wsStore.createIndex("by-updated", "updated");

        const colStore = db.createObjectStore("colItems", {
          keyPath: "id",
        });
        colStore.createIndex("by-updated", "updated");
      },
    });
    return db;
  }

  static async save(storeName: StoreName, item: ItemType) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readwrite");

    const exists = await tx.objectStore(storeName).get(item.id);
    if (exists) {
      item.updated = Date.now();
      await tx.objectStore(storeName).put(item);
    } else {
      item.id = item.id || uuidv4();
      item.created = item.created || Date.now();
      item.updated = Date.now();
      await tx.objectStore(storeName).add(item);
    }
  }

  static async findById(storeName: StoreName, id: string) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const item = await tx.objectStore(storeName).get(id);
    await tx.done;
    return item;
  }

  static async findAll(storeName: StoreName) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const items = await tx.objectStore(storeName).getAll();
    await tx.done;
    return items;
  }

  static async deleteById(storeName: StoreName, id: string) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readwrite");
    await tx.objectStore(storeName).delete(id);
    await tx.done;
  }

  static async existsById(storeName: StoreName, id: string) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const exists = await tx.objectStore(storeName).get(id);
    await tx.done;
    return exists !== undefined;
  }

  static async count(storeName: StoreName) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const count = await tx.objectStore(storeName).count();
    await tx.done;
    return count;
  }

  static async findAllByUpdated(storeName: StoreName) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const indexStore = tx.objectStore(storeName).index("by-updated");

    const items = [];
    let cursor = await indexStore.openCursor(null, "prev");
    while (cursor) {
      items.push(cursor.value);
      cursor = await cursor.continue();
    }

    await tx.done;
    return items;
  }

  static async findLatest(storeName: StoreName, index: number, count: number) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const indexStore = tx.objectStore(storeName).index("by-updated");

    const items = [];
    let cursor = await indexStore.openCursor(null, "prev");

    let skipped = 0;
    while (cursor && skipped < index) {
      cursor = await cursor.continue();
      skipped++;
    }

    while (cursor && items.length < count) {
      items.push(cursor.value);
      cursor = await cursor.continue();
    }

    await tx.done;
    return items;
  }

  static async deleteAll(storeName: StoreName) {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readwrite");
    await tx.objectStore(storeName).clear();
    await tx.done;
  }
}
