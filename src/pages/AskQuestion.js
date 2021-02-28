import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Select} from 'antd';
import { useHistory } from 'react-router-dom';
import {UpdateCollection, GetCollection, GetCurrentUser} from './../data';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AskQuestion() {

    let history = useHistory();

    const questions = GetCollection("questions");

    const[title, SetTitle] = useState(localStorage.getItem("questionsTitle"));
    const[textQuestion, SetTextQuestion] = useState("");
    const[selectedTopics, SetSelectedTopics] = useState([]);
    const[topics, SetTopics] = useState(GetCollection("topics"));
    const { Option } = Select;

    const topicSelect = [];
        topics.map((item)=> {
            topicSelect.push(<Option key={item}>{item}</Option>)});
    
    function handleChangeTopic(value) {

        UpdateCollection("topics", value);

        selectedTopics.push(value);
        SetSelectedTopics(selectedTopics);
    }

    const saveQuestion = () => {

        let id = (questions.length+1).toString();

        var item = {
            id:id,
            title: title,
            textQuestion: textQuestion,
            topics: selectedTopics.length === 0 ? [] : selectedTopics[selectedTopics.length-1],
            answers: [],
            date:new Date(),
            author: GetCurrentUser(),
            likes: [],
            dislikes: []
        };
        localStorage.setItem("questionsTitle", "");
        questions.push(item);
        UpdateCollection("questions", questions);
        history.replace('/question/' + id);
    };

    const cancelQuestion = () => {
        history.replace('/questions');
    };

    const titleChange = (event) => {
        SetTitle(event.target.value);
    };

    // const textChange = (event) => {
    //     SetTextQuestion(event);
    // };

    const textChange = value => {
        SetTextQuestion(value);
    };

    return <div className="askContainer">
        <span className='title'>Ask a question</span>
        <Input placeholder="What do you want to know?" onChange={titleChange} value={title}/>
            <ReactQuill style={{ height: '200px', marginTop: '30px'}} onChange={textChange} value={textQuestion}/>
            <div style={{ marginTop: '50px' }} className='topicContainer'>
                <Select
                    mode="tags"
                    size={topics.length}
                    placeholder="Please select topic"
                    onChange={handleChangeTopic}
                    style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                       {topicSelect}
                </Select>
            </div>
            <div>
                <Button style={{ marginTop: '20px', float: 'left' }} type="primary" onClick={saveQuestion}>Save</Button>
                <Button style={{ marginTop: '20px', float: 'left' }} type="text" onClick={cancelQuestion}>Cancel</Button>
            </div>
    </div>;
}
export default AskQuestion;