import { useCookies } from 'react-cookie';
import { Navigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import { Divider } from 'antd';
import { Button, Image } from 'antd';
import { Space, Table, Tag } from 'antd';
import HeadingWithInfo from '../components/HeadingWithInfo';
import pdf from '../assets/images/pdf.png';
import {CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';



export default function StudentCardApplication(props) {
  const [cookies, setCookie] = useCookies([__cookieName]);
  const isCookieAvailable = !(!cookies || !cookies[__cookieName] || !cookies[__cookieName].id);
  const { t, i18n } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);

  const data = [
    {id:1, status:1, url:'https://tu.kielce.pl/wp-content/uploads/2019/09/Zarz_R_54_19_zal_1.pdf', title: 'Załącznik nr 1 - Umowa o organizację praktyki studenta Politechniki Świętokrzyskiej'},
    {id:2, status:1, url:'https://weaii.tu.kielce.pl/wp-content/uploads/2021/04/Zala%CC%A8cznik-1INF-program-praktyk.pdf', title: 'Załącznik nr 1ENF do umowy - Program praktyk dla kierunku Informatyka'},
    {id:3, status:1, url:'https://tu.kielce.pl/wp-content/uploads/2019/09/Zarz_R_54_19_zal_1_rodo.pdf', title: 'Załącznik nr 2 do umowy – Informacja ws. przetwarzania danych osobowych osób z ramienia Zakładu właściwych do kontaktu ws. praktyki zawodowej studenta Politechniki Świętokrzyskiej'},
    {id:4, status:0, url:'https://tu.kielce.pl/wp-content/uploads/2019/09/Zarz_R_54_19_zal_2.pdf', title: 'Załącznik nr 2 - Oświadczenie o znajomości zasad odbywania praktyk'},
    {id:5, status:0, url:'https://weaii.tu.kielce.pl/wp-content/uploads/2016/11/Zarz_R_54_19_zal_3.pdf', title: 'Załącznik nr 3 - Sprawozdanie z praktyki studenckiej'},
    {id:6, status:0, url:'https://weaii.tu.kielce.pl/wp-content/uploads/2020/05/Za%C5%82%C4%85cznik-5.pdf', title: 'Załącznik nr 5 - Podanie o wyrażenie zgody na realizację czterodniowej praktyki studenckiej'},
  ]

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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => text == '1' ? <div class="green_bg_icon"><CheckCircleOutlined /></div> : <div class="red_bg_icon"><CloseCircleOutlined /></div>
    },
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={false}/>
  );
}