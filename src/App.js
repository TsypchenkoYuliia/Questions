import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import './App.css';
import AskQuestion from './../src/pages/AskQuestion'
import EditQuestion from './../src/pages/EditQuestion'
import Questions from './../src/pages/Questions'
import Question from './../src/pages/Question'
import Login from './../src/pages/Login'
import { Ininialize } from "./initialize";


function App() {
  return (
    <div className="App">
      <Ininialize></Ininialize>
      <BrowserRouter >
        <Route path="/" exact>
            <Redirect to="/login" />
          </Route> 
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/askQuestion" exact>
            <AskQuestion />
          </Route>
          <Route path="/editQuestion/:id" exact>
            <EditQuestion />
          </Route>
          <Route path="/question/:id" exact>
            <Question />
          </Route>
          <Route path="/questions" exact>
            <Questions />
          </Route>
          <Route path="/questions/:filter" exact>
            <Questions />
          </Route>
        </BrowserRouter >
    </div>
  );
}

export default App;
