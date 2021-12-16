import "./App.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import service from './TodoService';

const selectTodos = state => state.todos;

function App() {

    const tasks = useSelector(selectTodos);
    const dispatch = useDispatch();

    const [taskName, setTaskName] = useState('');
    const onChangeTaskName = (e) => {
        setTaskName(e.target.value);
    };
    const onSubmitTaskName = (e) => {
        dispatch((dispatch) => {
            service.addTask(taskName);
            dispatch({type: 'todos/change', todos: service.getData()})
        });
    };

    const removeTask = (id) => {
        return () => {
            dispatch((dispatch) => {
                service.removeTask(id);
                dispatch({type: 'todos/change', todos: service.getData()})
            });
        };
    }

    const finishTask = (id) => {
        return () => {
            dispatch((dispatch) => {
                service.setActive(id, false);
                dispatch({type: 'todos/change', todos: service.getData()})
            });
        };
    }

    return <div className="app-container d-flex align-items-center justify-content-center flex-column">
        <h3>Todo App</h3>
        <div className="d-flex align-items-center mb-3">
            <div className="form-group mr-3 mb-0">
                <input
                    value={taskName}
                    onChange={onChangeTaskName}
                    type="text"
                    className="form-control"
                    placeholder="Enter a task here"
                />
            </div>
            <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={onSubmitTaskName}
            >
                Save
            </button>
        </div>
        <div className="table-wrapper">
            <table className="table table-hover table-bordered">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Todo item</th>
                    <th>status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => <tr key={task.id} className="{{ task.status ? 'table-success' : 'table-light' }}">
                    <td>{task.id}</td>
                    <td className={!task.active ? 'complete' : 'task'}>
                        {task.name}
                    </td>
                    <td>{!task.active ? "Completed" : "In progress"}</td>
                    <td>
                        <button className="btn btn-danger" onClick={removeTask(task.id)}>
                            Delete
                        </button>
                        <button className="btn btn-success" onClick={finishTask(task.id)}>
                            Finished
                        </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
    </div>;
}

export default App;