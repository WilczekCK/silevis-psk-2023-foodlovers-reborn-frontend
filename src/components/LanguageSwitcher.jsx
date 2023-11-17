import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher(){
    const { i18n } = useTranslation();
    
    const changeLanguageHandler = ({target}) =>
    {
      const {lang} = target;
      i18n.changeLanguage(lang)
    }

    return (
        <div className="language__container">
            <button onClick={changeLanguageHandler} lang={"pl"}>PL</button>
            <button onClick={changeLanguageHandler} lang={"en"}>EN</button>
        </div>
    )
}