import { Box } from "@mui/material";
import { useState } from "react";
import {
  DropResult,
  DraggableLocation,
  DroppableProvided,
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

const reorder = (
  list: unknown[],
  startIndex: number,
  endIndex: number
): unknown[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type ReorderQuoteMapArgs = {
  quoteMap: QuoteMap;
  source: DraggableLocation;
  destination: DraggableLocation;
};

export type ReorderQuoteMapResult = {
  quoteMap: QuoteMap;
};

const reorderQuoteMap = ({
  quoteMap,
  source,
  destination,
}: ReorderQuoteMapArgs): ReorderQuoteMapResult => {
  const current: Quote[] = [...quoteMap[source.droppableId]];
  const next: Quote[] = [...quoteMap[destination.droppableId]];
  const target: Quote = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(
      current,
      source.index,
      destination.index
    ) as Quote[];
    const result: QuoteMap = {
      ...quoteMap,
      [source.droppableId]: reordered,
    };
    return {
      quoteMap: result,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result: QuoteMap = {
    ...quoteMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    quoteMap: result,
  };
};

type Quote = {
  id: string;
  content: string;
};

export type QuoteMap = {
  [key: string]: Quote[];
};

type State = {
  columns: QuoteMap;
  ordered: string[];
};

export default function BeautifulDndCardPage() {
  const [state, setState] = useState<State>({
    columns: {
      c1: [
        { id: "q1", content: "quote 1" },
        { id: "q2", content: "quote 2" },
      ],
      c2: [{ id: "q3", content: "quote 3" }],
      c3: [{ id: "q4", content: "quote 4" }],
    },
    ordered: ["c1", "c2", "c3"],
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === "COLUMN") {
      const ordered: string[] = reorder(
        state.ordered,
        source.index,
        destination.index
      ) as string[];

      setState({
        ...state,
        ordered,
      });

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: state.columns,
      source,
      destination,
    });

    setState({
      ...state,
      columns: data.quoteMap,
    });
  };

  const QuoteList = (listId: string, quotes: Quote[]) => (
    <Droppable droppableId={listId}>
      {(dropProvided: DroppableProvided) => (
        <Box
          sx={{ height: "100%", overflow: "auto" }}
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
        >
          {quotes.map((quote: Quote, index: number) => (
            <Draggable key={quote.id} draggableId={quote.id} index={index}>
              {(
                provided: DraggableProvided,
                snapshot: DraggableStateSnapshot
              ) => (
                <Box
                  sx={{
                    border: 1,
                    borderColor: "lightgrey",
                    background: snapshot.isDragging
                      ? "lightgreen"
                      : "transparent",
                  }}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Box sx={{ m: 1 }}>{quote.content}</Box>
                </Box>
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </Box>
      )}
    </Droppable>
  );

  const Column = (
    id: string,
    title: string,
    index: number,
    quotes: Quote[]
  ) => (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Box
          sx={{
            p: 1,
            m: 1,
            border: 1,
            borderColor: "lightgrey",
            display: "flex",
            flexDirection: "column",
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Box
            sx={{
              p: 1,
              background: snapshot.isDragging ? "lightgreen" : "transparent",
            }}
            {...provided.dragHandleProps}
          >
            {title}
          </Box>
          <Box sx={{ flexGrow: 1 }}>{QuoteList(id, quotes)}</Box>
        </Box>
      )}
    </Draggable>
  );

  const Board = (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping
    >
      {(provided: DroppableProvided) => (
        <Box
          sx={{
            minHeight: 200,
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {state.ordered.map((key: string, index: number) =>
            Column(key, key, index, state.columns[key])
          )}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>{Board}</DragDropContext>
    </Box>
  );
}
