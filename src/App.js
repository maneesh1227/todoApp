import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

class App extends Component {
  state = { list: [], starred: [] };

  componentDidMount() {
    const storedList = localStorage.getItem('taskList');
    const storedStarredList = localStorage.getItem('starredList');
    if (storedStarredList) {
      this.setState({ starred: JSON.parse(storedStarredList) });
    }
    if (storedList) {
      this.setState({ list: JSON.parse(storedList) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('taskList', JSON.stringify(this.state.list));
    localStorage.setItem('starredList', JSON.stringify(this.state.starred));
  }

  onStar = id => {
    const { starred } = this.state;
    if (starred.includes(id)) {
      this.setState(prevState => ({ starred: prevState.starred.filter(eachItem => eachItem !== id) }));
    } else {
      this.setState(prevState => ({ starred: [...prevState.starred, id] }));
    }
  };

  addTask = task => {
    const newArr = {
      id: uuidv4(),
      task,
    };
    this.setState(prevState => ({ list: [...prevState.list, newArr] }));
  };

  onDelete = id => {
    this.setState(prevState => ({ list: prevState.list.filter(eachItem => eachItem.id !== id) }));
  };

  editTodo = obj => {
    const { id, task } = obj;
    const { list } = this.state;
    const newList = list.map(eachItem => {
      if (eachItem.id === id) {
        return { id, task };
      }
      return eachItem;
    });
    this.setState({ list: newList });
  };

  render() {
    const { list, starred } = this.state;

    return (
      <div className="app-container">
        <h1>Todos</h1>
        <TaskInput addTask={this.addTask} />
        <ul className="task-list">
          {list.map(eachItem => (
            <TaskList
              item={eachItem}
              key={eachItem.id}
              onDelete={this.onDelete}
              editTodo={this.editTodo}
              onStar={this.onStar}
              starred={starred}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
