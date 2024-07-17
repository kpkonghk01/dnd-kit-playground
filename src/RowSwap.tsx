import {
  closestCorners,
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GridContext } from "./GridContext";
import { useCallback, useContext } from "react";
import Row from "./components/Row";

const RowSwap = () => {
  const { grid, setGrid } = useContext(GridContext);

  const getRowIdx = useCallback(
    (id: UniqueIdentifier) => grid.findIndex((row) => row.id === id),
    [grid]
  );

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
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={grid} strategy={verticalListSortingStrategy}>
        <table
          style={{
            marginTop: "50.5px",
          }}
          className="grid-swap"
        >
          <tbody>
            {grid.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
};

export default RowSwap;
