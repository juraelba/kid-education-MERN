export const  styles = {
    leftWrapper:{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingTop: 20, 
        paddingBottom: 20, 
        // height: window.innerHeight * 0.85,
        
    },
    itemsWrapper:{ 
        display: 'flex', 
        justifyContent:'space-around',
        paddingBottom: 20,
    },
    itemContainer: {
        wordBreak: 'break-all',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    card :{
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
    },
    topLeftAbsolute:{
        position: 'absolute',top: 0, left: 0
    },
    border: {
        position: 'relative',
        borderWidth: 3,
        borderStyle: 'solid',
        outline: 'none',
    },

}