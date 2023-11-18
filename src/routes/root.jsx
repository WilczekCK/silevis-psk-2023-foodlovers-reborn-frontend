import { Outlet, Link, useLoaderData, redirect, useNavigation, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";

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


    return (
        (
        !isCookieAvailable
            ? <Navigate replace to="/login" />
            : (
                <>
                    <Header />
                    <h2>{t('Welcome')} {cookies[__cookieName].firstName}!</h2>
                </>
            )
        )
    )
    
}