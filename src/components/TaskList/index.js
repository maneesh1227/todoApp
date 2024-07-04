import { FaRegStar, FaStar } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Popup from 'reactjs-popup';
import { Component } from 'react';
import './index.css';

class TaskList extends Component {
  state = { editedTodoName: '' };

  onChangeTodoName = event => {
    this.setState({ editedTodoName: event.target.value });
  };

  onClickStar = () => {
    const { item, onStar } = this.props;
    const { id } = item;
    onStar(id);
  };

  onSubmitEditForm = (event, close) => {
    event.preventDefault();
    const { editedTodoName } = this.state;
    const { item, editTodo } = this.props;
    const { id } = item;
    const newObj = { id, task: editedTodoName };
    editTodo(newObj);
    close();
  };

  render() {
    const { item, onDelete, starred } = this.props;
    const { id, task } = item;

    return (
      <li className="task-item">
        <h1 className="task-name">{task}</h1>
        <button className={starred.includes(id) ? "star" : "noStar"} onClick={this.onClickStar}>
          {starred.includes(id) ? <FaStar /> : <FaRegStar />}
        </button>
        <Popup modal trigger={<button className="edit-button">Edit</button>}>
          {close => (
            <>
              <form onSubmit={(event) => this.onSubmitEditForm(event, close)}>
                <input
                  onChange={this.onChangeTodoName}
                  type="text"
                  placeholder="Enter task"
                  className="edit-input"
                />
                <button type="submit" className="edit-submit-button">Edit</button>
              </form>
              <button type="button" className="close-button" onClick={() => close()}>Close</button>
            </>
          )}
        </Popup>
        <button onClick={() => onDelete(id)} className="delete-button"><AiOutlineDelete /></button>
      </li>
    );
  }
}

export default TaskList;
