import React from 'react';
import TimeComponent from '../timeComponent';
export default function AnsweredCounter({type, value}) {
    let title;
    let backgroundColor;
    if(type === "count") {
        title = `Questions \n answered`;
        backgroundColor = "#8cc713";
    }
    else if(type === "time"){
        title = "Time \n elapsed";
        backgroundColor = "#1fb2e4";
        if(value !== "PAUSED"){
            var hours = Math.floor(value/3600);
            let remainMins = value - hours * 3600;
            var mins = Math.floor(remainMins/60);
            var secs = value - hours * 3600 - mins * 60;
            if(hours < 10) hours = "0" + hours;
            if(mins < 10) mins = "0" + mins;
            if(secs < 10) secs = "0" + secs;
        }
    } 
    return(
        <div style = {styles.container}>
            <div style = {{ width: '100%', backgroundColor: backgroundColor, padding: "6px 0px 6px 0px", whiteSpace: "pre-line"}}>
                {title}
            </div>                        
            <div style = {{...styles.valueWrapper, paddingBottom: 20}}>
            {
                (type === "count" || value === "PAUSED") &&
                    <span>{value}</span>
            }
            {
                type === "time" && value !== "PAUSED" &&
                    <div style = {{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0px 3px'}}>
                        <TimeComponent val = {hours} str = "HR"/>
                        <TimeComponent val = {mins} str = "MIN"/>
                        <TimeComponent val = {secs} str = "SEC"/>
                    </div>
            }
            </div>
        </div>
    )
}

const styles = {
    container:{
        width: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        margin: 'auto'
    },

    valueWrapper:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0px 10px 0px',
        width: '100%',backgroundColor: '#f5f5f5', color: '#777368', fontSize: 20
    }
}