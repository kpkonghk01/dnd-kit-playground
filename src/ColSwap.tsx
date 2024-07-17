import { useCallback, useContext } from "react";
import { GridContext } from "./GridContext";
import { RowData } from "./components/Row";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import Col, { ColData } from "./components/Col";

const ColSwap = () => {
  const { grid, setGrid } = useContext(GridContext);
  const { originalRowIds, colGrid } = gridRestructure(grid);

  const getColIdx = useCallback(
    (id: UniqueIdentifier) => colGrid.findIndex((col) => col.id === id),
    [colGrid]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setGrid(() => {
      const from = getColIdx(active.id);
      const to = getColIdx(over.id);

      const newColGrid = arrayMove(colGrid, from, to);

      return reconstructRowGrid(originalRowIds, newColGrid);
    });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={colGrid} strategy={horizontalListSortingStrategy}>
        <div
          className="fake-table grid-swap"
          style={{
            marginLeft: "40.5px",
          }}
        >
          {colGrid.map((col) => (
            <Col key={col.id} col={col} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ColSwap;

function gridRestructure(grid: RowData[]): {
  originalRowIds: RowData["id"][];
  colGrid: ColData[];
} {
  // Group cells by column
  const columns: ColData[] = [];
  grid.forEach((row) => {
    row.children.forEach((cell, i) => {
      if (!columns[i]) {
        columns[i] = { id: `col-${cell.id}`, children: [] };
      }

      columns[i].children.push({ ...cell, rowId: row.id });
    });
  });

  return {
    originalRowIds: grid.map((row) => row.id),
    colGrid: columns,
  };
}

function reconstructRowGrid(
  originalRowIds: RowData["id"][],
  colGrid: ColData[]
): RowData[] {
  const rows: RowData[] = [];

  originalRowIds.forEach((rowId, i) => {
    rows.push({
      id: rowId,
      children: colGrid.map((col) => col.children[i]),
    });
  });

  return rows;
}
