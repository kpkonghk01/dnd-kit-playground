import { FC, ReactNode } from "react";

export type CellData = {
  id: string;
  content: ReactNode;
};

type CellProps = {
  cell: CellData;
};

const Cell: FC<CellProps> = ({ cell }) => {
  return <td>{cell.content}</td>;
};

export default Cell;
