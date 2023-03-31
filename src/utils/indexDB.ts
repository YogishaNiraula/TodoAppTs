import { openDB } from "idb";
const indexedDB = window.indexedDB;

type TransactionFn = (tx: any) => Promise<any> | any;
type TransactionMode = "readwrite" | "readonly";

export async function insertDataInDB() {
  const db = await openDB("TODO_Projects", 1, {
    upgrade(db) {
      db.createObjectStore("projects", { keyPath: "id" });
    },
  });
  const transaction = db.transaction("projects", "readwrite");
  await transaction.done;
}

export async function withProjectDB(
  fn: TransactionFn,
  mode: TransactionMode = "readwrite",
) {
  try {
    const db = await openDB("TODO_Projects", 1);
    const tx = db.transaction("projects", mode);
    const output = await fn(tx);
    await tx.done;
    return output;
  } catch (error) {
    console.log(error);
  }
}
