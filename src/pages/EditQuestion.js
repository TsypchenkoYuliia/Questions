
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { useParams, useHistory } from "react-router-dom";
import { Input, Button, Select, Typography,Modal } from 'antd';
import {BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, LinkOutlined, PictureOutlined
} from '@ant-design/icons';
import {UpdateCollection} from './../data';
import {GetCollection} from './../data';
import {GetCurrentUser} from './../data';


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
            <div className='buttonsContainer' style={{ marginTop: '20px' }}  >
                <Select defaultValue="Paragraf" style={{ width: 100 }} onChange={handleChange}>
                    <Option value="Heading">Heading</Option>
                    <Option value="Text">Text</Option>
                </Select>
                <BoldOutlined style={{ margin: 'auto' }} />
                <ItalicOutlined style={{ margin: 'auto' }} />
                <UnderlineOutlined style={{ margin: 'auto' }} />
                <UnorderedListOutlined style={{ margin: 'auto' }} />
                <OrderedListOutlined style={{ margin: 'auto' }} />
                <LinkOutlined style={{ margin: 'auto' }} />
                <PictureOutlined style={{ margin: 'auto' }} />
            </div>
            <TextArea rows={6} onChange={textChange} value={textQuestion}/>

            <Text style={{ marginTop: '10px', textAlign: 'left', marginTop: '20px' }}>Popular topics:</Text>

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

export default EditQuestion;