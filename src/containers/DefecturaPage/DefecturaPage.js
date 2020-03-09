import React, {useEffect, useState} from "react";
import Button from "../../components/Button";
import {fetchDefectura, addDefectura} from "./utils";
import moment from "moment";

const DefecturaPage = () => {
  const [drugName, setDrugName] = useState("");
  const [comment, setComment] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [needFetchDefectura, setNeedFetchDefectura] = useState(0);
  const [defData, setDefData] = useState(null);
  const [drugsInZD, setDrugsInZD] = useState(null);

  useEffect( () => {
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
    const isDefecturaAdded = await addDefectura(drugName, comment, employeeName);
    if (isDefecturaAdded) {
      setNeedFetchDefectura(prevState => prevState + 1);
      setDisableButton(false);
    }
  };

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
        {
          defData
            ? defData.map(card => (
                <div key={card._id}>
                  <div>{moment(card._id).local().format("DD-MM-YYYY")}</div>
                  <div>
                    <table>
                      <thead>
                      <tr>
                        <th>Drug Name</th>
                        <th>Comment</th>
                        <th>Employee Name</th>
                      </tr>
                      </thead>
                      <tbody>
                      {card.drugs.map( drug => (
                        <tr key={drug.objectId}>
                          <td>{drug.drugName}</td>
                          <td>{drug.comment ? drug.comment : null}</td>
                          <td>{drug.employeeName}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
          ))
            : <p>Loading...</p>
        }
      </div>
    </React.Fragment>
  );
};

export default DefecturaPage;
