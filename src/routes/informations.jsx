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
                
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Numer albumu" 
                        content={cookies[__cookieName].studentNumber} 
                    />

                    <HeadingWithInfo 
                        title="Kierunek" 
                        content={cookies[__cookieName].studentProgrammes[0].programme} 
                    />
                </div>

                <Divider />

                <h4>Dane osobowe</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Imię" 
                        content={cookies[__cookieName].firstName} 
                    />

                    <HeadingWithInfo 
                        title="Nazwisko" 
                        content={cookies[__cookieName].lastName} 
                    />

                    <HeadingWithInfo 
                        title="Adres e-mail" 
                        content={cookies[__cookieName].email} 
                    />
                </div>
            </div>

            <div class="student__informations__container__half">
                <h3>Dane praktyki zawodowej</h3>
                <Divider />

                <h4>Dane firmy</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Nazwa firmy" 
                        content="PLACEHOLDER"
                    />

                    <HeadingWithInfo 
                        title="Adres firmy" 
                        content="ul. PLACEHOLDEROWA 404"
                    />

                    <HeadingWithInfo 
                        title="Telefon kontaktowy" 
                        content="123 456 789"
                    />
                </div>

                <Divider />
                <h4>Dane firmy</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Miesiąc praktyk" 
                        content="PLACEHOLDER"
                    />

                    <HeadingWithInfo 
                        title="Termin praktyk" 
                        content="01.07 - 28.07"
                    />
                </div>

                <Divider />

                <HeadingWithInfo 
                        title="Status zaliczenia" 
                        content="W trakcie"
                />

                <Divider />

                <HeadingWithInfo 
                        title="Inna firma" 
                        content="Posiadasz doświadczenie zawodowe z innej firmy?"
                />
            </div>
        </div>
    </>
  );
}