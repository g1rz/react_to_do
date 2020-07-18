import React from 'react';

import './TaskItem.sass';

export const TaskItem = ( {task, deleteTask, onShowModal} ) => {

    const onEditeTask = (taskId) => {
        console.log('start edit', taskId);
        
    }

    return (
        <tr className="task-item">
            <td 
                className="task-item__text"
                onDoubleClick={() => onShowModal(task.id)}>
                    {task.text}
            </td>
            <td>{task.status.text}</td>
            <td>{task.priority.text}</td>
            <td>{task.planDate}</td>
            <td>{task.factDate}</td>
            <td>
                <button className="btn" onClick={() => deleteTask(task.id)} >
                    Удалить
                </button>
            </td>
        </tr>
    )
}
