import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import { Divider } from 'antd';
import { Button } from 'antd';
import HeadingWithInfo from '../components/HeadingWithInfo';
import ModalDate from '../components/ModalDate';
import ModalCompany from '../components/ModalCompany';
import { Modal } from 'antd';
import axios from 'axios'
import { Alert, Flex, Spin } from 'antd';
import dayjs from 'dayjs';
import { InputNumber, Space } from 'antd';

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

export default function Login() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
  const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModal, setIsSelectedModal] = useState(false);
    const [details, setDetails] = useState(false);
    const [detailsLoading, setDetailLoading] = useState(false);

    async function fetchStudentInfo(){
        setDetailLoading(true);
    
        await axios({
          url: `http://10.5.5.208:5158/api/Internship/GetByStudentId?id=${cookies[__cookieName].id}`
        }).then(async response => {
          if (response) {
            setDetails(response.data)
            
            // Dla efektu :)
            setTimeout(function(){
                setDetailLoading(false);
            }, 1500);
          }
        })
      }

    const handleSelectedModal = ({target}) => {
        let {name} = target.offsetParent;
        if(!name) name = target.name;

        console.log(name);
        setIsSelectedModal(name);
        showModal();
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchStudentInfo()
    }, [])

  return (
    !isCookieAvailable || cookies[__cookieName].staffStatus > 0
        ? <Navigate replace to="/" />
        : <>
        <Header />
        <div class="student__informations__container">
            <div class="student__informations__container__half">
                <h3>{t('ListButtonOne')}</h3>
                
                <Divider />

                <h4>{t('InfoFromUniversity')}</h4>
                
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title={t('AlbumNumber')}
                        content={cookies[__cookieName].studentNumber} 
                    />

                    <HeadingWithInfo 
                        title={t('ListResultsOne')} 
                        content={cookies[__cookieName].studentProgrammes[0].programme} 
                    />
                </div>

                <Divider />

                <h4>{t('PersonalInfo')}</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title={t('Name')} 
                        content={cookies[__cookieName].firstName} 
                    />

                    <HeadingWithInfo 
                        title={t('Surname')} 
                        content={cookies[__cookieName].lastName} 
                    />

                    <HeadingWithInfo 
                        title={t('EmailAddres')} 
                        content={cookies[__cookieName].email} 
                    />
                </div>
            </div>

            
            <div class="student__informations__container__half">
                <h3>{t("ListButtonTwo")}</h3>
                <Divider />
                
                {detailsLoading && <Spin/>}
                {(!detailsLoading && details) && <><h4>{t("ListHeadingFour")}</h4>

                <>
                    <Modal width={'700px'} title={selectedModal == 'date' ? <>{t("ChangeTerminStudent")}</> : <> {t("AddCompany")} </>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
                        {selectedModal === 'date' && <ModalDate company={details} />}
                        {selectedModal === 'company' && <ModalCompany />}
                    </Modal>
                </>

                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title={t("ListHeadingFive")} 
                        content={details.internshipDetails.companyName}
                    />

                    <HeadingWithInfo 
                        title={t("ListHeadingSix")} 
                        content={details.internshipDetails.companyAddress}
                    />

                    <HeadingWithInfo 
                        title={t("ListHeadingSeven")} 
                        content={details.internshipDetails.companyPhone ?? '-'}
                    />
                </div>

                <Divider />
                <h4>{t("ListResultsTwo")}</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo title={t("ListHeadingNine")} content={months[details.internshipDetails.month]}  > 
                        <Button 
                            type="primary"
                            size="regular"
                            onClick={handleSelectedModal}
                            name="date"
                        >
                            {t("WannaChangeTermin")}
                        </Button>
                    </HeadingWithInfo>

                    <HeadingWithInfo 
                        title={t("ListHeadingTen")} 
                        content={`${dayjs(details.internshipDetails.dateStart).format('DD.MM')} - ${dayjs(details.internshipDetails.dateEnd).format('DD.MM')}`}  
                    />
                </div>

                <Divider />

                <HeadingWithInfo 
                        title={t("ListHeadingEleven")}
                        content={t("ListSubheadingThree")}
                />

                <Divider />

                <HeadingWithInfo 
                        title={t("ListHeadingTwelve")}
                        content={t("haveOtherExperience")}
                >
                    <Button 
                        type="primary"
                        size="regular"
                        onClick={handleSelectedModal}
                        name="company"
                    >
                        {t("AddCompany")}
                    </Button>
                </HeadingWithInfo>
            </>}
            </div>
        </div>
    </>
  );
}