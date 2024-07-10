import { FC } from "react";
import styled from "styled-components";
import RowHandler from "./RowHandler.tsx";
import ColumnHandler from "./ColumnHandler.tsx";

export type CellData = {
  id: string;
};

type CellProps = {
  cell: CellData;
  row: number;
  col: number;
};

const Cell: FC<CellProps> = ({ cell,row,col }) => {
  return <StyledCell>{cell.id}
     <RowHandler row={row} col={col}/>
    <ColumnHandler row={row} col={col}/>
  </StyledCell>;
};

export default Cell;

const StyledCell = styled.div`
  border: 1px black solid;
`
