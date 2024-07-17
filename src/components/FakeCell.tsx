import { FC, useContext } from "react";
import { CellData } from "./Cell";
import { RowData } from "./Row";
import { GridContext } from "../GridContext";

type FakeCellProps = {
  rowId: RowData["id"];
  cell: CellData;
};

const FakeCell: FC<FakeCellProps> = ({ cell, rowId }) => {
  const { sizes, isColSwapping } = useContext(GridContext);
  const rowHeight = sizes.row[rowId];

  return (
    <div
      className="fake-cell"
      style={{
        height: rowHeight,
        ...(isColSwapping ? { opacity: 1 } : { opacity: 0 }),
      }}
    >
      {cell.content}
    </div>
  );
};

export default FakeCell;
