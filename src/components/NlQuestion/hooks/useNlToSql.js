import { useState, useEffect } from "react";

import { naturalLanguageToSql } from "utils/QlApi";

function useNlToSql() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function requestByTerm() {
      if (!searchTerm) return;

      try {
        setIsLoading(true)
        const response = await naturalLanguageToSql({
          query: searchTerm,
        });
        setSqlQuery(response.data.sql);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false)
    }
    requestByTerm();
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    sqlQuery,
    isLoading
  };
}

export default useNlToSql;
