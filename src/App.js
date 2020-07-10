import React from "react";
import "./App.scss";

import { Card, Row, Col } from "react-bootstrap";

import SchemaDataTypeTableExplore from "./components/SchemaDataTypeTableExplorer";
import NlQuestion from "./components/NlQuestion";

const tables = [
  {
    name: 'credit_cards',
    columns: [
      { name: 'id' },
      { name: 'name' }
    ]
  },
  {
    name: 'transactions',
    columns: [
      { name: 'id' },
      { name: 'user_id' },
      { name: 'value' },
      { name: 'date' },
      { name: 'isValid' }
    ],
  }
]

const App = () => (
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

export default App;
