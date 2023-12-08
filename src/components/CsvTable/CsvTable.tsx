import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './CsvTable.css';

interface CsvTableProps {
  csvData: string;
}

const CsvTable: React.FC<CsvTableProps> = ({ csvData }) => {
  const [tableData, setTableData] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        setTableData(result.data as Array<Record<string, any>>);
      },
    });
  }, [csvData]);

  return (
    <div className="csv-table-container">
      <table className="csv-table">
        <thead>
          <tr>
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvTable;
