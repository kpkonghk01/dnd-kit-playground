import { CSSProperties, FC } from "react";
import { CellData } from "./Cell";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import FakeCell from "./FakeCell";
import { RowData } from "./Row";

type ColCell = CellData & {
  rowId: RowData["id"];
};

export type ColData = {
  id: string;
  children: ColCell[];
};

type ColProps = {
  col: ColData;
};

const Col: FC<ColProps> = ({ col }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: col.id });

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="fake-col"
    >
      {col.children.map((cell) => (
        <FakeCell key={cell.id} cell={cell} rowId={cell.rowId} />
      ))}
    </div>
  );
};

export default Col;
