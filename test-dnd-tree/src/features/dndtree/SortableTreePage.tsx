import { Box } from "@mui/material";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "rc-tree/assets/index.css";
import { ItemType, initialItems } from "./initialItems";

export default function SortableTreePage() {
  const [state, setState] = useState<ItemType[]>(initialItems);

  return (
    <Box>
      <ReactSortable
        list={state}
        setList={(newState) => {
          console.log("ROOT", newState);
          setState(newState);
        }}
        group={"tree"}
        animation={150}
        fallbackOnBody={true}
        swapThreshold={0.65}
      >
        {state.map((item) => (
          <Box key={item.id} sx={{ pl: 1 }}>
            <Box>{item.label}</Box>
            <Box>
              {item.children &&
                item.children.map((child) => <Box>- {child.label}</Box>)}
            </Box>
          </Box>
        ))}
      </ReactSortable>
    </Box>
  );
}
