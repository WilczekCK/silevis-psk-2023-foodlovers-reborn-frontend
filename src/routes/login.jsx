import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/LanguageSwitcher";

import { Image } from 'antd';
import bgUrl from '../assets/images/login_image.jpg';
import weaiLogo from '../assets/images/weaii-small.png';
import pskLogo from '../assets/images/polibuda-logo-1.svg';


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
          <div class="login__container__half">
            <Image 
              width="86px"
              preview={false}
              src={weaiLogo} 
            />
          
            {/* <LanguageSwitcher /> */}

            <div class="login__container__half__wrapper">
            <label style={{display: 'flex', flexDirection: 'column'}}> {t('LoginEmail')}
            <input type="name" onChange={onChange} placeholder={t('LoginEmailPlaceholder')}/>
            </label>
            <button onClick={onSubmit}>{t('Login')}</button>
            </div>

          </div>
          
          <div class="login__container__half" style={{backgroundImage: `url(${bgUrl})`, height: '100%'}}>
          </div>
        </div>
      )
  );
}