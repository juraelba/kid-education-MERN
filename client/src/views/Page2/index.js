import React from 'react';
import Board from '../../components/board'
import Result from '../../components/result'
import AnsweredCounter from '../../components/answeredCounter'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { connect } from 'react-redux'
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Button
    } from "reactstrap";
import * as actions from '../../actions';
import { bindActionCreators } from 'redux';

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

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            todosPerPage: 5,   
            currentAnswers: [],
            currentQuestions:[],
            data:{},       
            answers: [],
            submited: false,
            resultMsg: '',
            answeredCount: 0,
            elapsedTime: 0
        }
    }

    componentDidMount() {
        this.props.fetchData(true);
        this.coountTime();
    }

    componentWillUnmount(){
        clearInterval(this.autoSaveInterval);
    }

    static getDerivedStateFromProps(props, state) {
        let data = props.dataReducer.data;
        if(data && data!==state.data && data.questions){
            if(props.dataReducer.isStart){
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

    handleClick = (event) => {
        clearInterval(this.autoSaveInterval);
        event.preventDefault();
        this.setState({
            currentPage: Number(event.target.id),
            submited:false,
            answeredCount: 0,
            elapsedTime: 0
        });
        this.coountTime();
    }

    handleLastClick = (event) => {
        clearInterval(this.autoSaveInterval);
        event.preventDefault();
        this.setState({
            currentPage:last,
            submited:false,
            answeredCount: 0,
            elapsedTime: 0
        });
        this.coountTime();
    }

    handleFirstClick = (event) => {
        clearInterval(this.autoSaveInterval);
        event.preventDefault();
        this.setState({
            currentPage:1,
            submited:false,
            answeredCount: 0,
            elapsedTime: 0
        });
        this.coountTime();
    }

    submit = () => {
        clearInterval(this.autoSaveInterval);
        let questions = this.state.data.questions;
        let answers = this.state.data.answers;
        let result = true;
        let answeredCount = 0;
        let indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
        let indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
        let currentQuestions = questions.slice(indexOfFirstTodo, indexOfLastTodo);
        let currentAnswers = answers.slice(indexOfFirstTodo, indexOfLastTodo);
        for(let i = 0; i < currentQuestions.length; i ++){
            if(currentAnswers[i].aid !== currentQuestions[i].aid)
                result = false;
            else
                answeredCount ++;
        }
        this.setState({submited: true, success: result, answeredCount: answeredCount});
    }

    coountTime = () =>{
        this.autoSaveInterval = setInterval(()=>{
            this.setState((state, props) => ({
                elapsedTime: state.elapsedTime + 1
              }));
            if(this.state.elapsedTime === 120 ) {
                clearInterval(this.autoSaveInterval);
                this.setState({ elapsedTime: 'PAUSED'});
            }
        },1000);        
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
            return (
                <DndProvider backend={HTML5Backend}>
                    <div className = "row">
                        <div className = "col-sm-8" style = {{ padding: 0, minHeight: window.innerHeight-70 }}>
                            <div className = "col-sm-12" style = {styles.leftWrapper}>
                                <div className = "col-sm-12" style = {{...styles.card, ...styles.itemContainer }}>
                                    <div className = "col-sm-12" style = {{ paddingBottom: 20}}>
                                    {
                                        this.state.submited && (
                                            <Result success = {this.state.success}/>
                                        )
                                    }
                                    <div style = {styles.itemsWrapper}>
                                        <div className="col-sm-6">
                                            <Board data = { currentQuestions } isQuestion = {true}>
                                            </Board>                
                                        </div>
                                        <div className="col-sm-6">
                                            <Board data = { currentAnswers } isQuestion = {false}>
                                            </Board>                
                                        </div>
                                    </div>
                                    </div>
                                    <Button style = {{width: "40%"}} color="primary" size="sm" onClick = {this.submit}>submit</Button>
                                </div>
                            </div>
                            <ul id="page-numbers">
                                <nav>
                                <Pagination>
                                <PaginationItem>
                                { prev === 0 ? <PaginationLink disabled>First</PaginationLink> :
                                    <PaginationLink onClick={this.handleFirstClick} id={prev} href={prev}>First</PaginationLink>
                                }
                                </PaginationItem>
                                <PaginationItem>
                                { prev === 0 ? <PaginationLink disabled>Prev</PaginationLink> :
                                    <PaginationLink onClick={this.handleClick} id={prev} href={prev}>Prev</PaginationLink>
                                }
                                </PaginationItem>
                                    {
                                    pageNumbers.map((number,i) =>
                                    <Pagination key= {i}>
                                    <PaginationItem active = {pageNumbers[currentPage-1] === (number) ? true : false} >
                                    <PaginationLink onClick={this.handleClick} href={number} key={number} id={number}>
                                    {number}
                                    </PaginationLink>
                                    </PaginationItem>
                                    </Pagination>
                                    )}

                                <PaginationItem>
                                {
                                currentPage === last ? <PaginationLink disabled>Next</PaginationLink> :
                                <PaginationLink onClick={this.handleClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Next</PaginationLink>
                                }
                                </PaginationItem>

                                <PaginationItem>
                                {
                                currentPage === last ? <PaginationLink disabled>Last</PaginationLink> :
                                <PaginationLink onClick={this.handleLastClick} id={pageNumbers[currentPage]} href={pageNumbers[currentPage]}>Last</PaginationLink>
                                }
                                </PaginationItem>
                                </Pagination>
                                </nav>
                            </ul>
                        </div>
                        <div className = "col-sm-4" style = {{ paddingTop: 20}}>
                            <AnsweredCounter value = {this.state.answeredCount} type = "count" />
                            <AnsweredCounter value = {this.state.elapsedTime} type = "time" />
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
        dataReducer: state.dataReducer,
    }
}

const mapDispatchToProps = (dispatch) =>({
    fetchData: (isStart) =>dispatch(actions.fetchData(isStart)),
    actions: bindActionCreators(actions, dispatch)
});

const styles = {
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
    },
    itemContainer: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingBottom: 20,
        alignItems: 'center'
    },
    card :{
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
    }
}

export default connect(
mapStateToProps, mapDispatchToProps
)(Page2)
  