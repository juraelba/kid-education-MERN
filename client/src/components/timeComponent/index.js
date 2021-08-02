import React from 'react';
export default function TimeComponent({val, str}) {
    return(
            <div style = {styles.container}>
                <div style = {{ border: "1px solid #e7e7e7", backgroundColor: '#ffffff', padding: 3}}>{val}</div>
                <div>{str}</div>
            </div>
    )
}

const styles = {
    container:{
        fontSize: 12,
        width: '30%'
    }
}