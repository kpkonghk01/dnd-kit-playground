import { useState } from "react";
import { RowData } from "./components/Row";
import { Grid, GridContext } from "./GridContext";
import RowSwap from "./RowSwap";
import ColSwap from "./ColSwap";

function App() {
  const [grid, setGrid] = useState<RowData[]>([
    {
      id: "A",
      children: [
        {
          id: "A1",
          content: (
            <>
              <p>A1</p>
              <p>A1 R2</p>
            </>
          ),
        },
        {
          id: "A2",
          content: (
            <>
              <p>A2</p>
            </>
          ),
        },
        {
          id: "A3",
          content: (
            <>
              <p>A3</p>
            </>
          ),
        },
      ],
    },
    {
      id: "B",
      children: [
        {
          id: "B1",
          content: (
            <>
              <p>B1</p>
            </>
          ),
        },
        {
          id: "B2",
          content: (
            <>
              <p>B2</p>
            </>
          ),
        },
        {
          id: "B3",
          content: (
            <>
              <p>B3</p>
            </>
          ),
        },
      ],
    },
    {
      id: "C",
      children: [
        {
          id: "C1",
          content: (
            <>
              <p>C1</p>
            </>
          ),
        },
        {
          id: "C2",
          content: (
            <>
              <p>C2</p>
            </>
          ),
        },
        {
          id: "C3",
          content: (
            <>
              <p>C3</p>
            </>
          ),
        },
      ],
    },
  ]);
  const [sizes, setSizes] = useState<Grid["sizes"]>({
    row: {},
  });
  const [isColSwapping, setIsColSwapping] = useState(false);

  return (
    <main
      style={{
        position: "relative",
      }}
    >
      <GridContext.Provider
        value={{
          grid,
          setGrid,
          sizes,
          setSizes,
          isColSwapping,
          setIsColSwapping,
        }}
      >
        <RowSwap />
        <br />
        <ColSwap />
      </GridContext.Provider>
    </main>
  );
}

export default App;
