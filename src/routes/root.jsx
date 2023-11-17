import { Outlet, Link, useLoaderData, redirect, useNavigation, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

export async function loader({ params }) {
//   const contacts = await getContacts();
//   return { contacts };
return [
    {id: 1, name: 'test'}
];
}

export default function Root() {
    const navigation = useNavigation();
    const { contacts } = useLoaderData();
    const [cookies, removeCookie] = useCookies([__cookieName]);
    const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
    const { t, i18n } = useTranslation();
    
    const changeLanguageHandler = ({target}) =>
    {
      const {lang} = target;
      console.log(lang);
      i18n.changeLanguage(lang)
    }

    function logout(){
        removeCookie(__cookieName);
        redirect('/login');
    }

    return (
        (
        !isCookieAvailable
            ? <Navigate replace to="/login" />
            : (
                <>
                    <button onClick={changeLanguageHandler} lang={"pl"}>PL</button>
                    <button onClick={changeLanguageHandler} lang={"en"}>EN</button>

                    <h2>{t('Welcome')} {cookies[__cookieName].firstName}!</h2>
                    <button onClick={logout}>Logout</button>
                </>
            )
        )
    )
    
}