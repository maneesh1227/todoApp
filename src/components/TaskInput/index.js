import { Component } from 'react';
import './index.css';

class TaskInput extends Component {
  state = { taskName: '' };

  onChangeTask = event => {
    this.setState({ taskName: event.target.value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    const { taskName } = this.state;
    const { addTask } = this.props;
    addTask(taskName);
    this.setState({ taskName: '' });
  };

  render() {
    const { taskName } = this.state;

    return (
      <div className="task-input-container">
        <form onSubmit={this.onSubmitForm} className="task-input-form">
          <input
            type="text"
            onChange={this.onChangeTask}
            placeholder="Enter task"
            value={taskName}
            className="task-input"
          />
          <button type="submit" className="add-task-button">Add</button>
        </form>
      </div>
    );
  }
}

export default TaskInput;
