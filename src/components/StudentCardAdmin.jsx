import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { Button } from 'antd';
import { Divider } from 'antd';
import HeadingWithInfo from './HeadingWithInfo';
import StudentCardApplication from './StudentCardApplications';

export default function StudentCardAdmin(props){
    const [cookie, setCookie, removeCookie] = useCookies([__cookieName]);
    const { t, i18n } = useTranslation();
    const [infoSelected, setInfoSelected] = useState('student');


    return (
        <>
            <h4>{props.user.firstName} {props.user.lastName} ({props.user.id})</h4>
            
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                <Button className={infoSelected != 'student' && 'notSelected'} type="primary" onClick={(e) => setInfoSelected('student')}> Dane studenta </Button>
                <Button className={infoSelected != 'company' && 'notSelected'} type="primary" onClick={(e) => setInfoSelected('company')}> Dane praktyki zawodowej </Button>
                <Button className={infoSelected != 'applications' && 'notSelected'} type="primary" onClick={(e) => setInfoSelected('applications')}> Wnioski i dokumenty </Button>
            </div>

            <Divider />

              {infoSelected == 'student' && (
                    <>
                        <div class="info_divided_flex_column">
                        <div class="info_divided_flex_column">
                            <HeadingWithInfo 
                                title="Numer albumu" 
                                content="12412412"
                            />

                            <HeadingWithInfo 
                                title="Kierunek" 
                                content="Informatyka"
                            />

                            <HeadingWithInfo 
                                title="Telefon kontaktowy" 
                                content="834 123 412"
                            />

                            <HeadingWithInfo 
                                title="Adres e-mail" 
                                content="placeholder@mail.com"
                            />
                        </div>
                    </div>
                </>
              )}

              {infoSelected == 'company' && (
                <>
                    <h4>Dane Firmy</h4>

                    <div class="info_divided_flex_column">
                            <HeadingWithInfo 
                                title="Nazwa firmy" 
                                content="TEST" 
                            />
        
                            <HeadingWithInfo 
                                title="Adres firmy" 
                                content="TEST"  
                            />
        
                            <HeadingWithInfo 
                                title="Telefon kontaktowy" 
                                content="TEST"  
                            />
                    </div>

                    <Divider />
                    <h4>Termin</h4>
                    
                    <div class="info_divided_flex_column">
                        <HeadingWithInfo 
                            title="Miesiąc praktyk" 
                            content="Lipcowe"  
                        />

                        <HeadingWithInfo 
                            title="Termin praktyk" 
                            content="01.07 - 28.07"  
                        >
                            <div class="submitter">
                                <Button classList="submit_ok" type="primary"> Zaakceptuj termin </Button>
                                <Button classList="submit_not" type="primary"> Odrzuć termin </Button>
                            </div>
                        </HeadingWithInfo>

                        <HeadingWithInfo 
                            title="Status zaliczenia" 
                            content="W trakcie"  
                        >
                            <div class="submitter">
                                <Button type="primary"> Zalicz </Button>
                                <Button type="primary"> Niezaliczaj </Button>
                            </div>
                        </HeadingWithInfo>

                        <HeadingWithInfo 
                            title="Inna firma" 
                            content=""  
                        >
                                <Button type="primary"> Zobacz </Button>
                        </HeadingWithInfo>
                    </div>
                </>
              )}


              {infoSelected == 'applications' && (
                <>
                <h3>Wnioski</h3>
                    <StudentCardApplication id="1"/>
                </>
              )
            }


        </>
    )
}