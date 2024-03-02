export interface ItemType {
  id: string;
  label: string;
  children?: ItemType[];
}

export const initialItems: ItemType[] = [
  {
    id: "grid",
    label: "Grid",
    children: [
      { id: "grid-community", label: "Grid-community" },
      { id: "grid-pro", label: "Grid-pro" },
      { id: "grid-premium", label: "Grid-premium" },
    ],
  },
  {
    id: "pickers",
    label: "Pickers",
    children: [
      { id: "pickers-community", label: "Pickers-community" },
      { id: "pickers-pro", label: "Pickers-pro" },
    ],
  },
];
