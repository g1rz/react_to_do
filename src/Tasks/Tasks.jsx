import React from 'react';

import './Tasks.sass';
import { TaskItem } from './TaskItem';

export const Tasks = ({ taskList , deleteTask, onShowModal}) => {

    const tasks = taskList.map(task => {
        return (
            <TaskItem 
                key={task.id} 
                task={task} 
                deleteTask={deleteTask}
                onShowModal={onShowModal}/>
        )
    });
    
    return (
        <table className="tasks">
            <thead  className="tasks__head">
                <tr>
                    <th>Описание</th>
                    <th>Статус</th>
                    <th>Приоритет</th>
                    <th>Плановая дата окончания</th>
                    <th>Фактическая дата окончания</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                { tasks }
            </tbody>
        </table>
    )
}
