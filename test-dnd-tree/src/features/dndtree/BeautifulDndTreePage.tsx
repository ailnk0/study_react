import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import { useState } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { initialItems } from "./initialItems";

export default function BeautifulDndTreePage() {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(startIndex, 1);
    newItems.splice(endIndex, 0, removed);

    setItems(newItems);
  };

  return (
    <Box sx={{ minHeight: 200, flexGrow: 1, maxWidth: 400 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <SimpleTreeView>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TreeItem nodeId={item.id} label={item.label}>
                          {item.children?.map((child) => (
                            <TreeItem
                              key={child.id}
                              nodeId={child.id}
                              label={child.label}
                            />
                          ))}
                        </TreeItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </SimpleTreeView>
      </DragDropContext>
    </Box>
  );
}