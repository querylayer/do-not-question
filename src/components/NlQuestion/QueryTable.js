import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";

import QueryTablePagination from "./QueryTablePagination";

function QueryTable(props) {
  const { columns, data } = props;

  const PAGE_SIZE = 10;

  const [actualPage, setActualPage] = useState(0);
  const [actualPageItems, setActualPageItems] = useState([]);

  useEffect(() => {
    const pageTable = data.slice(actualPage * PAGE_SIZE, (actualPage + 1) * PAGE_SIZE);
    setActualPageItems(pageTable)
  }, [actualPage, data])

  return (
    <>
      <Table className="mt-4">
        <thead>
          {columns.map((column, index) => (
            <th key={index}>{column.name}</th>
          ))}
        </thead>
        <tbody>
          {actualPageItems.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index}>{row[column.name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <QueryTablePagination
        items={data}
        actualPage={actualPage}
        onActualPageChange={setActualPage}
        pageSize={PAGE_SIZE}
      />
    </>
  );
}

export default QueryTable;
