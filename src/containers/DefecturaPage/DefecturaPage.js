import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../stores/store";

import moment from "moment";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import {
  fetchDefectura,
  addDefectura,
  delDefecturaRecord,
  toggleZD,
  delDefecturaDayCard,
} from "./utils";

const DefecturaPage = (props) => {
  const [drugName, setDrugName] = useState("");
  const [comment, setComment] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [needFetchDefectura, setNeedFetchDefectura] = useState(0);
  const [defData, setDefData] = useState(null);
  const [drugsInZD, setDrugsInZD] = useState(null);
  const [state, dispatch] = useContext(Context);

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
  const delDefecturaRecordModal = async (id) => {
    setDisableButton(true);
    dispatch({
      type: "DELETE_DEFECTURA_RECORD_MODAL",
      data: [
        // Array that contains:
        // Element id that must be deleted
        id,
        // function, which exec when button 'Yes' pressed in modal
        async () => {
          const response = await delDefecturaRecord(id);
          if (response) {
            dispatch({ type: "RESET_MODAL" });
            setNeedFetchDefectura((prevState) => prevState + 1);
            setDisableButton(false);
          }
          dispatch({ type: "RESET_MODAL" });
          setDisableButton(false);
        },
        // function, which exec when button 'No' pressed in modal
        () => {
          dispatch({ type: "RESET_MODAL" });
          setDisableButton(false);
        },
      ]
    });
  };

  const toggleZDHandler = async (event) => {
    setDisableButton(true);
    const isZDToggled = await toggleZD(event.target.id);
    if (isZDToggled) {
      setNeedFetchDefectura((prevState) => prevState + 1);
      setDisableButton(false);
    }
  };

  // TODO: Check if record deleted from ZD on deleting defectura card. If true - change sorting method in backend.
  // TODO: Confirmed!
  const delDefecturaDayCardModal = async (id) => {
    setDisableButton(true);
    dispatch({
      type: "DELETE_DEFECTURA_CARD_MODAL",
      data: [
        // Array that contains:
        // Element id that must be deleted
        id,
        // function, which exec when button 'Yes' pressed in modal
        async () => {
          const response = await delDefecturaDayCard(id);
          if (response) {
            dispatch({ type: "RESET_MODAL" });
            setNeedFetchDefectura((prevState) => prevState + 1);
            setDisableButton(false);
          }
          dispatch({ type: "RESET_MODAL" });
          setDisableButton(false);
        },
        // function, which exec when button 'No' pressed in modal
        () => {
          dispatch({ type: "RESET_MODAL" });
          setDisableButton(false);
        },
      ]
    });
  };

  return (
    // TODO: Refactor - Split to components!
    <Container>
      {drugsInZD ?
        (
          <Table responsive>
            <thead>
              <tr>
                <th>Drug Name</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {drugsInZD.map(
                drug => (
                  <tr>
                    <td>{drug["drug_name"]}</td>
                    <td>
                      <Button id={drug["_id"]["$oid"]} onClick={toggleZDHandler}>ZD</Button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        ) : null
      }
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
        <Button onClick={addDefecturaHandler} disabled={disableButton}>
          Сохранить
        </Button>
      </Form>
      {defData ? (
        defData.map((card) => (
          <Card key={card._id} className="mt-3">
            <Card.Header>
              {moment(card._id).local().format("DD-MM-YYYY")}
              <Button
                className="float-right"
                onClick={() => { delDefecturaDayCardModal(card._id) }}
                disabled={disableButton}
              >
                D
              </Button>
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
                          onClick={() => { delDefecturaRecordModal(drug.objectId) }}
                          className="ml-1 mr-1"
                          disabled={disableButton}
                        >
                          D
                        </Button>
                        <Button
                          id={drug.objectId}
                          onClick={toggleZDHandler}
                          className="ml-1 mr-1"
                          disabled={disableButton}
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
          // TODO: Change Loading to spinner component on all page
          <p>Loading...</p>
        )}
    </Container>
  );
};

export default DefecturaPage;
