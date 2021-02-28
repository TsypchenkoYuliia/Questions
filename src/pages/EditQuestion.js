
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useParams, useHistory } from "react-router-dom";
import { Input, Button, Select, Typography,Modal } from 'antd';
import {UpdateCollection, GetCollection} from './../data';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function EditQuestion() {

    let { id } = useParams();
    let history = useHistory();

    let questions = GetCollection("questions");
    let topics = GetCollection("topics");
    let question = questions.find(x=>x.id === id);

    const[title, SetTitle] = useState(question.title);
    const[textQuestion, SetTextQuestion] = useState(question.textQuestion);
    const[topic, SetTopic] = useState("");
    const[selectedTopics, SetSelectedTopics] = useState([]);
    const { Option } = Select;

    const topicSelect = [];

        topics.map((item)=> {
            topicSelect.push(<Option key={item}>{item}</Option>)});
       
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { TextArea } = Input;
    const { Text } = Typography;

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function handleChangeTopic(value) {
        selectedTopics.push(value);
        SetSelectedTopics(selectedTopics);
    }

    const textChange = value => {
        SetTextQuestion(value);
    };

    const saveQuestion = () => {

        const collection = GetCollection("questions");
        let question = collection.find(x => x.id == id);

        question.title = title;
        question.textQuestion = textQuestion;
        question.topics = selectedTopics[selectedTopics.length-1];

        UpdateCollection("questions", collection);
        history.replace('/questions');
    };

    const cancelQuestion = () => {
        history.replace('/questions');
    };

    const titleChange = (event) => {
        SetTitle(event.target.value);
    };

    return <div className="askContainer">
        <span className='title'>Ask a question</span>
        <Input placeholder="What do you want to know?" onChange={titleChange} value={title}/>
        <div className='block'>
             <ReactQuill style={{ height: '200px', marginTop: '30px'}} onChange={textChange} value={textQuestion}/>

            <div className='topicContainer'>
                <Select
                    mode="tags"
                    defaultValue={question.topics}
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

        </div>
    </div>;
}

export default EditQuestion;