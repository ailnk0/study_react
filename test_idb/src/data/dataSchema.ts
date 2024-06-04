import { DBSchema } from "idb";
import { WsItem } from "../entities/wsItem";
import { ColItem } from "../entities/colItem";

export type StoreName = "wsItems" | "colItems";
export type ItemType = WsItem | ColItem;

export interface HDBSchema extends DBSchema {
  wsItems: {
    key: string;
    value: WsItem;
    indexes: { "by-updated": number };
  };
  colItems: {
    key: string;
    value: ColItem;
    indexes: { "by-updated": number };
  };
}
