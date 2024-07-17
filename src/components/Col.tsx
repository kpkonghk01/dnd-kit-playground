import { CSSProperties, FC, useContext, useEffect } from "react";
import { CellData } from "./Cell";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import FakeCell from "./FakeCell";
import { RowData } from "./Row";
import { GridContext } from "../GridContext";

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
  const { isColSwapping, setIsColSwapping } = useContext(GridContext);
  const { attributes, listeners, setNodeRef, transform, transition, active } =
    useSortable({ id: col.id });

  const style: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  useEffect(() => {
    const swapping = active !== null;

    if (swapping !== isColSwapping) {
      setIsColSwapping(swapping);
    }
  }, [active, isColSwapping, setIsColSwapping]);

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="fake-col">
      <div
        {...listeners}
        style={{
          textAlign: "center",
          cursor: "grab",
          height: "32px",
        }}
        className="fake-cell"
      >
        ...
      </div>
      {col.children.map((cell) => (
        <FakeCell key={cell.id} cell={cell} rowId={cell.rowId} />
      ))}
    </div>
  );
};

export default Col;
