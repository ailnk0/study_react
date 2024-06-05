import { openDB } from "idb";
import { HDBSchema, ItemType, StoreName } from "./dataSchema";
import { v4 as uuidv4 } from "uuid";

export class DataApi {
  static async initDB() {
    const db = await openDB<HDBSchema>("hdb", 1, {
      upgrade(db) {
        db.createObjectStore("wsItems", { keyPath: "id" }).createIndex(
          "by-updated",
          "updated",
          { unique: false }
        );
        db.createObjectStore("colItems", { keyPath: "id" }).createIndex(
          "by-updated",
          "updated",
          { unique: false }
        );
      },
    });
    return db;
  }

  static async save(storeName: StoreName, item: ItemType): Promise<ItemType> {
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

    return item;
  }

  static async findById(
    storeName: StoreName,
    id: string
  ): Promise<ItemType | undefined> {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const item = await tx.objectStore(storeName).get(id);
    await tx.done;
    return item;
  }

  static async findAll(storeName: StoreName): Promise<ItemType[]> {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const items = await tx.objectStore(storeName).getAll();
    await tx.done;
    return items;
  }

  static async deleteById(storeName: StoreName, id: string): Promise<void> {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readwrite");
    await tx.objectStore(storeName).delete(id);
    await tx.done;
  }

  static async existsById(storeName: StoreName, id: string): Promise<boolean> {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const exists = await tx.objectStore(storeName).get(id);
    await tx.done;
    return exists !== undefined;
  }

  static async count(storeName: StoreName): Promise<number> {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const count = await tx.objectStore(storeName).count();
    await tx.done;
    return count;
  }

  static async findAllByOrderByUpdatedDesc(
    storeName: StoreName
  ): Promise<ItemType[]> {
    const items = [];

    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const index = tx.objectStore(storeName).index("by-updated");

    let cursor = await index.openCursor(null, "prev");
    while (cursor) {
      items.push(cursor.value);
      cursor = await cursor.continue();
    }

    await tx.done;

    return items;
  }

  static async findPageByOrderByUpdatedDesc(
    storeName: StoreName,
    pageIndex: number,
    pageSize: number
  ): Promise<ItemType[]> {
    const items = [];
    const start = pageIndex * pageSize;

    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readonly");
    const index = tx.objectStore(storeName).index("by-updated");

    let cursor = await index.openCursor(null, "prev");
    if (start > 0 && cursor) {
      cursor = await cursor.advance(start);
    }

    while (cursor && items.length < pageSize) {
      items.push(cursor.value);
      cursor = await cursor.continue();
    }

    await tx.done;

    return items;
  }

  static async deleteAll(storeName: StoreName): Promise<void> {
    const db = await DataApi.initDB();
    const tx = db.transaction(storeName, "readwrite");
    await tx.objectStore(storeName).clear();
    await tx.done;
  }
}
