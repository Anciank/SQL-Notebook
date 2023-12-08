import { Cell, addCell } from "../features/datasetsSlice";
import { useAppDispatch } from "../redux/hooks";

interface AddCellComponentProps {
  cellProps: Cell;
}

const AddCellComponent: React.FC<AddCellComponentProps> = ({ cellProps }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      + 
        <button
          onClick={() => {
            dispatch(
              addCell({
                datasetID: cellProps.datasetID,
                scenarioID: cellProps.scenarioID,
                cellID: cellProps.cellID,
                cellType: "code",
                payload: "",
                result: "",
              })
            );
          }}
        >
          SQL
        </button>
        <button onClick={() => {
          dispatch(
            addCell({
              datasetID: cellProps.datasetID,
                scenarioID: cellProps.scenarioID,
                cellID: cellProps.cellID,
                cellType: "note",
                payload: "",
                result: "",
            })
          )
        }}>Note</button>
    </div>
  )
}

export default AddCellComponent