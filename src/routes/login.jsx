import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/LanguageSwitcher";
import { DatePicker } from 'antd';



export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
  const [userEmail, setUserEmail] = useState('');
  const { t, i18n } = useTranslation();

  //s022222@student.tu.kielce.pl
  async function onSubmit() {
    if(!userEmail) {
      return alert(t('LoginEmailEmpty'));
    }
    
    await axios({
      url: `/api/user/${userEmail}`
    }).then(response => {
      const {data} = response;

      if (data) {
        setCookie(__cookieName, data);
        redirect('/');
      }
    }).catch(error => {
      alert(t('LoginErr'));
    })
  }

  function onChange({target}) {
    const {value} = target;
    setUserEmail(value);
  }

  return (
      isCookieAvailable
      ? <Navigate replace to="/" />
      : (
        <div class="login__container">
          <DatePicker />
          <LanguageSwitcher />
          <label style={{display: 'flex', flexDirection: 'column'}}> {t('LoginEmail')}
          <input type="name" onChange={onChange} placeholder={t('LoginEmailPlaceholder')}/>
          </label>
          <button onClick={onSubmit}>{t('Login')}</button>
        </div>
      )
  );
}