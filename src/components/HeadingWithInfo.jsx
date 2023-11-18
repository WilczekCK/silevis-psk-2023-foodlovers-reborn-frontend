import {useState} from 'react';
import { useTranslation } from 'react-i18next';


export default function HeadingWithInfo(props){

    return (
        <div class="headingWithInfo__container">
            <h5>{props.title}</h5>
            <small>{props.content}</small>
        </div>
    )
}