import {useState} from 'react';
import { useTranslation } from 'react-i18next';


export default function HeadingWithInfo(props){

    return (
        <div class="headingWithInfo__container">
            <div class="headingWithInfo__container--left">
                <h5>{props.title}</h5>
                <small>{props.content}</small>
            </div>
            <div class="headingWithInfo__container--right">
                {props.children}
            </div>
        </div>
    )
}