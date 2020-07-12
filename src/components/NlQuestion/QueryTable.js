import React from "react";

import { Table } from "react-bootstrap";

function QueryTable(props) {
  const { columns, data } = props;
  return (
    <Table className="mt-4">
      <thead>
        {columns.map((column, index) => (
          <th key={index}>{column.name}</th>
        ))}
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>{row[column.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default QueryTable;
