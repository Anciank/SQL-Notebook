import React, { useState } from "react";

import "./CellComponent.css"

import AceEditor from "react-ace";
import MonacoEditor from 'react-monaco-editor';
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-sql";

import axios from "axios";

import { useAppDispatch } from "../redux/hooks";
import { Cell, updateCell } from "../features/datasetsSlice";

import AddCellComponent from "./AddCellComponent/AddCellComponent";
import CsvTable from "./CsvTable/CsvTable"

interface CellComponentProps {
  cellProps: Cell;
}

const CellComponent: React.FC<CellComponentProps> = ({ cellProps }) => {
  if (cellProps.cellType === "code") {
    const [code, setCode] = useState<string>("");
    const dispatch = useAppDispatch();

    function editorDidMount(editor: { focus: () => void; }, monaco: any) {
      console.log('editorDidMount', editor);
      editor.focus();
    }
    function onChange(newValue: React.SetStateAction<string>, e: any) {
      console.log('onChange', newValue, e);

      setCode(newValue);
      dispatch(updateCell({ ...cellProps, payload: newValue })); 
    }

    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false,
    };

    return (
      <div className="codeContianer">
        <AceEditor
          style={{ display: "none" }}
          width="100%"
          mode="sql"
          theme="github"
          onChange={(e) => {
            setCode(e);

            dispatch(updateCell({ ...cellProps, payload: e }));
          }}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
            maxLines: Infinity,
          }}
          value={cellProps.payload}
          // dont know what happend, editor lock accientally disappeared.
          className="aceEditor"
        />
        <MonacoEditor
          width="100%"
          height="150"
          language="javascript"
          theme="vs-light"
          value={code}
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
        <div className="cellButtons">
          <button
            onClick={() => {
              axios
                .post(
                  "http://localhost:8080/api/sendDataToBackend",
                  JSON.stringify({ sql: code })
                )
                .then((response) => {
                  // Assuming setResult is a state update function
                  console.log(response.data);
          
                  const newCell = { ...cellProps, result: response.data };
                  dispatch(updateCell(newCell));
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            Execute
          </button>
        </div>
        {cellProps.result !== "" && 
          <CsvTable csvData={cellProps.result} />
        }
        <AddCellComponent cellProps={cellProps} />
      </div>
    );
  }

  if (cellProps.cellType === "note") {
    const dispatch = useAppDispatch();

    return (
      <div className="noteContainer">
        <textarea name="note" id="0" rows={5} value={cellProps.payload} onChange={(e) => {
          console.log(e.target.value);
          dispatch(updateCell({...cellProps, payload: e.target.value}));         
        }}></textarea>

        <AddCellComponent cellProps={cellProps} />
      </div>
    )
  }

  return (
    <div>
      {/* <h3>Cell Information</h3>
      <p>Cell ID: {cellProps.cellID}</p>
      <p>Cell type: {cellProps.cellType}</p>
      <p>Cell payload: {cellProps.payload}</p>
      <p>Cell result: </p> */}
      <CsvTable csvData={cellProps.result} />
      {/* Add other cell information as needed */}
    </div>
  );
};

export default CellComponent;
