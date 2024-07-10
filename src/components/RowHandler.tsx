export type RowHandlerProps = {
    row: number
    col: number
}

const RowHandler = ({row, col}:RowHandlerProps)=>{

    if(col !==0){
        return <></>
    }

    // onClick selected all items in same row

    return <button>
        row:{row}
    </button>
}

export default RowHandler