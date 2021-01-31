import React from 'react';
import { Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Question from './../pages/Question';

function QuestionItem(props) {

    let history = useHistory();

    const question = props.question;
    const { Text } = Typography;

    const Answers = () => {
        history.replace('/question/' + question.id);
    };

    return <div className='card'>
        <Text>{question.votes}</Text>
        <Text>Votes</Text>
        <div className='info'>
            <Button onClick={Answers}>{question.title}</Button>
            <Text>{question.answers}</Text>
        </div>
    </div>
}

export default QuestionItem;