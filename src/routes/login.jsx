import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/LanguageSwitcher";
import LanguageDropdown from "../components/LanguageDropdown";

import { Image } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Checkbox } from 'antd';
import { Button } from 'antd';


import bgUrl from '../assets/images/login_image.jpg';
import weaiLogo from '../assets/images/weaii-small.png';
import pskLogo from '../assets/images/polibuda-logo-1.svg';




export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
  const [userEmail, setUserEmail] = useState('');
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  //__allStudentsCookie
  async function fetchAllStudents() {
    return await axios({
      url: `/api/all-emails`
    }).then(async response => {
      const {data} = response;

      return data;
    }).catch(error => {
      alert(t('LoginErr'));
      setIsLoading(false);
    })
  }

  async function getDetailedInfoAboutAllStudents(data){
    const detailedInfo = [];
    for (const user of data) {
      await axios({
        url: `/api/user/${user}`
      }).then(async response => {
        if(response.data.staffStatus == 0){
          detailedInfo.push(response.data);
        }
      })
    }

    return detailedInfo;
  }

  //s022222@student.tu.kielce.pl
  async function onSubmit() {
    if(!userEmail) {
      return alert(t('LoginEmailEmpty'));
    }
    
    setIsLoading(true);

    await axios({
      url: `/api/user/${userEmail}`
    }).then(async response => {
      const {data} = response;
      setIsLoading(false);

      if (data) {
        setCookie(__cookieName, data);
        
        const students = await fetchAllStudents();
        if (students) {
          const getDetailedInfo = await getDetailedInfoAboutAllStudents(students);

          if(getDetailedInfo){
            console.log(getDetailedInfo);
            setCookie(__allStudentsCookie, getDetailedInfo);
            redirect('/');
          } else {
            alert(t('LoginErr'));
            setIsLoading(false);
          }

        } else {
          alert(t('LoginErr'));
          setIsLoading(false);
        }
      }
    }).catch(error => {
      alert(t('LoginErr'));
      setIsLoading(false);
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

            <div class="login__container__half__wrapper">
              <Image 
                width="167px"
                preview={false}
                src={pskLogo} 
              />
              
              <h2>{t("LoginPageMainText")}</h2>
              <div class="login__container__half__wrapper__form">
                <Input type="name" onChange={onChange} size="large" placeholder={t('LoginEmail')} prefix={<MailOutlined />} />
                <div class="login__container__half__wrapper__form--additonals">
                  <Checkbox>{t('RememberMe')}</Checkbox>
                  <a>{t('ForgotPassword')}</a>
                </div>

                <Button 
                  onClick={onSubmit} 
                  type="primary"
                  size="large"
                  loading={isLoading}
                >
                  {t('Login')}
                </Button>
                <LanguageDropdown />

              </div>
            </div>

          </div>
          
          <div class="login__container__half" style={{backgroundImage: `url(${bgUrl})`, height: '100%', backgroundSize: 'cover'}}>
          </div>
        </div>
      )
  );
}