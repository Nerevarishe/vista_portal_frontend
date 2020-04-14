import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { fetchDefectura, addDefectura, delDefectura, toggleZD } from "./utils";

const DefecturaPage = () => {
  const [drugName, setDrugName] = useState("");
  const [comment, setComment] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [needFetchDefectura, setNeedFetchDefectura] = useState(0);
  const [defData, setDefData] = useState(null);
  const [drugsInZD, setDrugsInZD] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDefectura();
      await setDefData(data["drugs"]);
      await setDrugsInZD(data["drugsInZd"]);
      await console.log(data);
    };
    fetchData();
  }, [needFetchDefectura]);

  const addDefecturaHandler = async () => {
    setDisableButton(true);
    const isDefecturaAdded = await addDefectura(
      drugName,
      comment,
      employeeName
    );
    if (isDefecturaAdded) {
      setDrugName("");
      setComment("");
      setNeedFetchDefectura((prevState) => prevState + 1);
      setDisableButton(false);
    }
  };
  const delDefecturaRecordHandler = async (event) => {
    setDisableButton(true);
    const isDefecturaRecordDeleted = await delDefectura(event.target.id);
    if (isDefecturaRecordDeleted) {
      setNeedFetchDefectura((prevState) => prevState + 1);
      setDisableButton(false);
    }
  };

  const toggleZDHandler = async (event) => {
    setDisableButton(true);
    const isZDToggled = await toggleZD(event.target.id);
    if (isZDToggled) {
      setNeedFetchDefectura((prevState) => prevState + 1);
      setDisableButton(false);
    }
  };

  return (
    // TODO: Refactor - Split to components!
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Дефектура</Form.Label>
          <Form.Control
            type="text"
            placeholder="Название препарата"
            onChange={(event) => setDrugName(event.target.value)}
            value={drugName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Комментарий</Form.Label>
          <Form.Control
            type="text"
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Имя сотрудника</Form.Label>
          <Form.Control
            type="text"
            placeholder="Имя"
            onChange={(event) => setEmployeeName(event.target.value)}
            value={employeeName}
          />
        </Form.Group>
        <Button onClick={addDefecturaHandler}>Сохранить</Button>
      </Form>
      {defData ? (
        defData.map((card) => (
          <Card key={card._id} className="mt-3">
            <Card.Header>
              {moment(card._id).local().format("DD-MM-YYYY")}
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Drug Name</th>
                    <th>Comment</th>
                    <th>Employee Name</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {card.drugs.map((drug) => (
                    <tr key={drug.objectId}>
                      <td>{drug.drugName}</td>
                      <td>{drug.comment ? drug.comment : null}</td>
                      <td>{drug.employeeName}</td>
                      <td>
                        <Button
                          id={drug.objectId}
                          onClick={delDefecturaRecordHandler}
                          className="ml-1 mr-1"
                        >
                          D
                        </Button>
                        <Button
                          id={drug.objectId}
                          onClick={toggleZDHandler}
                          className="ml-1 mr-1"
                        >
                          ZD
                        </Button>
                        <a
                          href={`https://www.google.com/search?q=${drug.drugName}`}
                          target="_blank"
                          className="btn btn-primary ml-1 mr-1"
                        >
                          G
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default DefecturaPage;
