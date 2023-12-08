import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-sql";
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { Cell, addCell, updateCell } from "../features/datasetsSlice";

interface CellComponentProps {
  cellProps: Cell;
}

const CellComponent: React.FC<CellComponentProps> = ({ cellProps }) => {
  if (cellProps.cellType === "code") {
    const [code, setCode] = useState<string>("");
    const dispatch = useAppDispatch();

    return (
      <div className="codeContianer">
        <AceEditor
          mode="sql"
          theme="github"
          onChange={(e) => {
            setCode(e);
            
            dispatch(updateCell({...cellProps, payload: e}));
          }}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
            maxLines: Infinity
          }}
          value={cellProps.payload}
          className="aceEditor"
        />
        <button
          onClick={() => {
            axios.post(
              "http://localhost:8080/api/sendDataToBackend",
              JSON.stringify({ sql: code })
            )
            .then(response => {
              // Assuming setResult is a state update function
              const newCell = {...cellProps, result: response.data};
              dispatch(updateCell(newCell));
            })
            .catch(error => {
              console.error("Error:", error);
            });
          }}
        >
          Execute
        </button>
        <br />
        <p>{cellProps.result}</p>
        Add a cell
        <button
          onClick={() => {
            dispatch(
              addCell({
                datasetID: cellProps.datasetID,
                scenarioID: cellProps.scenarioID,
                cellID: cellProps.cellID,
                cellType: "code",
                payload: "",
                result: ""
              })
            );
          }}
        >
          SQL
        </button>
      </div>
    );
  }
  return (
    <div>
      <h3>Cell Information</h3>
      <p>Cell ID: {cellProps.cellID}</p>
      <p>Cell type: {cellProps.cellType}</p>
      <p>Cell payload: {cellProps.payload}</p>
      <p>Cell result: </p>
      {/* Add other cell information as needed */}
    </div>
  );
};

export default CellComponent;
