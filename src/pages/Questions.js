import React, { useState, useEffect } from 'react';
import {GetCollection} from './../data';
import QuestionItem from './../components/QuestionItem';



function Questions () {

    const [questions, setQuestions] = useState(GetCollection("questions"));

    return <div>
        {questions.map((item)=> <QuestionItem question={item}></QuestionItem>) }
    </div>
}

export default Questions;