import React, { useState, useEffect, useCallback } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useFetch } from "./useFetch";

const SubmittedApplications = () => {
  const [skillData, setSkillData] = useState([]);

  const url =
    "https://bootcamp-2022.devtest.ge/api/applications?token=15e73a07-8802-4311-9568-151a7ecac6df";
  const url2 = "https://bootcamp-2022.devtest.ge/api/skills";

  const { appData } = useFetch(url);
  const data = appData;

  const fetchSkills = useCallback(async () => {
    const response = await fetch(url2);
    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      setSkillData(data);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const dropDown = (dropId) => {
    const drop = document.getElementById(`drop${dropId}`);
    const dropD = document.getElementById(`dropD${dropId}`);
    const arr = document.getElementById(`arr${dropId}`);
    drop.classList.toggle("d-grid");
    dropD.classList.toggle("mt-2");
    dropD.classList.toggle("bg-light");
    arr.classList.toggle("arrow-up");
  };

  const isChecked = (property, val) => {
    return property === val ? true : false;
  };

  return (
    <div className="submittedApp">
      <div className="subApp-container">
        <h1 className="mt-5 mb-3" style={{ marginLeft: "20px" }}>
          Submitted Applications
        </h1>
        {data.map((app, index) => {
          const {
            first_name,
            last_name,
            email,
            phone,
            skills,
            work_preference,
            had_covid,
            had_covid_at,
            vaccinated,
            vaccinated_at,
            will_organize_devtalk,
            devtalk_topic,
            something_special,
          } = app;
          return (
            <article key={index}>
              <div
                id={`dropD${index}`}
                className="subApp-dropDown mt-1"
                onClick={() => dropDown(index)}
              >
                <span>{index + 1}</span>
                <span className="sign dropdown">
                  <MdOutlineKeyboardArrowLeft id={`arr${index}`} />
                </span>
              </div>
              {/* INNER CONTAINER */}
              <div id={`drop${index}`} className="inform">
                {/* PERSONAL INFORMATION */}
                <div className="infoBlock mb-8">
                  <h4>Personal Information</h4>
                  <div className="infoGrid-1 mt-5">
                    <p>First Name</p>
                    <p className="c-gray">{first_name}</p>
                    <p>Last Name</p>
                    <p className="c-gray">{last_name}</p>
                    <p>E Mail</p>
                    <p className="c-gray">{email}</p>
                    <p>Phone</p>
                    <p className="c-gray">{phone}</p>
                  </div>
                </div>
                {/* -------------------------- */}
                {/* SKILLSET */}
                <div className="infoBlock mb-8">
                  <h4>Skillset</h4>
                  <div className="infoGrid-1 mt-5">
                    {skills.map((skill, indx) => {
                      return (
                        <React.Fragment key={indx}>
                          <p>
                            {skillData.length &&
                              skillData.filter((x) => x.id === skill.id)[0]
                                .title}
                          </p>
                          <p className="c-grey">
                            Years of Experience: {skill.experience}
                          </p>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
                {/* -------------------------- */}
                {/* COVID SITUATION */}
                <div className="infoBlock mb-8">
                  <h4>Covid Situation</h4>
                  <div className="infoGrid-2 mt-5 mb-4">
                    <h4>how would you prefer to work?</h4>
                    <div className="checking-grid mt-1">
                      <input
                        type="radio"
                        id="fso"
                        name={`prefer_work${index}`}
                        checked={isChecked(work_preference, "from_office")}
                        disabled
                      />
                      <label htmlFor="fso">From Sairme Office</label>

                      <input
                        type="radio"
                        id="from_home"
                        name={`prefer_work${index}`}
                        checked={isChecked(work_preference, "from_home")}
                        disabled
                      />
                      <label htmlFor="from_home">From Home</label>

                      <input
                        type="radio"
                        id="hybrid"
                        name={`prefer_work${index}`}
                        checked={isChecked(work_preference, "hybrid")}
                        disabled
                      />
                      <label htmlFor="hybrid">Hybrid</label>
                    </div>
                  </div>
                  <div className="infoGrid-2 mt-1 mb-3">
                    <h4>Did you contact covid 19? :(</h4>
                    <div className="checking-grid mt-1">
                      <input
                        type="radio"
                        id="hadCovid"
                        name={`contact_covid${index}`}
                        checked={isChecked(had_covid, true)}
                        disabled
                      />
                      <label htmlFor="hadCovid">Yes</label>

                      <input
                        type="radio"
                        id="hadNotCov"
                        name={`contact_covid${index}`}
                        checked={isChecked(had_covid, false)}
                        disabled
                      />
                      <label htmlFor="hadNotCov">No</label>
                    </div>
                  </div>
                  {had_covid && (
                    <div className="infoGrid-2">
                      <h4>When did you have covid 19?</h4>
                      <input
                        type="date"
                        value={had_covid_at}
                        onChange={(e) => e.preventDefault()}
                        onClick={(e) => e.preventDefault()}
                        className="mt-2 mb-6 w-80"
                      />
                    </div>
                  )}
                  <div className="infoGrid-2 mt-1 mb-4">
                    <h4>Have you been vaccinated?</h4>
                    <div className="checking-grid mt-1">
                      <input
                        type="radio"
                        id="Vaccinated"
                        name={`vaccinated${index}`}
                        checked={isChecked(vaccinated, true)}
                        disabled
                      />
                      <label htmlFor="Vaccinated">Yes</label>

                      <input
                        type="radio"
                        id="NotVaccinated"
                        name={`vaccinated${index}`}
                        checked={isChecked(vaccinated, false)}
                        disabled
                      />
                      <label htmlFor="NotVaccinated">No</label>
                    </div>
                  </div>
                  {vaccinated && (
                    <div className="infoGrid-2">
                      <h4>When did you get covid vaccine?</h4>
                      <input
                        type="date"
                        value={vaccinated_at}
                        onChange={(e) => e.preventDefault()}
                        className="mt-2 mb-3 w-80"
                        onClick={(e) => e.preventDefault()}
                      />
                    </div>
                  )}
                </div>
                {/* -------------------------- */}
                {/* INSIGHTS */}
                <div className="infoBlock mb-8">
                  <h4>Insights</h4>
                  <div className="infoGrid-2 mt-5 mb-3">
                    <h4>
                      Would you attend Devtalks and maybe also organize your
                      own?
                    </h4>
                    <div className="checking-grid mt-1 mb-3">
                      <input
                        type="radio"
                        id="devtalks"
                        name={`devTalks${index}`}
                        checked={isChecked(will_organize_devtalk, true)}
                        disabled
                      />
                      <label htmlFor="devtalks">Yes</label>

                      <input
                        type="radio"
                        id="noDevtalks"
                        name={`devTalks${index}`}
                        checked={isChecked(will_organize_devtalk, false)}
                        disabled
                      />
                      <label htmlFor="noDevtalks">No</label>
                    </div>
                  </div>
                  {will_organize_devtalk && (
                    <div className="infoGrid-2 mt-3">
                      <h4>What would you speak about at Devtalk?</h4>
                      <textarea
                        className="mt-2 h-2 c-darkGray"
                        value={devtalk_topic}
                        onChange={(e) => e.preventDefault()}
                      ></textarea>
                    </div>
                  )}
                  <div className="infoGrid-2 mt-4">
                    <h4>Tell us something special</h4>
                    <textarea
                      className="mt-2 h-1"
                      value={something_special}
                      onChange={(e) => e.preventDefault()}
                    ></textarea>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default SubmittedApplications;
