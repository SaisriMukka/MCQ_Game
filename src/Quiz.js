import React from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';
import Question from './Question';

import AnswerOption from './Options';

function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerid={key.id}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }
  function QuestionCount(props) {
    return (
      <div className="questionCount">
        Question <span>{props.counter}</span> 
      </div>
    );
  }
  
  return (
    <center>
      <div key={props.questionId} className="card">
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
      </center>
    
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};


export default Quiz;