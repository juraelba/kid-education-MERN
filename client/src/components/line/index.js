import React from 'react';

export default function Line({data, boardRef, currentAnswers}) {
    const width = boardRef? boardRef.clientWidth : 0;
    const height = boardRef?boardRef.clientHeight: 0;
    let elementWidth = window.innerWidth / 10;
    if(elementWidth > 100) elementWidth = 100;
    if(elementWidth <58) elementWidth = 58;
    return(
        <svg height={height} width={width}>
            {data.map((item, i) =>{
                let answerIndex;
                for(let i = 0; i < currentAnswers.length; i++){
                    if(item.answered === currentAnswers[i].aid){
                        answerIndex = i;
                        break;
                    }
                }
                if(answerIndex > -1){
                    let y1 = i * (elementWidth + 44) + elementWidth / 2 + 44;
                    let y2= Number(answerIndex) * (elementWidth + 44) + elementWidth / 2 + 44;
                    return (
                        <line  key = {i} x1={elementWidth / 2 } y1={y1} x2={width - 60 - elementWidth} y2={y2} style={{zIndex: -1, "stroke":item.borderColor, strokeWidth:2}} />
                    )
                }
                    else
                return null
            })}
        </svg>
    )
}

