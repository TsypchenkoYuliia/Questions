import React from "react";
import {BrowserRouter , Route} from "react-router-dom";
import './App.css';
import AskQuestion from './../src/pages/AskQuestion'
import Questions from './../src/pages/Questions'
import Question from './../src/pages/Question'
import { Ininialize } from "./initialize";


function App() {
  return (
    <div className="App">
      <Ininialize></Ininialize>
      <BrowserRouter >
          <Route path="/askQuestion">
            <AskQuestion />
          </Route>
          <Route path="/question/:id">
            <Question />
          </Route>
          <Route path="/questions">
            <Questions />
          </Route>
        </BrowserRouter >
    </div>
  );
}

export default App;
