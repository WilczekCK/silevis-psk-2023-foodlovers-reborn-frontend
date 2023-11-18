import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import { Divider } from 'antd';
import HeadingWithInfo from '../components/HeadingWithInfo';

export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const { t, i18n } = useTranslation();

  return (
    <>
        <Header />
        <div class="student__informations__container">
            <div class="student__informations__container__half">
                <h3>Dane studenta</h3>
                <Divider />

                <h4>Dane z uczelni</h4>
                
                <HeadingWithInfo 
                    title="Numer albumu" 
                    content={cookies[__cookieName].studentNumber} 
                />
            </div>

            <div class="student__informations__container__half">
                <h3>Dane praktyki zawodowej</h3>
                <Divider />

                <h4>Dane firmy</h4>
            </div>
        </div>
    </>
  );
}