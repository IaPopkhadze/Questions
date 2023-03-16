import React, { useState } from "react";
//IMPORT FORM PAGES
import PersonalInformation from "./form-contents/PersonalInformation";
import TechnicalSkillSet from "./form-contents/TechnicalSkillSet";
import Covid from "./form-contents/Covid";
import RedberrianInsights from "./form-contents/RedberrianInsights";
import SubmitPage from "./form-contents/SubmitPage";
import ThanksForJoining from "./form-contents/ThanksForJoining";

import { data } from "./data";
import { tempData } from "./tempData";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import axios from "axios";

const FormPage = () => {
  const [index, setIndex] = useState(1);
  const { questionName, descriptionName, description } = data[index - 1];

  //CONTENTS
  const [persInfo, setPersInfo] = useState(false);
  const [techInfo, setTechInfo] = useState(false);
  const [covid, setCovid] = useState(false);
  const [redberrianInsights, setRedberrianInsights] = useState(false);
  const [submited, setSubmited] = useState(false);

  const postData = async () => {
    axios
      .post(
        "https://bootcamp-2022.devtest.ge/api/application",
        JSON.stringify(dataObject),
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept: "application/json",
          },
        }
      )
      .then(() => {
        setSubmited(true);
        setTimeout(() => {
          returnMain();
        }, 3000);
      })
      .catch((err) =>
        console.log("Something went wrong 🥺 please try again | error: ", err)
      );
  };

  const dataObject = {};

  const createData = () => {
    dataObject.token = "15e73a07-8802-4311-9568-151a7ecac6df";
    dataObject.first_name = tempData.first_name;
    dataObject.last_name = tempData.last_name;
    dataObject.email = tempData.email;
    if (tempData.phone !== "NULL") dataObject.phone = tempData.phone;
    dataObject.skills = tempData.skills;
    dataObject.work_preference = tempData.work_preference;
    dataObject.had_covid = tempData.had_covid === "true" ? true : false;
    if (tempData.had_covid_at !== "NAN")
      dataObject.had_covid_at = tempData.had_covid_at;
    dataObject.vaccinated = tempData.vaccinated === "true" ? true : false;
    if (tempData.vaccinated_at !== "NAN")
      dataObject.vaccinated_at = tempData.vaccinated_at;
    dataObject.will_organize_devtalk =
      tempData.will_organize_devtalk === "true" ? true : false;
    if (tempData.devtalk_topic !== "NULL")
      dataObject.devtalk_topic = tempData.devtalk_topic;
    dataObject.something_special = tempData.something_special;
  };

  const returnMain = () => {
    window.location.href = "/redberry";
  };

  const sendData = () => {
    createData();
    postData();
  };

  const changeBullets = (indx) => {
    return indx <= index ? "btn-fill" : "btn-fill dis";
  };

  const nextPage = () => {
    switch (index) {
      case 1:
        setIndex(persInfo ? index + 1 : index);
        break;
      case 2:
        setIndex(techInfo ? index + 1 : index);
        break;
      case 3:
        setIndex(covid ? index + 1 : index);
        break;
      case 4:
        setIndex(redberrianInsights ? index + 1 : index);
        break;
    }
  };

  const prevPage = () => {
    setIndex(index === 1 ? 1 : index - 1);
  };

  return (
    <div className="container">
      <section className="questionaire">
        <div className="container-inner">
          <h1>{questionName}</h1>
          <div className="form-app">
            {index === 1 && <PersonalInformation setPersInfo={setPersInfo} />}
            {persInfo && index === 2 && (
              <TechnicalSkillSet setTechInfo={setTechInfo} />
            )}
            {techInfo && persInfo && index === 3 && (
              <Covid setCovid={setCovid} />
            )}
            {covid && techInfo && persInfo && index === 4 && (
              <RedberrianInsights
                setRedberrianInsights={setRedberrianInsights}
              />
            )}
          </div>
          <div className="pagination">
            <button className="btn-outline" onClick={prevPage}>
              <MdOutlineKeyboardArrowLeft />
            </button>
            <button
              onClick={() => setIndex(1)}
              className={changeBullets(1)}
            ></button>
            <button
              onClick={() => setIndex(2)}
              className={changeBullets(2)}
              disabled={persInfo ? "" : "disabled"}
            ></button>
            <button
              onClick={() => setIndex(3)}
              className={changeBullets(3)}
              disabled={persInfo && techInfo ? "" : "disabled"}
            ></button>
            <button
              onClick={() => setIndex(4)}
              className={changeBullets(4)}
              disabled={persInfo && techInfo && covid ? "" : "disabled"}
            ></button>
            <button
              onClick={() => setIndex(5)}
              className={changeBullets(5)}
              disabled={
                persInfo && techInfo && covid && redberrianInsights
                  ? ""
                  : "disabled"
              }
            ></button>
            <button className="btn-outline" onClick={nextPage}>
              <MdOutlineKeyboardArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section className="description">
        <div className="container-inner">
          <h1>{descriptionName}</h1>
          <p>{description}</p>
        </div>
      </section>
      {redberrianInsights && covid && techInfo && persInfo && index === 5 && (
        <SubmitPage sendData={sendData} prevPage={prevPage} />
      )}
      {submited && <ThanksForJoining />}
    </div>
  );
};

export default FormPage;
