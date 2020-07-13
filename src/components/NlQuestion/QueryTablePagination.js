import React from "react";

import { Pagination } from "react-bootstrap";

function QueryTablePagination(props) {
  const { items, actualPage, onActualPageChange, pageSize } = props;

  const paginationSize = pageSize ?? 15;
  const pagesAmount = Math.ceil(items.length / paginationSize);
  const lastPage = pagesAmount - 1;
  const buttonsAroundActual = 2;

  const getPreviousPage = index => {
    if (index <= 0) return 0;
    return index - 1;
  }

  const getNextPage = index => {
    if (index >= lastPage) return lastPage;
    return index + 1;
  }

  function PaginationItem(props) {
    const { index } = props;

    if (index < 0 || index > lastPage) return null;

    return (
      <Pagination.Item
        active={actualPage === index}
        onClick={() => onActualPageChange(index)}
      >
        {index + 1}
      </Pagination.Item>
    );
  }

  function PaginationItems() {
    const items = [];

    items.push([
      <Pagination.First onClick={() => onActualPageChange(1)}/>,
      <Pagination.Prev onClick={() => onActualPageChange(getPreviousPage(actualPage))}/>,
    ]);
    
    for (let i = actualPage - buttonsAroundActual; i <= actualPage + buttonsAroundActual; i++) {
      items.push(<PaginationItem index={i}/>)
    }

    items.push([
      <Pagination.Next onClick={() => onActualPageChange(getNextPage(actualPage))}/>,
      <Pagination.Last onClick={() => onActualPageChange(lastPage)}/>,
    ]);

    return items;
  }

  return (
    <Pagination size="sm">
      <PaginationItems />
    </Pagination>
  );
}

export default QueryTablePagination;
