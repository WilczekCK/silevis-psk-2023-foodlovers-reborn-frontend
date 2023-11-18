import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import StudentCardAdmin from '../components/studentCardAdmin';
import { Divider } from 'antd';
import { Button, Image } from 'antd';
import { Space, Table, Tag } from 'antd';
import HeadingWithInfo from '../components/HeadingWithInfo';
import pdf from '../assets/images/pdf.png';
import {CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Avatar, List } from 'antd';

const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];

export default function Applications() {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
  const { t, i18n } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);

  const data = [
    {id: 1, firstName: "Adam", lastName: "Kowalski", spec:"Informatyka", status:0, date:'01.07 - 26.07'},
    {id: 2, firstName: "Patryk", lastName: "Jakubowski", spec:"Informatyka", status:0, date:'01.07 - 26.07'},
    {id: 3, firstName: "Paweł", lastName: "Nowak", spec:"Informatyka", status:1, date:'01.07 - 26.07'},
    {id: 4, firstName: "Magda", lastName: "Kowalski", spec:"Informatyka", status:0, date:'01.07 - 26.07'},
    {id: 5, firstName: "Piotr", lastName: "Jakubowski", spec:"Informatyka", status:0, date:'01.07 - 26.07'},
    {id: 6, firstName: "Waldemar", lastName: "Nowak", spec:"Informatyka", status:1, date:'01.07 - 26.07'},
    {id: 7, firstName: "Marian", lastName: "Kowalski", spec:"Informatyka", status:0, date:'01.07 - 26.07'},
    {id: 8, firstName: "Patryk", lastName: "Jakubowski", spec:"Informatyka", status:0, date:'01.07 - 26.07'},
    {id: 9, firstName: "Paweł", lastName: "Nowak", spec:"Informatyka", status:1, date:'01.07 - 26.07'},
    {id: 10, firstName: "Adam", lastName: "Kowalski", spec:"Informatyka", status:0, date:'01.07 - 26.07'},
  ]

  function getItemById(id) {
    return data.find(item => item.id === parseInt(id));
  }


  function selectApplication({target}){
    const {id} = target;
    setIsSelected(getItemById(id));
  }

  const columns = [
    {
        title: '',
        dataIndex: 'title',
        key: 'title',
        render: (text) => <Image width="20px" preview={false} src={pdf}  />
    },
    {
      title: 'Nazwa',
      dataIndex: 'title',
      key: 'title',
      render: (text, url) => <a onClick={selectApplication} id={url.id}>{text}</a>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => text == '1' ? <div class="green_bg_icon"><CheckCircleOutlined /></div> : <div class="red_bg_icon"><CloseCircleOutlined /></div>
    },
  ];

  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');

  return (
    !isCookieAvailable || cookies[__cookieName].staffStatus == 0
        ? <Navigate replace to="/" />
        : <>
        <Header />
        <div class="student__informations__container">
            <div class="student__informations__container__half">
                <h3>Lista praktykantów</h3>
                <Divider />

                <HeadingWithInfo 
                        title="Wyniki" 
                        content={`Wyświetlono: ${data.length} studentów`}
                    />
                <div class="student__list">
                <List
                  itemLayout="horizontal"
                  pagination={{ position, align, pageSize: 4 }}
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                        title={<a key={item.id} studentid={item.id}>{item.firstName} {item.lastName}</a>}
                        description={
                          <div className="meta_student">
                            <div><b>Kierunek:</b> {item.spec}</div>
                            <div><b>Status:</b> {item.status ? <span class="light_orange_color">Zaliczony</span> : "Do zaliczenia"}</div>
                            <div><b>Termin:</b> {item.date}</div>
                            <div><b>Zobacz</b></div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
                </div>
            </div>

            <div class="student__informations__container__half">
                <StudentCardAdmin user={data[0]} />
            </div>
        </div>
    </>
  );
}