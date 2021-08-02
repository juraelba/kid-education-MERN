import React from 'react';
import TimeComponent from '../timeComponent';

const title = "Time \n elapsed";
const backgroundColor = "#1fb2e4";
export default class Matching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            isStarting: true
        }
    }
    componentDidMount() {
        this.countTime();
    }

    // static getDerivedStateFromProps(props, state) {
    //     if(state.isStarting !== props.isStarting){
    //         if(!props.isStarting) clearInterval(this.autoSaveInterval);
    //         return {...state, isStarting: false};
    //     }
    //     return {...state};
    // }

    componentDidUpdate(prevProps){
        if(prevProps.isStarting !== this.props.isStarting){
            if(!this.props.isStarting) clearInterval(this.autoSaveInterval);
        }
        if(this.props.isStarting && this.props.currentPage !== prevProps.currentPage){
            this.setState({count: 0});
            clearInterval(this.autoSaveInterval);
            this.countTime();
        }
    }

    countTime = () =>{
        this.autoSaveInterval = setInterval(()=>{
            this.setState((state, props) => ({
                count: state.count + 1
              }));
            if(this.state.count === 120 ) {
                clearInterval(this.autoSaveInterval);
                this.setState({ count: 'PAUSED'});
            }
        },1000);        
    }

    render() {
        const {count} = this.state;
        if(count !== "PAUSED"){
            var hours = Math.floor(count/3600);
            let remainMins = count - hours * 3600;
            var mins = Math.floor(remainMins/60);
            var secs = count - hours * 3600 - mins * 60;
            if(hours < 10) hours = "0" + hours;
            if(mins < 10) mins = "0" + mins;
            if(secs < 10) secs = "0" + secs;
        }
        return(
            <div style = {styles.container}>
                <div style = {{ width: '100%', backgroundColor: backgroundColor, padding: "6px 0px 6px 0px", whiteSpace: "pre-line"}}>
                    {title}
                </div>                        
                <div style = {{...styles.valueWrapper, paddingBottom: 20}}>
                {
                    count === "PAUSED" &&
                        <span>{count}</span>
                }
                {
                    count !== "PAUSED" &&
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