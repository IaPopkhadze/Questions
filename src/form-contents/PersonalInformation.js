import React, { useState, useEffect } from 'react';
import { tempData } from '../tempData';

const PersonalInformation = ({ setPersInfo }) => {
    const [firstName, setFirstName] = useState(tempData.first_name);
    const [lastName, setLastName] = useState(tempData.last_name);
    const [mail, setMail] = useState(tempData.email);
    const [phoneNumber, setPhoneNumber] = useState(!tempData.phone.includes('+995') && tempData.phone.length < 15 ? '' : tempData.phone);

    const checkPhoneNumber = () => {
        setPhoneNumber(phoneNumber.replace(/[^+|0-9]/g, ''));
        if (phoneNumber.includes('+995') && phoneNumber.length === 12) {
            let ph = '';
            for (let i = 0; i < phoneNumber.length; i++) {
                ph += phoneNumber[i];
                if (i > 0) {
                    if (i === 3) ph += ' ';
                    if (i === 6) ph += ' ';
                    if (i === 8) ph += ' ';
                    if (i === 10) ph += ' ';

                    setPhoneNumber(ph);
                }
            }
        }
        if (!phoneNumber.length) return true;
        if (phoneNumber.length && phoneNumber.includes('+995')) return true;
        return false;
    }

    const checkValidations = () => {
        if (firstName.length >= 2 && lastName.length >= 2 && mail.includes('@')) {
            setData();
            setPersInfo(true);
        } else {
            setPersInfo(false);
        }
    }

    const setData = () => {
        tempData.first_name = firstName;
        tempData.last_name = lastName;
        tempData.email = mail;
        tempData.phone = !phoneNumber.length ? 'NULL' : phoneNumber.split('').filter(x => x !== ' ').join('');
    }

    useEffect(() => {
        checkValidations();
        window.addEventListener('keypress', checkPhoneNumber);
        return () => {
            window.removeEventListener('keypress', checkPhoneNumber);
        }
    }, [checkPhoneNumber]);

    const checkLength = (parameter, len) => parameter.length >= len ? 'valid-text mt-2' : 'mt-2';
    const checkInclude = (parameter, str) => parameter.includes(str) ? 'valid-text mt-2' : 'mt-2';

    return (
        <>
            <input type="text" className={checkLength(firstName, 2)} value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='First Name' required />
            <input type="text" className={checkLength(lastName, 2)} value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Last Name' required />
            <input type="email" className={checkInclude(mail, '@')} value={mail} onChange={e => setMail(e.target.value)} placeholder='E Mail' required />
            <input type="tel" className='mt-3' maxLength='17' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder='+995 5__ __ __ __' pattern='[+]{1}[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2} [0-9]{2}' />
        </>
    );
}

export default PersonalInformation;