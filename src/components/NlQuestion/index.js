import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";

import useNlToSql from "./hooks/useNlToSql";
import useQuery from "./hooks/useQuery";

import QueryTable from "./QueryTable";

function NlQuestion() {
  const { setSearchTerm, sqlQuery, isLoading: NlIsLoading } = useNlToSql();
  const { data, isLoading: QueryIsLoading } = useQuery(sqlQuery);
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
            readOnly={NlIsLoading || QueryIsLoading}
            size="lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Append>
            <Button size="lg" disabled={NlIsLoading || QueryIsLoading} variant="primary" block>
              { NlIsLoading && "Generating query..." }
              { QueryIsLoading && "Running query..." }
              { !(QueryIsLoading || NlIsLoading) && "Ask" }
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {data && <QueryTable columns={data.columns} data={data.rows} />}
    </div>
  );
}

export default NlQuestion;
