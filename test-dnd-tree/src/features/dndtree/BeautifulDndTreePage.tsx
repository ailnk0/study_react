import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableStateSnapshot,
  DraggableLocation,
} from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import { useState } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

type Item = {
  id: string;
  label: string;
  children: Item[];
};

const initialItems: Item = {
  id: "root",
  label: "Root",
  children: [
    {
      id: "grid",
      label: "Grid",
      children: [
        {
          id: "grid-community",
          label: "Grid-community",
          children: [
            {
              id: "grid-community-free",
              label: "Grid-community-free",
              children: [],
            },
          ],
        },
        { id: "grid-pro", label: "Grid-pro", children: [] },
        { id: "grid-premium", label: "Grid-premium", children: [] },
      ],
    },
    {
      id: "pickers",
      label: "Pickers",
      children: [
        { id: "pickers-community", label: "Pickers-community", children: [] },
        { id: "pickers-pro", label: "Pickers-pro", children: [] },
      ],
    },
  ],
};

function searchTree(item: Item, id: string): Item | undefined {
  if (item.id == id) {
    return item;
  } else if (item.children.length > 0) {
    let i;
    let result: Item | undefined = undefined;
    for (i = 0; result == null && i < item.children.length; i++) {
      result = searchTree(item.children[i], id);
    }
    return result;
  }
  return undefined;
}

export default function BeautifulDndTreePage() {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const temp = JSON.parse(JSON.stringify(items)) as Item;
    const sourceItem = searchTree(temp, source.droppableId);
    const destinationItem = searchTree(temp, destination.droppableId);
    if (!sourceItem || !destinationItem) {
      return;
    }

    const [removed] = sourceItem.children.splice(source.index, 1);
    destinationItem.children.splice(destination.index, 0, removed);

    setItems(temp);
  };

  const WsTreeItem = (target: Item, level: number = 0) =>
    target.children.length > 0 && (
      <Droppable droppableId={target.id} type={level.toString()}>
        {(
          dpProvided: DroppableProvided,
          dpSnapshot: DroppableStateSnapshot
        ) => (
          <Box
            sx={{
              background: dpSnapshot.isDraggingOver ? "aqua" : "transparent",
            }}
            ref={dpProvided.innerRef}
            {...dpProvided.droppableProps}
          >
            {target.children.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(
                  dgProvided: DraggableProvided,
                  dgSnapshot: DraggableStateSnapshot
                ) => (
                  <TreeItem
                    nodeId={item.id}
                    label={item.label}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      background: dgSnapshot.isDragging
                        ? "lightgreen"
                        : "transparent",
                    }}
                    ref={dgProvided.innerRef}
                    {...dgProvided.draggableProps}
                    {...dgProvided.dragHandleProps}
                  >
                    {WsTreeItem(item, level + 1)}
                  </TreeItem>
                )}
              </Draggable>
            ))}
            {dpProvided.placeholder}
          </Box>
        )}
      </Droppable>
    );

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <SimpleTreeView>{WsTreeItem(items)}</SimpleTreeView>
      </DragDropContext>
    </Box>
  );
}
