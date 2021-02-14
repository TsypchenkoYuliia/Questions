import React, { useState } from 'react';
import { GetCollectionByFilter } from './../data';
import QuestionItem from './../components/QuestionItem';
import { Input, Button } from 'antd';
import './../App.css';
import { useHistory, useParams } from 'react-router-dom';

function Questions() {

    let {filter} = useParams();
    const [title, SetTitle] = useState("");
    const questions = GetCollectionByFilter("questions", filter);
    let history = useHistory();

    const titleChange = (event) => {
        SetTitle(event.target.value);
    };

    function saveTitle() {
        localStorage.setItem("questionsTitle", title);
        history.replace('/askQuestion');
    }

    function popularFilter() {
        history.replace('/questions/popular');
    }

    function recentFilter() {
        history.replace('/questions/recent');
    }

    function unansweredFilter() {
        history.replace('/questions/unanswered');
    }

    return <div>
        <div className="askContainer">
            <span className='title'>Questions</span>
            <div className='block main'>
                <div className='card' style={{ width: '800px' }}>
                    <Input placeholder="What do you want to know?" onChange={titleChange} value={title}></Input>
                    <Button type="primary" onClick={saveTitle}>Ask Question</Button>
                </div>
            </div>
            <div className='card' style={{ marginTop:'10px' }}>
                <Button onClick={popularFilter}>Popular</Button>
                <Button style={{ marginLeft:'10px' }} onClick={recentFilter}>Recent</Button>
                <Button style={{ marginLeft:'10px' }} onClick={unansweredFilter}>Unanswered</Button>
            </div>
        </div>
        {questions.map((item) => <QuestionItem question={item}></QuestionItem>)}
    </div>
}

export default Questions;
