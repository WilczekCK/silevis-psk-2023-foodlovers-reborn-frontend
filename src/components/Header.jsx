import {useState} from 'react';
import pskLogo from '../assets/images/polibuda-logo-2.svg';
import { Image } from 'antd';
import LanguageDropdown from '../components/LanguageDropdown';


export default function Header(){
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
            </div>
        </div>
    )
}