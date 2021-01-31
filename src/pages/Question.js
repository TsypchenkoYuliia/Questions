
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { GetCollection } from './../data';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Select, Typography, Input, Button } from 'antd';
import {CommentOutlined, BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, LinkOutlined, PictureOutlined
} from '@ant-design/icons';
import { UpdateCollection } from './../data';


function Question() {

    let { id } = useParams();

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

        let question = {};

        collection.map((item) => {
            if (item.id === id)
                question = item;
        });

        let answerId = (question.answers.length + 1).toString();

        var item = {
            "id": answerId,
            "text": textAnswer,
            "rating": 0,
            "date": new Date()
        };
        SetTextAnswer("");
        question.answers.push(item);

        UpdateCollection("questions", collection);
        setQuestions(GetCollection("questions"));
    };

    let count = 0;

    return <div className="askContainer" style={{ width: '800px' }}>
        <Text style={{ marginRight: 'auto', fontSize: '35px', fontWeight: '700' }}>{question.title}</Text>
        <div className='card'>
            <div className='info' style={{ marginTop: '25px', marginLeft: '30px' }}>
                <div><UpCircleOutlined style={{ fontSize: '25px' }} /></div>
                <div style={{ fontSize: '20px' }}>{question.rating}</div>
                <div><DownCircleOutlined style={{ fontSize: '25px' }} /></div>
            </div>
            <div className='info'>
            <Text style={{ marginLeft: '10px', marginTop: '25px', fontSize: '15px', fontWeight: '400' }}>{question.date}</Text>
            <Text style={{ fontSize: '25px', fontWeight: '400' }}>{question.textQuestion}</Text>
            </div>
        </div>
        <div style={{ marginRight: 'auto', marginLeft: '100px' }}>
            <CommentOutlined style={{ fontSize: '20px' }} />
            <Button type="text">Edit</Button>
            <Button type="text">Delete</Button>
        </div>
        <div>

            {question.answers.map(item => {
                return <div className='answerContainer' style={{ marginTop: '15px' }}>
                    <div>
                        <div style={{ marginTop: '25px' }}>
                            <Text key={item.id} style={{ fontSize: '15px', fontWeight: '400' }}>Answer {++count}</Text>
                            <div>
                                <UpCircleOutlined style={{ fontSize: '15px' }} />
                                <div style={{ fontSize: '15px' }}>{item.rating}</div>
                                <DownCircleOutlined style={{ fontSize: '15px' }} /></div>
                        </div>
                    </div>
                    <div className='info'>
                        <Text key={item.id} style={{ marginTop: '50px', marginLeft: '50px', fontSize: '15px', fontWeight: '400' }}>{item.date}</Text>
                        <Text key={item.id} style={{ marginLeft: '50px', fontSize: '15px', fontWeight: '400' }}>{item.text}</Text>
                    </div>
                </div>
                { count = 0 }
            })}
        </div>
        <div className='block' style={{ marginTop: '20px' }}>
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
        <Button style={{ marginTop: '20px', float: 'left', width: '100px' }} type="primary" onClick={saveAnswer}>Add answer</Button>
    </div>
}

export default Question;