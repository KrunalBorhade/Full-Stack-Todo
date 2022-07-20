import { useEffect, useState } from 'react';
import './App.css';
import { Item } from './Components/Item';

function App() {

  const [text, setText] = useState("")
  const [todo, setTodo] = useState([]);
  const [isUpdate,setIsUpdate] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((actualData) => setTodo(actualData))
      .catch((err) => {
        console.log(err.message);
      });

  },[])

  const add = () => {
    if (isUpdate === "") {
      fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text
        })
      });
    }
  }

  const deleteTodo = (id) => {
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       
      })
    });
  }

  const updateTodo = (id, text) => {
    setIsUpdate(id);
    setText(text);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">

          <input type="text" placeholder="Add Text...." 
          value={text} 
          onChange={(e) => setText(e.target.value)} />

          <div className="add" onClick={add}>Add</div>
        </div>
        <div className="list">
          {todo.map(item => <Item key={item.id} 
          text={item.title} 
          remove={() => deleteTodo(item.id)} 
          update={() => updateTodo(item.id, item.text)} />)}
         </div>
      </div>

    </div>
  );
}

export default App;
