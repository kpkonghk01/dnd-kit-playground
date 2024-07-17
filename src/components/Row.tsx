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
    transform: CSS.Translate.toString(transform),
  };

  useEffect(() => {
    if (node.current !== null) {
      setSizes((sizes) => ({
        row: {
          ...sizes.row,
          // 20 is the height of the row's padding, 1 is for the border
          [row.id]: node.current!.getBoundingClientRect().height - 21,
        },
      }));
    }
  }, [node, row.id, setSizes]);

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      <td
        style={{
          border: "0px solid black",
          textAlign: "center",
          verticalAlign: "middle",
          cursor: "grab",
          width: "20px",
        }}
        {...listeners}
      >
        ...
      </td>
      {row.children.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
};

export default Row;
