import { FC, ReactNode, useContext } from "react";
import { GridContext } from "../GridContext";

export type CellData = {
  id: string;
  content: ReactNode;
};

type CellProps = {
  cell: CellData;
};

const Cell: FC<CellProps> = ({ cell }) => {
  const { isColSwapping } = useContext(GridContext);

  return (
    <td
      style={{
        ...(isColSwapping ? { opacity: 0 } : { opacity: 1 }),
      }}
    >
      {cell.content}
    </td>
  );
};

export default Cell;
