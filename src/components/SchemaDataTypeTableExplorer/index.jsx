import React from "react";
import PropTypes from "prop-types";

import { Table, Accordion, Card } from "react-bootstrap";

import "./index.less";

const SchemaDataTypeTableExplorer = (props, ref) => {
  const { tables } = props;

  return (
    <div className="SchemaDataTypeTableExplorer">
      <Accordion>
        { tables.map((table, index) => (
          <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
              {table.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index + 1}>
              <Table className="m-0">
                { table.columns.map((column, index) => (
                  <tr>
                    <td>{column.name}</td>
                  </tr>
                )) }
              </Table>
            </Accordion.Collapse>
          </Card>
        )) }
      </Accordion>
    </div>
  );
};

SchemaDataTypeTableExplorer.propTypes = {
  tables: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          dataType: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired
};

export default SchemaDataTypeTableExplorer;
