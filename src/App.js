import { UseState } from './UseState';
import { ClassState } from './ClassState';
import { useReducer } from 'react';
import './App.css';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseReducer name={'UseReducer'}/>
      <ClassState name={'ClassState'}/>
    </div>
  );
}

export default App;
