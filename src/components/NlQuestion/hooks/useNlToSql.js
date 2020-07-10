import { useState, useEffect } from "react";

import { naturalLanguageToSql } from "utils/QlApi";

function useNlToSql() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  useEffect(() => {
    async function requestByTerm() {
      if (!searchTerm) return;

      try {
        const response = await naturalLanguageToSql({
          query: searchTerm,
        });
        setSqlQuery(response.data.sql);
      } catch (error) {
        console.log(error);
      }
    }
    requestByTerm();
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    sqlQuery,
  };
}

export default useNlToSql;
