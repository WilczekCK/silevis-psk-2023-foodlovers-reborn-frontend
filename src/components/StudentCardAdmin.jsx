import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { Button } from 'antd';
import { Divider } from 'antd';
import HeadingWithInfo from './HeadingWithInfo';
import StudentCardApplication from './StudentCardApplications';
import dayjs from 'dayjs';

const extractAndDisplay = (array, key) => array.map(item => item[key]).join(', ');
const months = {
  1: 'styczniowe',
  2: 'lutowe',
  3: 'marcowe',
  4: 'kwietniowe',
  5: 'majowe',
  6: 'czerwcowe',
  7: 'lipcowe',
  8: 'sierpniowe',
  9: 'wrzesniowe',
  10: 'październikowe',
  11: 'listopadowe',
  12: 'grudniowe'
};


export default function StudentCardAdmin(props){
    const [cookie, setCookie, removeCookie] = useCookies([__cookieName]);
    const { t, i18n } = useTranslation();
    const [infoSelected, setInfoSelected] = useState('student');

    return (
        <>
            <h4>{props.user.firstName} {props.user.lastName} ({props.user.id})</h4>
            
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
                <Button className={infoSelected != 'student' && 'notSelected'} type="primary" onClick={(e) => setInfoSelected('student')}> {t('ListButtonOne')} </Button>
                <Button className={infoSelected != 'company' && 'notSelected'} type="primary" onClick={(e) => setInfoSelected('company')}> {t('ListButtonTwo')} </Button>
                <Button className={infoSelected != 'applications' && 'notSelected'} type="primary" onClick={(e) => setInfoSelected('applications')}> {t('ListButtonThree')} </Button>
            </div>

            <Divider />

              {infoSelected == 'student' && (
                    <>
                        <div class="info_divided_flex_column">
                        <div class="info_divided_flex_column">
                            <HeadingWithInfo 
                                title={t('AlbumNumber')}
                                content={props.user.studentNumber}
                            />

                            <HeadingWithInfo 
                                title={t('ListResultsOne')}
                                content={extractAndDisplay(props.user.studentProgrammes, 'programme')}
                            />

                            <HeadingWithInfo 
                                title={t('ListHeadingSeven')}
                                content="-"
                            />

                            <HeadingWithInfo 
                                title={t('EmailAddres')}
                                content={props.user.email}
                            />
                        </div>
                    </div>
                </>
              )}

              {infoSelected == 'company' && (
                <>
                    <h4>{t('ListHeadingFour')}</h4>

                    <div class="info_divided_flex_column">
                            <HeadingWithInfo 
                                title={t('ListHeadingFive')}
                                content={props.company.internshipDetails.companyName}
                            />
        
                            <HeadingWithInfo 
                                title={t('ListHeadingSix')}
                                content={props.company.internshipDetails.companyAddress}  
                            />
        
                            <HeadingWithInfo 
                                title={t('ListHeadingSeven')}
                                content={props.company.internshipDetails.companyPhone ?? "-"}
                            />
                    </div>

                    <Divider />
                    <h4>{t('ListHeadingEight')}</h4>
                    
                    <div class="info_divided_flex_column">
                        <HeadingWithInfo 
                            title={t('ListHeadingNine')}
                            content={months[props.company.internshipDetails.month]}  
                        />

                        <HeadingWithInfo 
                            title={t('ListHeadingTen')}
                            content={`${dayjs(props.company.internshipDetails.dateStart).format('DD.MM')} - ${dayjs(props.company.internshipDetails.dateEnd).format('DD.MM')}`}  
                        >
                            <div class="submitter">
                                <Button classList="submit_ok" type="primary"> {t('ListButtonFour')} </Button>
                                <Button classList="submit_not" type="primary"> {t('ListButtonFive')} </Button>
                            </div>
                        </HeadingWithInfo>

                        <HeadingWithInfo 
                            title={t('ListHeadingEleven')}
                            content="test"
                        >
                            <div class="submitter">
                                <Button type="primary">  {t('ListButtonSix')}  </Button>
                                <Button type="primary">  {t('ListButtonSeven')}  </Button>
                            </div>
                        </HeadingWithInfo>

                        <HeadingWithInfo 
                            title={t('ListHeadingTwelve')}
                            content=""  
                        >
                                <Button type="primary"> {t('ListButtonEight')} </Button>
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