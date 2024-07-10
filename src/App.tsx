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
import {useState} from "react";
import {RowData} from "./components/Row";
import styled from 'styled-components'
import Cell from "./components/Cell.tsx";

function App() {
    const [grid, setGrid] = useState<RowData[]>([
        {
            id: "A",
            children: [{id: "A1"}, {id: "A2"}, {id: "A3"}],
        },
        {
            id: "B",
            children: [{id: "B1"}, {id: "B2"}, {id: "B3"}],
        },
        {
            id: "C",
            children: [{id: "C1"}, {id: "C2"}, {id: "C3"}],
        },
    ]);

    const getRowIdx = (id: UniqueIdentifier) =>
        grid.findIndex((row) => row.id === id);

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

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
                    <StyledTable>
                        {grid.map((row, rowIdx) => {
                                return row.children.map((cell, colIdx) => {
                                    return <Cell key={`${rowIdx}-${colIdx}`} cell={cell} row={rowIdx} col={colIdx}/>
                                })
                            }
                        )}
                    </StyledTable>
                </SortableContext>
            </DndContext>
        </main>
    );
}

export default App;

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-end: 3;


`