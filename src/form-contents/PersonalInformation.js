import React, { useState, useEffect } from 'react';
import { formData } from '../formData';

const PersonalInformation = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

    const setData = () => {
        checkPhoneNumber();
        formData.first_name = firstName;
        formData.last_name = lastName;
        formData.email = mail;
        formData.phone = phoneNumber;
    }

    useEffect(() => {
        window.addEventListener('keypress', setData);
        return () => {
            window.removeEventListener('keypress', setData);
        }
    }, [setData]);

    const checkLength = (parameter, len) => parameter.length >= len ? 'valid-text mt-2' : 'mt-2';
    const checkInclude = (parameter, str) => parameter.includes(str) ? 'valid-text mt-2' : 'mt-2';

    return (
        <div className="form-app">
            <input type="text" className={checkLength(firstName, 2)} value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='First Name' required />
            <input type="text" className={checkLength(lastName, 2)} value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Last Name' required />
            <input type="email" className={checkInclude(mail, '@')} value={mail} onChange={e => setMail(e.target.value)} placeholder='E Mail' required />
            <input type="tel" className='mt-3' maxLength='17' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder='+995 5__ __ __ __' pattern='[+]{1}[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2} [0-9]{2}' />
        </div>
    );
}

export default PersonalInformation;