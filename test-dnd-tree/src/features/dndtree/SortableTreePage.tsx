import { Box } from "@mui/material";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { initialItems } from "./initialItems";

export default function SortableTreePage() {
  const [state, setState] = useState(initialItems);

  return (
    <Box>
      <ReactSortable
        list={state}
        setList={(newState) => {
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
                item.children.map((child) => (
                  <Box key={child.id}>{`- ${child.label}`}</Box>
                ))}
            </Box>
          </Box>
        ))}
      </ReactSortable>
    </Box>
  );
}
