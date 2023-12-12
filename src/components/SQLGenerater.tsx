import React, { useState } from 'react';
import { Dataset } from '../features/datasetsSlice';


interface SelectedOptions {
  select: string[];
  from: string;
  where: string;
  groupBy: string[];
  orderBy: string[];
  aggregateFunction: string;
  windowFunction: string;
}

const SqlGenerator: React.FC<Dataset> = ({datasetID, datasetName, datasetScenarios, columnNames = ['1','2','3']}) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    select: [],
    from: '',
    where: '',
    groupBy: [],
    orderBy: [],
    aggregateFunction: '',
    windowFunction: '',
  });

  const generateSql = () => {
    // Your logic to generate SQL based on selectedOptions
    // This is a simplified example; you'll need to handle various cases

    const selectClause = selectedOptions.select.join(', ');
    const fromClause = `FROM ${selectedOptions.from}`;
    const whereClause = selectedOptions.where ? `WHERE ${selectedOptions.where}` : '';
    const groupByClause = selectedOptions.groupBy.length ? `GROUP BY ${selectedOptions.groupBy.join(', ')}` : '';
    const orderByClause = selectedOptions.orderBy.length ? `ORDER BY ${selectedOptions.orderBy.join(', ')}` : '';

    let sqlQuery = `SELECT ${selectClause} ${fromClause} ${whereClause} ${groupByClause} ${orderByClause}`;

    if (selectedOptions.aggregateFunction) {
      sqlQuery = `${selectedOptions.aggregateFunction}(${sqlQuery})`;
    }

    if (selectedOptions.windowFunction) {
      sqlQuery = `${selectedOptions.windowFunction} OVER (${sqlQuery})`;
    }

    return sqlQuery;
  };

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <label>
        Select Columns:
        <select
    
      value={selectedOptions.select}
      onChange={(e) => {
        const selectedColumns = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedOptions((prevOptions) => ({ ...prevOptions, select: selectedColumns }));
      }}
    >
    {columnNames.map((columnName) => (
      <option key={columnName} value={columnName}>
        {columnName}
      </option>
    ))}
  </select>
      </label>
  
      <label>
        From:
        <select
    value={selectedOptions.from}
    onChange={(e) => {
      const selectedFrom = e.target.value;
      setSelectedOptions((prevOptions) => ({ ...prevOptions, from: selectedFrom }));
    }}
  >
    {columnNames.map((columnName) => (
      <option key={columnName} value={columnName}>
        {columnName}
      </option>
    ))}
  </select>
      </label>
  
      <label>
        Where:
        <select
    value={selectedOptions.where}
    onChange={(e) => {
      const selectedWhere = e.target.value;
      setSelectedOptions((prevOptions) => ({ ...prevOptions,where: selectedWhere }));
    }}
  >
    {columnNames.map((columnName) => (
      <option key={columnName} value={columnName}>
        {columnName}
      </option>
    ))}
  </select>
      </label>
  
      <label>
        Group By:
        <select
    value={selectedOptions.groupBy}
    onChange={(e) => {
      const selectedgroupBy = Array.from(e.target.selectedOptions, (option) => option.value);
      setSelectedOptions((prevOptions) => ({ ...prevOptions, groupBy: selectedgroupBy }));
    }}
  >
    {columnNames.map((columnName) => (
      <option key={columnName} value={columnName}>
        {columnName}
      </option>
    ))}
  </select>
      </label>
  
      <label>
        Order By:
        <select
    value={selectedOptions.orderBy}
    onChange={(e) => {
      const selectedorderBy = Array.from(e.target.selectedOptions, (option) => option.value);
      setSelectedOptions((prevOptions) => ({ ...prevOptions, orderBy: selectedorderBy }));
    }}
  >
    {columnNames.map((columnName) => (
      <option key={columnName} value={columnName}>
        {columnName}
      </option>
    ))}
  </select>
      </label>
  
      <label>
        Aggregate Function:
        <select
    value={selectedOptions.aggregateFunction}
    onChange={(e) => {
      const selectedaggregateFunction = e.target.value;
      setSelectedOptions((prevOptions) => ({ ...prevOptions, aggregateFunction: selectedaggregateFunction }));
    }}
  >
    {columnNames.map((columnName) => (
      <option key={columnName} value={columnName}>
        {columnName}
      </option>
    ))}
  </select>
      </label>
  
      <label>
        Window Function:
        <select
    value={selectedOptions.windowFunction}
    onChange={(e) => {
      const selectedwindowFunction = e.target.value;
      setSelectedOptions((prevOptions) => ({ ...prevOptions, windowFunction: selectedwindowFunction }));
    }}
  >
    {columnNames.map((columnName) => (
      <option key={columnName} value={columnName}>
        {columnName}
      </option>
    ))}
  </select>
      </label>
  
      <button onClick={() => console.log(generateSql())}>Generate SQL</button>
    </div>
  );
  
};

export default SqlGenerator;
