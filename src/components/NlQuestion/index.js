import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

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
  const [ search, setSearch ] = useState('');
  
  useEffect(() => {
    if (!sqlQuery) return;

    runQuery(sqlQuery)
  }, [sqlQuery])

  return (
    <div className="NlQuestion">
      <Form onSubmit={e => {
        e.preventDefault()
        setSearchTerm(search)
      }}>
        <InputGroup>
          <FormControl
            placeholder="How many items there it is?"
            size="lg"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <InputGroup.Append>
            <Button
              size="lg"
              variant="primary"
              block
            >Ask</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {sqlQuery}
    </div>
  );
}

export default NlQuestion;
