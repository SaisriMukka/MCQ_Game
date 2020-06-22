
import './Final.css';
import React from 'react'
import quizQuestions from './quizQuestions.json';
import Quiz from './Quiz';
import Result from './Result';

class Final extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      responses:0,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answerid:'',
      answersCount: 0,
      result: 0,
      useranswer:'',
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.options)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      answer: quizQuestions[0].answer,
      answerid: quizQuestions[0].id,
      useranswer:''
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    this.setState((state, props) => ({
      responses: state.responses+1,
     
    }));
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    var temp=0;
    if(quizQuestions[this.state.counter].answer===answer){
         temp=1;
    }
    this.setState((state, props) => ({
      answersCount: state.answersCount+temp,
      useranswer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].options,
      answer:quizQuestions[counter].answer,
      useranswer:'' 
    });
  }

  getResults() {

    return this.state.answersCount;
  }

  setResults(result) {
    if (result !== 0) {
      this.setState({ result: result });
    } else {
      this.setState({ result: 0 });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  

  playagain = () => { 
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.options)
    );
    this.setState({
      counter: 0,
      questionId: 1,
      result: 0,answersCount: 0,
      responses:0,
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      answer: quizQuestions[0].answer,
      useranswer:''
    });
   
  }; 
  renderResult() {
    return <Result quizResult={this.state.result} total={quizQuestions.length} play={this.playagain}/>;
  }

  render() {
    var x=quizQuestions.length-this.state.responses;
    return (
      
      <div className="Final">
        <div className="Final-header">
        
        </div>
        {x ?  this.renderQuiz() : this.renderResult()}
      </div>
    );
  }
}

export default Final;