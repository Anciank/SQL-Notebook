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

const SqlGenerator: React.FC<Dataset> = ({datasetID, datasetName, datasetScenarios, columnNames}) => {
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
        <input
          type="text"
          value={selectedOptions.select.join(', ')}
          onChange={(e) => {
            const selectedColumns = e.target.value.split(',').map((col) => col.trim());
            setSelectedOptions((prevOptions) => ({ ...prevOptions, select: selectedColumns }));
          }}
        />
      </label>
  
      <label>
        From:
        <input
          type="text"
          value={selectedOptions.from}
          onChange={(e) => {
            setSelectedOptions((prevOptions) => ({ ...prevOptions, from: e.target.value }));
          }}
        />
      </label>
  
      <label>
        Where:
        <input
          type="text"
          value={selectedOptions.where}
          onChange={(e) => {
            setSelectedOptions((prevOptions) => ({ ...prevOptions, where: e.target.value }));
          }}
        />
      </label>
  
      <label>
        Group By:
        <input
          type="text"
          value={selectedOptions.groupBy.join(', ')}
          onChange={(e) => {
            const groupByOptions = e.target.value.split(',').map((group) => group.trim());
            setSelectedOptions((prevOptions) => ({ ...prevOptions, groupBy: groupByOptions }));
          }}
        />
      </label>
  
      <label>
        Order By:
        <input
          type="text"
          value={selectedOptions.orderBy.join(', ')}
          onChange={(e) => {
            const orderByOptions = e.target.value.split(',').map((order) => order.trim());
            setSelectedOptions((prevOptions) => ({ ...prevOptions, orderBy: orderByOptions }));
          }}
        />
      </label>
  
      <label>
        Aggregate Function:
        <input
          type="text"
          value={selectedOptions.aggregateFunction}
          onChange={(e) => {
            setSelectedOptions((prevOptions) => ({ ...prevOptions, aggregateFunction: e.target.value }));
          }}
        />
      </label>
  
      <label>
        Window Function:
        <input
          type="text"
          value={selectedOptions.windowFunction}
          onChange={(e) => {
            setSelectedOptions((prevOptions) => ({ ...prevOptions, windowFunction: e.target.value }));
          }}
        />
      </label>
  
      <button onClick={() => console.log(generateSql())}>Generate SQL</button>
    </div>
  );
  
};

export default SqlGenerator;
