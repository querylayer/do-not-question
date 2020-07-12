import React, { useEffect, useState } from "react";
import "./App.scss";

import { Card, Spinner } from "react-bootstrap";

import SchemaDataTypeTableExplore from "./components/SchemaDataTypeTableExplorer";
import NlQuestion from "./components/NlQuestion";
import { getSchema } from "utils/QlApi";

const App = () => {
  const [tables, setTables] = useState([])
  const [isSchemaLoading, setIsSchemaLoading] = useState(false)

  useEffect(() => {
    async function fetchShema() {
      setIsSchemaLoading(true)
      const responseTables = await getSchema()
      setTables(responseTables)
      setIsSchemaLoading(false)
    }

    fetchShema()
  }, [])
  
  return (
    <div className="App">
      <Card className="App__container">
        <div className="App__explorer">
          { isSchemaLoading 
            ? <Spinner animation="border" />
            : (
              <div className="App__schema-scroll">
                <SchemaDataTypeTableExplore
                  tables={tables}
                />
              </div>
            )
          }
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
