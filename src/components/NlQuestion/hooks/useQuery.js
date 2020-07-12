import { useState, useEffect } from "react";

import { runQuery } from "utils/QlApi";

function useQuery(sqlQuery) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!sqlQuery) return;

    async function fetchQuery() {
      setIsLoading(true)
      try {
        const query = await runQuery(sqlQuery);
        setData(query.data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
      setIsLoading(false)
    }

    fetchQuery();
  }, [sqlQuery]);

  return { data, isLoading };
}

export default useQuery;