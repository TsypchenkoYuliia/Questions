import React from 'react';
import { Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Question from './../pages/Question';
import Moment from 'moment';

function QuestionItem(props) {

    let history = useHistory();

    const question = props.question;
    const { Text } = Typography;
    const { Title } = Typography;


    const Answers = () => {
        history.replace('/question/' + question.id);
    };

    let votes = question.likes.length - question.dislikes.length;

    return <div onClick={Answers}>
        <div className='cardBox'>
        <div className='box'>
            <Text style={{ marginTop: '10px' }}>{votes}</Text>
            <Text>Votes</Text>
        </div>
        <div className='info' style={{ marginLeft: '50px', marginTop: '10px' }}>
            <Title level={5}>{question.title} </Title>
            <div className='titleContainer'>
                {question.answers.length > 0 ? <div>
                    <Text style={{ marginRight: '10px' }} level={5}>{question.answers.length} answers</Text>&bull;
                    <Text style={{ marginRight: '10px', marginLeft: '10px' }} level={5}>{question.answers[question.answers.length - 1].author}</Text>&bull;
                    <Text style={{ marginLeft: '10px' }} level={5}>{Moment(question.answers[question.answers.length - 1].date).format('DD/MM/YYYY')}</Text>
                </div> : <div></div>}
            </div>
            <div className='titleContainer' style={{ marginTop: '10px', float: 'left' }}>
                {question.topics === null || question.topics.length > 0 ? <div>
                    {question.topics.map(item => {
                        return <Button type="dashed" style={{ fontSize: '10px', height: '25px', marginLeft: '5px' }} level={5} >{item}</Button>
                    })}
                </div> : <div></div>}
            </div>
        </div>
    </div>
        <ColoredLine color="#eceaea" />
    </div>
}

export default QuestionItem;


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            height: 2,
            width: 900
        }}
    />
);