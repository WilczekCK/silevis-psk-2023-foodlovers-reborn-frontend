import {useState} from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Outlet, NavLink, useLoaderData, redirect, useNavigation, Route, Navigate } from "react-router-dom";

import pskLogo from '../assets/images/polibuda-logo-2.svg';
import { Image } from 'antd';
import { Button } from 'antd';
import LanguageDropdown from '../components/LanguageDropdown';


export default function Header(){
    const [cookie, setCookie, removeCookie] = useCookies([__cookieName]);
    const { t, i18n } = useTranslation();

    function logout(){
        removeCookie(__cookieName);
        redirect('/');
    }

    return (
        <div class="header__container">
            <NavLink to="/" className="header__container--logo">
                <Image 
                  width="125px"
                  preview={false}
                  src={pskLogo} 
                />
            </NavLink>

            <div class="header__container--menu">
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/informations">Dane studenta i praktyk zawodowych</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/applications">Wnioski i dokumenty</NavLink>
            </div>

            <div class="header__container--languageSwitcher">
                <LanguageDropdown />
                <Button 
                  onClick={logout}
                  type="primary"
                  size="regular"
                  style={{marginLeft: '20px'}}
                >
                  {t('Logout')}
                </Button>
            </div>
        </div>
    )
}