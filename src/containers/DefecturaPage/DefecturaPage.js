import React, {useEffect, useState} from "react";
import Button from "../../components/Button";
import {fetchData, addDefectura, groupBy} from "./utils";
import moment from "moment";

const DefecturaPage = () => {
  const [drugName, setDrugName] = useState("");
  const [comment, setComment] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [fetchDefectura, setFetchDefectura] = useState(0);
  const [defData, setDefData] = useState(null);
  const [drugsInZD, setDrugsInZD] = useState(null);
  let cards = [];

  useEffect( () => {
    fetchData()
      .then(response => {
        // setDefData(response["drugs"]);
        setDefData(groupBy(response["drugs"], drug => drug.date["$date"]));
        setDrugsInZD(response["drugsInZd"]);
      })
      .catch()
  }, [fetchDefectura]);

  const addDefecturaHandler = () => {
    setDisableButton(true);
    const isDefecturaAdded = addDefectura(drugName, comment, employeeName);
    if (isDefecturaAdded) {
      setFetchDefectura(prevState => prevState + 1);
      setDisableButton(false);
    }
  };

  if (defData !== null) {
    cards = [...defData];
    console.log(cards);
    cards = cards.map(
      card => {
        card[1].reverse();
        return (
          (
            <div key={card[0]}>
              <div>{moment(card[0]).local().format("DD-MM-YYYY")}</div>
              <div>
                <table>
                  <th>
                    <td>Drug Name</td>
                    <td>Comment</td>
                    <td>Employee Name</td>
                  </th>
                  {card[1].map(
                    item => (
                      <tr>
                        <td>{item["drug_name"]}</td>
                        {item["comment"] ? <td>{item["comment"]}</td> : <td></td>}
                        <td>{item["employee_name"]}</td>
                      </tr>
                    )
                  )}
                </table>
              </div>
              <br/>
            </div>
          )
        )
      }
    );

  }

  return (
    <React.Fragment>
      <div>
        <p>Defectura</p>
        <input type="text" onChange={event => setDrugName(event.target.value)}/>
        <p>Comment</p>
        <input type="text" onChange={event => setComment(event.target.value)}/>
        <p>Name</p>
        <input type="text" onChange={event => setEmployeeName(event.target.value)}/>
        <br/>
        <br/>
        <Button text={"Send"} clicked={addDefecturaHandler} btnDisabled={disableButton}/>
      </div>
      <div>
        {cards}
      </div>
    </React.Fragment>
  );
};

export default DefecturaPage;
