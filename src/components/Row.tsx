import { CSSProperties, FC, useContext, useEffect } from "react";
import Cell, { CellData } from "./Cell";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { GridContext } from "../GridContext";

export type RowData = {
  id: string;
  children: CellData[];
};

type RowProps = {
  row: RowData;
};

const Row: FC<RowProps> = ({ row }) => {
  const { setSizes } = useContext(GridContext);
  const { attributes, listeners, node, setNodeRef, transform, transition } =
    useSortable({ id: row.id });

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    if (node.current) {
      setSizes((sizes) => ({
        row: {
          ...sizes.row,
          // 20 is the height of the row's padding
          [row.id]: node.current!.offsetHeight - 20,
        },
      }));
    }
  }, [node, row.id, setSizes]);

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {row.children.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
};

export default Row;
