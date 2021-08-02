import React from 'react';
export default function Result({success}) {
    return(
            <div style = {{...styles.container, color: success?"#7ebb00":"#00aeef"}}>
                {success?"Great, Success!":"Sorry, In correct!"}
            </div>
    )
}

const styles = {
    container:{
        fontSize: 25,
        padding: 20
    }
}