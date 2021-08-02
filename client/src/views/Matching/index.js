import React from 'react';
import Board from '../../components/board'
import Line from '../../components/line'
import AnsweredCounter from '../../components/answeredCounter'
import TimeCounter from '../../components/timeCounter'
import PaginationComponent from '../../components/pagination'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { connect } from 'react-redux'
import { Button } from "reactstrap";
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';
import { styles } from './styles';

let prev  = 0;
let last  = 0;

const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

const setAnswers = (questions, answers) => {
    let newAnswers = [];
    for(let item of questions){
        let temp = answers.filter(answer => item.aid === answer.aid );
        if(temp && temp.length > 0) newAnswers.push(temp[0]);
    }
    newAnswers = shuffle(newAnswers);
    return newAnswers;
}

class Matching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            todosPerPage: 5,   
            data:{},       
            answers: [],
            submited: false,
            resultMsg: '',
            elapsedTime: 0,
            height: 0,
            timeCountStart : true,
        }
    }

    componentDidMount() {
        this.props.fetchData(true);
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions =  () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentWillUnmount(){
        clearInterval(this.autoSaveInterval);
    }

    static getDerivedStateFromProps(props, state) {
        let data = props.matching.data;
        if(data && data!==state.data && data.questions){
            if(props.matching.isStart){
                data.questions = shuffle(data.questions);
                data.answers = shuffle(data.answers);
                for(let item of data.questions){
                    item.borderColor = data.border_colors[Math.floor(Math.random() * data.border_colors.length)];
                    item.textColor = data.text_colors[Math.floor(Math.random() * data.text_colors.length)];
                }
                let tempAnswers = [];
                for(let i = 1; i <= Math.ceil(data.questions.length/state.todosPerPage) ; i ++){
                    let indexOfLastTodo = i * state.todosPerPage;
                    let indexOfFirstTodo = indexOfLastTodo - state.todosPerPage;
                    let currentQuestions = data.questions.slice(indexOfFirstTodo, indexOfLastTodo);
                    let temp = setAnswers(currentQuestions, data.answers);
                    tempAnswers = [...tempAnswers, ...temp];
                }
                data.answers = tempAnswers;

                for(let item of data.answers){
                    item.borderColor = data.border_colors[Math.floor(Math.random() * data.border_colors.length)];
                    item.textColor = data.text_colors[Math.floor(Math.random() * data.text_colors.length)];
                }
            }
            return {...state, data: data}
        }
        return null;
    }

    clearPage = () => {
        let data = this.state.data;
        for(let i = 0; i < data.questions.length; i++){
            data.questions[i].answered = null;
            data.answers[i].result = null;
        }
        this.setState({data: data});
    }

    handleClick = (event) => {
        clearInterval(this.autoSaveInterval);
        event.preventDefault();
        this.setState({
            currentPage: Number(event.target.id),
            submited:false,
            elapsedTime: 0,
            timeCountStart: true
        });
        this.clearPage();
    }

    handleLastClick = (event) => {
        clearInterval(this.autoSaveInterval);
        event.preventDefault();
        this.setState({
            currentPage:last,
            submited:false,
            elapsedTime: 0,
            timeCountStart: true
        });
        this.clearPage();
    }

    handleFirstClick = (event) => {
        clearInterval(this.autoSaveInterval);
        event.preventDefault();
        this.setState({
            currentPage:1,
            submited:false,
            elapsedTime: 0,
            timeCountStart: true
        });
        this.clearPage();
    }

    submit = () => {
        clearInterval(this.autoSaveInterval);
        let data = this.state.data;
        let questions = data.questions;
        let answers = data.answers;
        let indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
        let indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
        let currentQuestions = questions.slice(indexOfFirstTodo, indexOfLastTodo);

        for(let i = 0; i < answers.length; i ++){
            let obj = currentQuestions.find(o => o.answered === answers[i].aid);
            if(obj) answers[i].result = obj.aid === obj.answered?"success" : "failed";
        }
        data.answers = answers;
        this.setState({data: data, timeCountStart: false});
    }
      
    render() {
        let { currentPage, todosPerPage } = this.state;
        let { questions, answers } = this.state.data;
        if(questions){
            let indexOfLastTodo = currentPage * todosPerPage;
            let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            let currentQuestions = questions.slice(indexOfFirstTodo, indexOfLastTodo);
            let currentAnswers = answers.slice(indexOfFirstTodo, indexOfLastTodo);
            prev  = currentPage > 0 ? (currentPage -1) :0;
            last = Math.ceil(questions.length/todosPerPage);
            let pageNumbers = [];
            for (let i = 1; i <=last; i++) {
                pageNumbers.push(i);
            }
            let answeredNumber = currentQuestions.filter((item) =>(item.answered > 0)).length;
            return (
                <DndProvider backend={HTML5Backend}>
                    <div className = "row">
                        <div className = "col-sm-12" style = {{ padding: 0, minHeight: this.state.height-70 }}>
                            <div className = "col-sm-12" style = {styles.leftWrapper}>
                                <div className = "col-sm-12" style = {{...styles.card, paddingBottom: 30 }}>
                                    <div className = "row" >
                                        <div className = "col-sm-12 col-md-8" style = {{...styles.itemContainer, paddingBottom: 20}}>
                                            <div className = "col-sm-12"  ref = "boardWrapper" id = "board-wrapper" style = {styles.itemsWrapper}>
                                                <div style = {{position: 'absolute', left: 45, top: 0}}>
                                                    <Line data = { currentQuestions } boardRef = {this.refs.boardWrapper} currentAnswers = {currentAnswers}/>
                                                </div>
                                                <div className="col-sm-6">
                                                    <Board data = { currentQuestions } isQuestion = {true} boardRef = {this.refs.boardWrapper}>
                                                    </Board>                
                                                </div>
                                                <div className="col-sm-6">
                                                    <Board data = { currentAnswers } isQuestion = {false} boardRef = {this.refs.boardWrapper}>
                                                    </Board>                
                                                </div>
                                                
                                            </div>
                                            <Button style = {{width: "40%"}} color="primary" size="sm" onClick = {this.submit}>submit</Button>
                                        </div>
                                        <div className = "col-sm-12 col-md-4 " style = {{ paddingTop: 20}}>
                                            <AnsweredCounter value = {answeredNumber} type = "count" />
                                            <TimeCounter isStarting = { this.state.timeCountStart } currentPage = {this.state.currentPage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <PaginationComponent 
                                prev = {prev}
                                last = {last}
                                currentPage = {currentPage}
                                pageNumbers = {pageNumbers}
                                handleFirstClick = {this.handleFirstClick}
                                handleClick = {this.handleClick}
                                handleLastClick = {this.handleLastClick}
                            />
                        </div>
                        
                    </div>
                </DndProvider>
            );
        }
        else 
             return null;
    }
}
const mapStateToProps = (state) => {
    return {
        matching: state.matching,
    }
}

const mapDispatchToProps = (dispatch) =>({
    fetchData: (isStart) => dispatch(actions.fetchData(isStart)),
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
mapStateToProps, mapDispatchToProps
)(Matching)
  