
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { GetCollection } from './../data';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Select, Typography, Input, Button, Alert } from 'antd';
import {
    CommentOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, LinkOutlined, PictureOutlined
} from '@ant-design/icons';
import { UpdateCollection } from './../data';
import Moment from 'moment';
import { GetCurrentUser } from './../data';


function Question() {

    let { id } = useParams();
    let history = useHistory();

    const { Text } = Typography;
    const { TextArea } = Input;
    const { Option } = Select;
    const [textAnswer, SetTextAnswer] = useState("");
    let [questions, setQuestions] = useState([]);

    const collection = GetCollection("questions");

    let question = {};

    collection.map((item) => {
        if (item.id === id) {
            question = item;
        }
    });


    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    const textChange = (event) => {
        SetTextAnswer(event.target.value);
    };

    const saveAnswer = () => {

        const collection = GetCollection("questions");

        let question = collection.find(x => x.id == id);

        // collection.map((item) => {
        //     if (item.id === id)
        //         question = item;
        // });

        let answerId = (question.answers.length + 1).toString();

        var item = {
            "id": answerId,
            "text": textAnswer,
            "date": new Date(),
            "author": GetCurrentUser(),
            "likes": [],
            "dislikes": []
        };
        SetTextAnswer("");
        question.answers.push(item);

        UpdateCollection("questions", collection);
        setQuestions(GetCollection("questions"));
    };

    function addLike() {

        let collection = GetCollection("questions");
        let currentUser = GetCurrentUser();
        let question = collection.find(x => x.id == id);

        if (question.likes.length > 0 && question.likes.find(x => x === currentUser)) {
            //<Alert message="You cannot like" type="error" /> 
            alert("You cannot like");
        }
        else
            question.likes.push(currentUser);

        UpdateCollection("questions", collection);
        setQuestions(GetCollection("questions"));
    }

    function addDislike() {

        let collection = GetCollection("questions");
        let currentUser = GetCurrentUser();
        let question = collection.find(x => x.id == id);

        if (question.dislikes.length > 0 && question.dislikes.find(x => x === currentUser)) {
            //<Alert message="You cannot like" type="error" /> 
            alert("You cannot dislike");
        }
        else
            question.dislikes.push(currentUser);

        UpdateCollection("questions", collection);
        setQuestions(GetCollection("questions"));
    }

    function addLikeAnswer(answerId) {

        let collection = GetCollection("questions");
        let currentUser = GetCurrentUser();
        let question = collection.find(x => x.id == id);
        let answer = question.answers.find(x => x.id == answerId);

        if (answer.likes.length > 0 && answer.likes.find(x => x === currentUser)) {
            //<Alert message="You cannot dislike" type="error" />
            alert("You cannot like");
        }
        else
            answer.likes.push(currentUser);

        UpdateCollection("questions", collection);
        setQuestions(GetCollection("questions"));
    }

    function addDislikeAnswer(answerId) {

        let collection = GetCollection("questions");
        let currentUser = GetCurrentUser();
        let question = collection.find(x => x.id == id);
        let answer = question.answers.find(x => x.id == answerId);

        if (answer.dislikes.length > 0 && answer.dislikes.find(x => x === currentUser)) {
            //<Alert message="You cannot dislike" type="error" />
            alert("You cannot dislike");
        }
        else
            answer.dislikes.push(currentUser);

        UpdateCollection("questions", collection);
        setQuestions(GetCollection("questions"));
    }

    function editQuestion()
    {
        history.replace('/editQuestion/'+ id);
    }

    function deleteQuestion()
    {
        let collection = GetCollection("questions");
        let index = collection.indexOf(collection.find(x=>x.id === id));
        collection.splice(index, 1);

        UpdateCollection("questions", collection);
        history.replace('/questions/');
    }

    let count = 0;

    return <div className="askContainer" style={{ width: '800px' }}>
        <Text style={{ fontSize: '15px', fontSize: '25px', fontWeight: '400' }}>Answers to the question:</Text>
        <div className='card'>
            <div className='info' style={{ marginTop: '30px', marginLeft: '30px' }}>
                <div><UpCircleOutlined style={{ fontSize: '25px' }} onClick={addLike} /></div>
                <div style={{ fontSize: '30px', marginTop: '10px' }}>{question.likes.length - question.dislikes.length}</div>
                <div><DownCircleOutlined style={{ fontSize: '25px', marginTop: '10px' }} onClick={addDislike} /></div>
            </div>
            <div className='info' style={{ marginTop: '25px', marginLeft: '30px' }}>
                <div className='titleContainer'>
                    <Text style={{ marginLeft: '10px', fontSize: '15px', fontWeight: '400', color: 'blue' }}>Author: {question.author}</Text>
                    <Text style={{ marginLeft: '10px', fontSize: '15px', fontWeight: '400', color: 'green' }}>{Moment(question.date).format('DD/MM/YYYY')}</Text>
                </div>
                <Text style={{ fontSize: '15px', fontWeight: '300', marginTop: '15px', textAlign: 'left' }}>{question.textQuestion}</Text>
            </div>
        </div>
        <div style={{ marginRight: 'auto', marginLeft: '100px', marginTop: '15px' }}>
            <CommentOutlined style={{ fontSize: '20px' }} /> Comment
            <span style={{ fontSize: '20px', marginLeft: '10px', marginRight: '5px' }}>&bull;</span>
            <Button type="text" onClick={editQuestion}>Edit</Button>
            <span style={{ fontSize: '20px', marginLeft: '5px', marginRight: '5px' }}>&bull;</span>
            <Button type="text" onClick={deleteQuestion}>Delete</Button>
        </div>
        <ColoredLine color="#eceaea" />
        <div>
            {question.answers != null ? question.answers.map(item => {
                return <div className='answerContainer' style={{ marginTop: '15px' }}>
                    <div>
                        <div>
                            <Text key={item.id} style={{ fontSize: '15px', fontWeight: '400', width: '100px' }}>Answer&bull;{++count}</Text>
                            <div>
                                <UpCircleOutlined style={{ fontSize: '15px' }} onClick={() => addLikeAnswer(item.id)} />
                                <div style={{ fontSize: '15px' }}>{item.likes.length - item.dislikes.length}</div>
                                <DownCircleOutlined style={{ fontSize: '15px' }} onClick={() => addDislikeAnswer(item.id)} /></div>
                        </div>
                    </div>
                    <div className='info'>
                        <div className='titleContainer'>
                            <Text key={item.id} style={{ marginTop: '25px', marginLeft: '50px', fontSize: '15px', fontWeight: '400', color: 'blue' }}>{item.author}</Text>
                            <Text key={item.id} style={{ marginTop: '25px', marginLeft: '50px', fontSize: '15px', fontWeight: '400', color: 'green' }}>{Moment(item.date).format('DD/MM/YYYY')}</Text>
                        </div>
                        <Text key={item.id} style={{ marginLeft: '50px', fontSize: '15px', fontWeight: '400', textAlign: 'left' }}>{item.text}</Text>
                        <div>
                            <div style={{ marginTop: '15px', float: 'left' }}>
                                <CommentOutlined style={{ fontSize: '20px' }} /> Comment
                                <span style={{ fontSize: '20px', marginLeft: '15px' }}>&bull;</span>
                                <Button style={{ marginLeft: '2px' }} type="text">Assept answer</Button>
                            </div>
                        </div>
                        <ColoredAnswerLine color="#eceaea" />
                    </div>
                </div>
                { count = 0 }
            }) : <div></div>}
        </div>
        <div className='block' style={{ marginTop: '20px', width:'900px' }}>
            <Text style={{ marginRight: 'auto', marginLeft: '50px', fontSize: '25px', fontWeight: '400' }}>Your answer:</Text>
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
                <div style={{ width: '450px' }}></div>
            </div>
            <TextArea rows={6} onChange={textChange} value={textAnswer} />
        </div>
        <Button style={{ marginTop: '20px', float: 'left', width: '100px', marginBottom: '50px' }} type="primary" onClick={saveAnswer}>Add answer</Button>
    </div>
}

export default Question;

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            height: 2,
            width: 900
        }}
    />
);

const ColoredAnswerLine = ({ color }) => (
    <hr
        style={{
            color: color,
            height: 2,
            width: 900,
            marginLeft:-65
        }}
    />
);