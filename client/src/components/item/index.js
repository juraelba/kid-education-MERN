import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemTypes, reduxConstant } from '../../constant';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd'
import ResultMark from '../resultMark'
import SpeakerButton from '../speakerButton';
import { styles } from '../../views/Matching/styles';

// const width = 100;
// const height = 100;
export default function Item({index, border_color, text_color, itemData, isQuestion, width}) {
    const height = width;
    const {shape, content, type} = itemData; 
    const result = itemData.result;
    const borderRadius = shape === "circle" ? width / 2 : 0;
    const dispatch = useDispatch();
    const data = useSelector(state => state.matching.data);
    const source = useSelector(state => state.matching.source);
    
    const [{isDragging}, drag] = useDrag({
        item: { type: isQuestion?ItemTypes.QUESTION:ItemTypes.ANSWER },
        begin: () =>{
            itemData.index = index;
            dispatch({ type: reduxConstant.BEGIN_DRAGGING, source: itemData });
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    const [{ isOver }, drop] = useDrop({
        accept: !isQuestion?ItemTypes.QUESTION:"NOT ALLOWED",
        drop: () => {
            let obj = data.questions.find(o => o.answered === itemData.aid);
            if(obj) return;
            source.answered = itemData.aid;
            for( let i = 0; i < data.questions.length; i ++){
                if(data.questions[i].qid === source.qid) {
                    data.questions[i] = source;
                    break;
                }
            }
            dispatch({ type: reduxConstant.DROP_FINISH, data: data, isStart: false });
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    const customStyle = {
        ...styles.border,
        width: width,
        height: height,
        color: text_color, 
        borderRadius, 
        borderColor:border_color,
        opacity: isDragging ? 0.5 : 1,
        lineHeight: '90%'
    }

    return(
        <div ref={drop} style = {{position: 'relative', margin: isQuestion?'20px auto 0px 0px':'20px 0px 0px auto'}}>
            <SpeakerButton url = { itemData.sound }/>
            {
                type === "text" &&
                    <button ref={drag} style = {{...css.itemContainer, ...customStyle}}>{content}</button>
            }
            {
                type === "image" &&
                <input ref={drag} type = "image"
                src = {content} style = {customStyle} alt = "img" width = {width} height = {height}></input>
            }
            {
                type === "shape" && content === "triangle" &&
                    <div ref={drag} style = {{opacity: isDragging ? 0.5 : 1, borderLeft: `${width/2}px solid transparent`,
                    borderRight: `${width/2}px solid transparent`,  
                    borderBottom: `${width}px solid ${border_color}`, width: 0, height: 0, cursor: 'pointer'}}>
                    </div>                
            }
            {
                type === "shape" && content === "rectangle" &&
                    <div ref={drag} style = {{ width: width, height: height, backgroundColor: text_color, opacity: isDragging ? 0.5 : 1, cursor: 'pointer'}}></div>                
            }
            <div style = {{ position: 'absolute', left: width, top: 0}}>
                {result==='success' && (
                    <ResultMark result = {result} color = "green" size = "2em" /> 
                )}  
                {result==='failed' && (
                    <ResultMark result = {result} color = "red" size = "2em" /> 
                )}  
            </div>
            
            
            {isOver && (
                <div
                style={{
                    position: 'absolute',
                    top: 24,
                    left: 0,
                    height: height,
                    width: width,
                    borderRadius: borderRadius,
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                }}
                />
            )}
        </div>
    )
}

const css = {
    itemContainer: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
   
}
