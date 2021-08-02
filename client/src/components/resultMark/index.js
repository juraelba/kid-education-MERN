import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function ResultMark({result, color, size}) {
    if(result==='success')
        return(
            <FaCheckCircle color = {color} size = { size }/> 
        )
    else
        return(
            <FaExclamationCircle color = {color} size = { size }/>
        )
}
