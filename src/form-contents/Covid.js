import React, { useEffect, useState } from "react";
import { formData } from '../formData';

const Covid = ({ setCovid }) => {
    const [preferWork, setPreferWork] = useState(formData.work_preference);
    const [contactCovid, setContactCovid] = useState(formData.had_covid);
    const [contactDate, setContactDate] = useState(formData.had_covid_at);
    const [vaccinated, setVaccinated] = useState(formData.vaccinated);
    const [vaccinatedDate, setVaccinatedDate] = useState(formData.vaccinated_at);

    const localTime = () => { return new Date().toLocaleDateString('en-GB').split('/').reverse().join('-') }

    const validateCovidForm = () => {
        if (preferWork.length && contactCovid !== undefined && vaccinated !== undefined && contactDate.length && vaccinatedDate.length) {
            formData.work_preference = preferWork;
            formData.had_covid = contactCovid;
            formData.had_covid_at = contactCovid === 'true' ? contactDate : 'NAN';
            formData.vaccinated = vaccinated;
            formData.vaccinated_at = vaccinated === 'true' ? vaccinatedDate : 'NAN';
            setCovid(true);
        } else {
            setCovid(false);
        }

        console.log(formData);
    }

    useEffect(() => {
        isChecked();
        validateCovidForm();
    }, [validateCovidForm]);

    const isChecked = () => {
        //checklist 1
        const fso = document.getElementById('fso')
        const fromHome = document.getElementById('from_home');
        const hybrid = document.getElementById('hybrid');

        fso.checked = fso.value === preferWork ? true : false;
        fromHome.checked = fromHome.value === preferWork ? true : false;
        hybrid.checked = hybrid.value === preferWork ? true : false;

        //checklist 2
        const hadCovid = document.getElementById('hadCovid')
        const hadNotCovid = document.getElementById('hadNotCov');

        hadCovid.checked = hadCovid.value === contactCovid ? true : false;
        hadNotCovid.checked = hadNotCovid.value === contactCovid ? true : false;


        //checklist 3
        const vacinated = document.getElementById('Vaccinated')
        const notVaccinated = document.getElementById('NotVaccinated');

        vacinated.checked = vacinated.value === vaccinated ? true : false;
        notVaccinated.checked = notVaccinated.value === vaccinated ? true : false;

    }

    return (
        <section>
            <div className="checking-form">
                <h2>how would you prefer to work?</h2>
                <div className="checking-grid mt-1 mb-4">
                    <input type="radio" id="fso" name="prefer_work" value="From_sairme_office" onChange={e => setPreferWork(e.target.value)} />
                    <label htmlFor="fso">From Sairme Office</label>

                    <input type="radio" id="from_home" name="prefer_work" value="From_home" onChange={e => setPreferWork(e.target.value)} />
                    <label htmlFor="from_home">From Home</label>

                    <input type="radio" id="hybrid" name="prefer_work" value="hybrid" onChange={e => setPreferWork(e.target.value)} />
                    <label htmlFor="hybrid">Hybrid</label>
                </div>

                <h2>Did you contact covid 19? :(</h2>
                <div className="checking-grid mt-1 mb-4">
                    <input type="radio" id="hadCovid" name="contact_covid" value={true} onChange={e => setContactCovid(e.target.value)} />
                    <label htmlFor="hadCovid">Yes</label>

                    <input type="radio" id="hadNotCov" name="contact_covid" value={false} onChange={e => setContactCovid(e.target.value)} />
                    <label htmlFor="hadNotCov">No</label>
                </div>

                {contactCovid === 'true' && <>
                    <h2>When?</h2>
                    <input type="date" min="2019-12-1" value={contactDate} max={localTime()} onChange={e => setContactDate(e.target.value)} className="mt-2 mb-6" />
                </>}

                <h2>Have you been vaccinated?</h2>
                <div className="checking-grid mt-1 mb-4">
                    <input type="radio" id="Vaccinated" name="vaccinated" value={true} onChange={e => setVaccinated(e.target.value)} />
                    <label htmlFor="Vaccinated">Yes</label>

                    <input type="radio" id="NotVaccinated" name="vaccinated" value={false} onChange={e => setVaccinated(e.target.value)} />
                    <label htmlFor="NotVaccinated">No</label>
                </div>

                {vaccinated === 'true' && <>
                    <h2>When did you get your last covid vaccine?</h2>
                    <input
                        type="date" min="2019-12-1" value={vaccinatedDate} max={localTime()} onChange={e => setVaccinatedDate(e.target.value)} className="mt-2 mb-6" />
                </>}
            </div>
        </section >
    )
}

export default Covid;