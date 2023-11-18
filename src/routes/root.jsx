import { Outlet, Link, useLoaderData, redirect, useNavigation, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import {Divider, Image} from "antd";
import weaiiLogo from '../assets/images/weaii-big.png';
import pskLogo from '../assets/images/polibuda-logo-1.svg';

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
                    <div class="home__container">
                        <h2>{t('Welcome')} {cookies[__cookieName].firstName} {cookies[__cookieName].lastName}!</h2>
                        <p>{t('WelcomeStudentSubheadingOne')} {cookies[__cookieName].staffStatus > 0 ? t('Lecturer') : "Student"}</p>
                        <Divider />

                        <h2>{t('WelcomeHeadingTwo')}</h2>
                        <p>
                        Lorem ipsum dolor sit amet consectetur. Id aliquet ac venenatis lectus tempus fusce. Elit enim neque at justo nisi. Diam nulla dui amet quis lectus in enim risus. Adipiscing nisl interdum ultrices nunc duis non amet vitae. Neque velit elit auctor euismod et rhoncus augue lectus. Odio vitae blandit vitae pharetra in blandit sed tristique. Tristique ipsum nulla id odio tincidunt integer ultricies. Bibendum orci nam habitasse pretium ultricies cursus. Tincidunt felis eget rutrum accumsan. Vitae eget amet pellentesque mi ipsum. Purus ut est dui sit ultricies volutpat massa.
                        </p>
                        
                        <p>
                        In morbi laoreet ornare euismod id massa quis neque. Non ligula sagittis placerat nunc vel velit amet mattis quis. Vitae eu habitant venenatis facilisis odio volutpat eleifend augue. Integer sapien quam feugiat sapien imperdiet malesuada urna. Consectetur eget lectus urna diam felis diam purus et pretium. Nulla curabitur tristique pharetra sed magna at quam. Varius praesent sit elit hendrerit neque. Laoreet in cras dui gravida. Lacus egestas scelerisque sed pellentesque nunc odio bibendum curabitur. Velit eget ut tristique nam sollicitudin malesuada sapien adipiscing sapien. Risus ipsum egestas risus eget sit sed sit phasellus hendrerit.
                        </p>

                        <div style={{marginTop:'50px'}}>
                            <Image 
                                src={weaiiLogo}
                                width="350px"
                                preview={false}
                            />

                            <Image 
                                src={pskLogo}
                                width="200px"
                                preview={false}
                            />
                        </div>
                    </div>
                </>
            )
        )
    )
    
}