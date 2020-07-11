import React, { useEffect, useState } from "react";
import "./App.scss";

import { Card, Row, Col } from "react-bootstrap";

import SchemaDataTypeTableExplore from "./components/SchemaDataTypeTableExplorer";
import NlQuestion from "./components/NlQuestion";
import { getSchema } from "utils/QlApi";

const App = () => {
  const [tables, setTables] = useState([])

  useEffect(() => {
    async function fetchShema() {
      const responseTables = await getSchema()
      setTables(responseTables)
    }

    fetchShema()
  }, [])
  
  return (
    <div className="App">
      <Card className="App__container">
        <div className="App__explorer">
          <div className="App__schema-scroll">
            <SchemaDataTypeTableExplore
              tables={tables}
            />
          </div>
        </div>
        <div className="App__question">
          <h2>Ask a Question</h2>
          <div className="App__question-scroll">
            <NlQuestion />
          </div>
        </div>
      </Card>
      <div className="App__wave"></div>
    </div>
  );
}

export default App;
