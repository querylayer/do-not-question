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
        <Row>
          <Col md={4}>
            <div className="App__explorer">
              <SchemaDataTypeTableExplore
                tables={tables}
              />
            </div>
          </Col>
          <Col>
            <div className="App__question">
              <h2>Ask a Question</h2>
              <NlQuestion />
            </div>
          </Col>
        </Row>
      </Card>
      <div className="App__wave"></div>
    </div>
  );
}

export default App;
