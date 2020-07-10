import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

import useNlToSql from "./hooks/useNlToSql";
import useQuery from "./hooks/useQuery";

import QueryTable from "./QueryTable";

function NlQuestion() {
  const { setSearchTerm, sqlQuery } = useNlToSql();
  const queryData = useQuery(sqlQuery);
  const [search, setSearch] = useState("");

  return (
    <div className="NlQuestion">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchTerm(search);
        }}
      >
        <InputGroup>
          <FormControl
            placeholder="How many items there it is?"
            size="lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Append>
            <Button size="lg" variant="primary" block>
              Ask
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      { queryData && (
        <QueryTable columns={queryData.columns} data={queryData.rows}/>
      )}
    </div>
  );
}

export default NlQuestion;
