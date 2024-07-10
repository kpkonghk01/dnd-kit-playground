export type ColumnHandlerProps = {
    row: number
    col: number
}

const ColumnHandler = ({col, row}:ColumnHandlerProps)=>{

    if(row !==0){
        return <></>
    }

    // onClick selected all items in same col

    return <button>
        col:{col}
    </button>
}

export default ColumnHandler