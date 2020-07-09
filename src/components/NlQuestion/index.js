import React, { useEffect, useState } from "react";
import { Input } from "antd";

import { naturalLanguageToSql, runQuery } from "../../utils/QlApi";

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

function NlQuestion() {
  const { setSearchTerm, sqlQuery } = useNlToSql();
  
  useEffect(() => {
    if (!sqlQuery) return;

    runQuery(sqlQuery)
  }, [sqlQuery])

  return (
    <div className="NlQuestion">
      <Input.Search onSearch={setSearchTerm} />
      {sqlQuery}
    </div>
  );
}

export default NlQuestion;
