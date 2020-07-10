import { useState, useEffect } from "react";

import { runQuery } from "utils/QlApi";

function useQuery(sqlQuery) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!sqlQuery) return;

    async function fetchQuery() {
      try {
        const query = await runQuery(sqlQuery);
        setData(query.data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }

    fetchQuery();
  }, [sqlQuery]);

  return data;
}

export default useQuery;