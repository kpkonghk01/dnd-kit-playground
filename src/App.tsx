import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import Row, { RowData } from "./components/Row";

function App() {
  const [grid, setGrid] = useState<RowData[]>([
    {
      id: "A",
      children: [{ id: "A1" }, { id: "A2" }, { id: "A3" }],
    },
    {
      id: "B",
      children: [{ id: "B1" }, { id: "B2" }, { id: "B3" }],
    },
    {
      id: "C",
      children: [{ id: "C1" }, { id: "C2" }, { id: "C3" }],
    },
  ]);

  const getRowIdx = (id: UniqueIdentifier) =>
    grid.findIndex((row) => row.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setGrid((tasks) => {
      const from = getRowIdx(active.id);
      const to = getRowIdx(over.id);

      return arrayMove(tasks, from, to);
    });
  };

  return (
    <main>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext items={grid} strategy={verticalListSortingStrategy}>
          <table>
            <tbody>
              {grid.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </main>
  );
}

export default App;
