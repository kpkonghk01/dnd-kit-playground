import { createContext, Dispatch, SetStateAction } from "react";
import { RowData } from "./components/Row";

export type Grid = {
  grid: RowData[];
  setGrid: Dispatch<SetStateAction<RowData[]>>;
  sizes: {
    row: Record<RowData["id"], number>;
  };
  setSizes: Dispatch<
    SetStateAction<{
      row: Record<RowData["id"], number>;
    }>
  >;
};

export const GridContext = createContext<Grid>({
  grid: [],
  setGrid: () => {},
  sizes: {
    row: {},
  },
  setSizes: () => {},
});
