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
                <h3>Dane studenta</h3>
                
                <Divider />

                <h4>Dane z uczelni</h4>
                
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Numer albumu" 
                        content={cookies[__cookieName].studentNumber} 
                    />

                    <HeadingWithInfo 
                        title="Kierunek" 
                        content={cookies[__cookieName].studentProgrammes[0].programme} 
                    />
                </div>

                <Divider />

                <h4>Dane osobowe</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Imię" 
                        content={cookies[__cookieName].firstName} 
                    />

                    <HeadingWithInfo 
                        title="Nazwisko" 
                        content={cookies[__cookieName].lastName} 
                    />

                    <HeadingWithInfo 
                        title="Adres e-mail" 
                        content={cookies[__cookieName].email} 
                    />
                </div>
            </div>

            
            <div class="student__informations__container__half">
                <h3>Dane praktyki zawodowej</h3>
                <Divider />
                
                {detailsLoading && <Spin/>}
                {(!detailsLoading && details) && <><h4>Dane firmy</h4>

                <>
                    <Modal width={'700px'} title={selectedModal == 'date' ? 'Wyślij prośbę o zmianę terminu' : 'Dodaj firme'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
                        {selectedModal === 'date' && <ModalDate company={details} />}
                        {selectedModal === 'company' && <ModalCompany />}
                    </Modal>
                </>

                <div class="info_divided_flex_column">
                    <HeadingWithInfo 
                        title="Nazwa firmy" 
                        content={details.internshipDetails.companyName}
                    />

                    <HeadingWithInfo 
                        title="Adres firmy" 
                        content={details.internshipDetails.companyAddress}
                    />

                    <HeadingWithInfo 
                        title="Telefon kontaktowy" 
                        content={details.internshipDetails.companyPhone ?? '-'}
                    />
                </div>

                <Divider />
                <h4>Dane firmy</h4>
                <div class="info_divided_flex_column">
                    <HeadingWithInfo title="Miesiąc praktyk" content={months[details.internshipDetails.month]}  > 
                        <Button 
                            type="primary"
                            size="regular"
                            onClick={handleSelectedModal}
                            name="date"
                        >
                            Chcę zmienić termin 
                        </Button>
                    </HeadingWithInfo>

                    <HeadingWithInfo 
                        title="Termin praktyk" 
                        content={`${dayjs(details.internshipDetails.dateStart).format('DD.MM')} - ${dayjs(details.internshipDetails.dateEnd).format('DD.MM')}`}  
                    />
                </div>

                <Divider />

                <HeadingWithInfo 
                        title="Status zaliczenia" 
                        content="W trakcie"
                />

                <Divider />

                <HeadingWithInfo 
                        title="Inna firma" 
                        content="Posiadasz doświadczenie zawodowe z innej firmy?"
                >
                    <Button 
                        type="primary"
                        size="regular"
                        onClick={handleSelectedModal}
                        name="company"
                    >
                        Dodaj firmę
                    </Button>
                </HeadingWithInfo>
            </>}
            </div>
        </div>
    </>
  );
}