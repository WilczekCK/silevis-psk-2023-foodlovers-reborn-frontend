import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';

const nipRegex = /^[0-9]{10}$/
const regonRegex = /^[0-9]{9}$/
const krsRegex = /^[0-9]{10}$/
const numberRegex = /^-?\d*(\.\d*)?$/

export default function ModalCompany(){
    const [cookie, setCookie, removeCookie] = useCookies([__cookieName]);
    const { t, i18n } = useTranslation();

    const [nip, setNip] = useState('');
    const [regon, setRegon] = useState('');
    const [krs, setKrs] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');


    function isMatchingRegex(regex, str) {
      return regex.test(str);
    }
  

    const [nipErr, setNipErr] = useState(false);
    function checkNip(value){
      setNip(value);

      if(!isMatchingRegex(numberRegex, value) || value === '' || value === '-'){
        setNip('');
      } else {
        if(isMatchingRegex(nipRegex, value)){
          setNipErr(false);
        } else{
          setNipErr(true);
        }
      }
    }

    const [regonErr, setRegonErr] = useState(false);
    function checkRegon(value){
      setRegon(value);

      if(!isMatchingRegex(numberRegex, value) || value === '' || value === '-'){
        setRegon('');
      } else {
        if(isMatchingRegex(regonRegex, value)){
          setRegonErr(false);
        } else{
          setRegonErr(true);
        }
      }
    }

    const [krsErr, setKrsErr] = useState(false);
    function checkKrs(value){
      setKrs(value);

      if(!isMatchingRegex(numberRegex, value) || value === '' || value === '-'){
        setNip('');
      } else {
        if(isMatchingRegex(krsRegex, value)){
          setKrsErr(false);
        } else{
          setKrsErr(true);
        }
      }
    }
    
    return (
        <div className="company__modal">
            <p>W przypadku posiadania już doświadczenia zawodowego z własnej firmy, dodaj informację na jej temat. Wypełnij wniosek dokładnie.</p>

            <label>
              NIP:
              <Input status={!nipErr ? '' : 'error'}  placeholder="" value={nip} onChange={(e) => checkNip(e.target.value)}/>
            </label>
            
            <Button type="primary">Spróbuj uzupełnić po NIP</Button>
            <label>
            Regon
            <Input status={!regonErr ? '' : 'error'}  placeholder="" value={regon} onChange={(e) => checkRegon(e.target.value)} />
            </label>
            
            <label>
              KRS
              <Input status={!krsErr ? '' : 'error'}  placeholder="" value={krs} onChange={(e) => checkKrs(e.target.value)} />
            </label>
            
            <label>
              Nazwa firmy
              <Input placeholder="" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
            </label>
            
            <label>
              Adres firmy
              <Input placeholder="" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)}/>
            </label>

            <Button type="primary">Wyślij</Button>
        </div>
    )
}