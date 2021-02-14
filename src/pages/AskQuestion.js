import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Button, Select, Typography,Modal } from 'antd';
import {BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, LinkOutlined, PictureOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {UpdateCollection, GetCollection, GetCurrentUser} from './../data';

function AskQuestion() {

    let history = useHistory();

    const questions = GetCollection("questions");
    const topics = GetCollection("topics");

    const[title, SetTitle] = useState(localStorage.getItem("questionsTitle"));
    const[textQuestion, SetTextQuestion] = useState("");
    const[topic, SetTopic] = useState("");
    const[selectedTopics, SetSelectedTopics] = useState([]);
    const { Option } = Select;

    const topicSelect = [];

        topics.map((item)=> {
            topicSelect.push(<Option key={item.title}>{item.title}</Option>)});
       
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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        var item = {
            "id":topics.length+1,
            "title": topic,
        };

        topics.push(item);
        UpdateCollection("topics", topics);
        setIsModalVisible(false);

        SetTopic("");

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const saveQuestion = () => {

        let id = (questions.length+1).toString();

        var item = {
            "id":id,
            "title": title,
            "textQuestion": textQuestion,
            "topics": selectedTopics.length === 0 ? [] : selectedTopics[selectedTopics.length-1],
            "answers": [],
            "date":new Date(),
            "author": GetCurrentUser(),
            "likes": [],
            "dislikes": []
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

    const textChange = (event) => {
        SetTextQuestion(event.target.value);
    };

    const topicAdded = (event) => {
        SetTopic(event.target.value);
    };

    

    return <div className="askContainer">
        <span className='title'>Ask a question</span>
        <Input placeholder="What do you want to know?" onChange={titleChange} value={title}/>
        <div className='block'>
            <div className='buttonsContainer' style={{ marginTop: '20px'}}  >
                <Select defaultValue="Paragraf" style={{ width: 100 }} onChange={handleChange}>
                    <Option value="Heading">Heading</Option>
                    <Option value="Text">Text</Option>
                </Select>
                <div>
                <BoldOutlined style={{ margin: 'auto', marginLeft:'10px' }} onClick={Weight}/>
                <ItalicOutlined style={{ margin: 'auto', marginLeft:'10px'}} onClick={Italic}/>
                <UnderlineOutlined style={{ margin: 'auto', marginLeft:'10px'}} onClick={Underline} />
                <UnorderedListOutlined style={{ margin: 'auto', marginLeft:'10px' }} />
                <OrderedListOutlined style={{ margin: 'auto', marginLeft:'10px' }} />
                <LinkOutlined style={{ margin: 'auto', marginLeft:'10px' }} />
                <PictureOutlined style={{ margin: 'auto', marginLeft:'10px' }} />
                </div>
            </div>
            <TextArea rows={6} onChange={textChange} id='textBox'/>

            <Text style={{ marginTop: '10px', textAlign: 'left', marginTop: '20px' }}>Popular topics:</Text>

            <div className='topicContainer'>
                <Select
                    mode="tags"
                    size={topics.length}
                    placeholder="Please select topic"
                    onChange={handleChangeTopic}
                    style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                       {topicSelect}
                </Select>
                <Button style={{ marginTop: '20px' }} type="primary" onClick={showModal}>+</Button>
            </div>
            <div>
                <Button style={{ marginTop: '20px', float: 'left' }} type="primary" onClick={saveQuestion}>Save</Button>
                <Button style={{ marginTop: '20px', float: 'left' }} type="text" onClick={cancelQuestion}>Cancel</Button>
            </div>
            <Modal title='Adding' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="Enter new topic" value={topic} onChange={topicAdded}/>   
            </Modal>
        </div>
    </div>;
}

export default AskQuestion;


function Weight () 
{
    const element = document.getElementById('textBox');
    element.style.fontWeight = "800";   
}

function Italic () 
{
    const element = document.getElementById('textBox');
    element.style.fontStyle = "italic";  
}

function Underline () 
{
    const element = document.getElementById('textBox');
    element.style.textDecoration = "underline overline";
}