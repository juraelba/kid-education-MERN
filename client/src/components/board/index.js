import React from 'react';
import Item from '../item';

export default function Board({data, isQuestion, boardRef}) {
    let width = window.innerWidth / 10;
    if(width > 100) width = 100;
    if(width <58) width = 58;
    return(
            <div className="col-sm-12" style = {{ position: 'relative', display: 'flex',
            flexDirection: 'column'}}>
            {data.map((item, i) =>{
               
                return (
                    <Item 
                        key = {i}
                        index = {i}
                        border_color = { item.borderColor }
                        text_color = { item.textColor }
                        isQuestion = { isQuestion }
                        itemData = {item}
                        width = {width }
                    >
                    </Item>
                )
            }
            )
            }
            </div>
    )
}

