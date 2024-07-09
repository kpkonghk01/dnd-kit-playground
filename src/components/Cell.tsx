import { FC } from "react";

export type CellData = {
  id: string;
};

type CellProps = {
  cell: CellData;
};

const Cell: FC<CellProps> = ({ cell }) => {
  return <td>{cell.id}</td>;
};

export default Cell;
