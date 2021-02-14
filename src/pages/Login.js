import React, { useState } from 'react';
import './../App.css';
import { Input,  Button } from 'antd';
import { useHistory } from 'react-router-dom';

function Login() {

    let history = useHistory();
    
    const[name, SetName] = useState("");

    function changeName(event) {
        SetName(event.target.value);
    }

    function saveName() {
        localStorage.setItem('userName', name);

        if(name !== "")
            history.replace('/questions');        
    }

    return <div className='nameContainer'>
        <Input 
            value={name}
            onChange={changeName}
            style={{margin:'10px'}}
            placeholder="Your name:" />
        <Button type="primary"
            onClick={saveName}
            style={{margin:'auto', width:'100px'}}>Login</Button>
    </div>;
}

export default Login;