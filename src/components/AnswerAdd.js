import React from 'react';
import { Select, Typography, Input, Button} from 'antd';
import {BoldOutlined, ItalicOutlined, UnderlineOutlined,
    UnorderedListOutlined, OrderedListOutlined, LinkOutlined, PictureOutlined
} from '@ant-design/icons';


function AnswerAdd(props) {

    const questionId = props.id;

    const { Text } = Typography;
    const { TextArea } = Input;
    const { Option } = Select;

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
            if (item.id === props.id)
                question = item;
        });

        let id = (question.answers.length+1).toString();

        var item = {
            "id":id,
            "text": text,
            "rating": 0,
            "date":new Date()
        };

        question.answers.push(item);

        ClearCollection(questions);
        UpdateCollection("questions", questions);
    };

    return <div>
        
        <div className='block'>
        <Text style={{ marginRight:'auto' }}>Your answer:</Text>
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
            <TextArea rows={6} onChange={textChange}/>
        </div>
        <Button style={{ marginTop: '20px', float: 'left' }} type="primary" onClick={saveAnswer}>Save</Button>
    </div>
}

export default AnswerAdd;