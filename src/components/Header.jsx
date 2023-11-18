import {useState} from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

import pskLogo from '../assets/images/polibuda-logo-2.svg';
import { Image } from 'antd';
import { Button } from 'antd';
import LanguageDropdown from '../components/LanguageDropdown';


export default function Header(){
    const [cookies, setCookie] = useCookies([__cookieName]);
    const { t, i18n } = useTranslation();

    function logout(){
        removeCookie(__cookieName);
        redirect('/login');
    }



    return (
        <div class="header__container">
            <div class="header__container--logo">
                <Image 
                  width="125px"
                  preview={false}
                  src={pskLogo} 
                />
            </div>

            <div class="header__container--menu">
                <a>Dane studenta i praktyk zawodowych</a>
                <a>Wnioski i dokumenty</a>
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