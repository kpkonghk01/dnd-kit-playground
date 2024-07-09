import { FC } from "react";
import Cell, { CellData } from "./Cell";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export type RowData = {
  id: string;
  children: CellData[];
};

type RowProps = {
  row: RowData;
};

const Row: FC<RowProps> = ({ row }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {row.children.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
};

export default Row;
