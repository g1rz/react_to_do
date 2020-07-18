import React, {useState, useEffect} from 'react';

import axios from 'axios';

import './AddTask.sass';

export const AddTask = ({ onShowModal, onAddTask, onEditTask, editId }) => {

    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState(formatDate(new Date(), true));

    const [isLoading, setIsLoading] = useState(false);

    const [priorities, setPriorities] = useState(null);
    const [statuses, setStatuses] = useState(null);

    const [isEdit, setIsEdit] = useState(typeof editId === "number");

    useEffect(() => {
        axios
            .get('http://localhost:3001/priorities')
            .then(({ data }) => {
                setPriorities(data);
                setPriority(data[0].label);
            });

        axios
            .get('http://localhost:3001/statuses')
            .then(({ data }) => {
                setStatuses(data);
                setStatus(data[0].label);
            });

        if (typeof editId === "number") {
            
            axios
                .get('http://localhost:3001/tasks/' + editId + '?_expand=priority&_expand=status')
                .then(({ data }) => {
                    setDesc(data.text);
                    setStatus(data.status.label);
                    setPriority(data.priority.label);
                    setDate(data.planDate.slice(6, 10) + '-' + data.planDate.slice(3, 5) + '-' + data.planDate.slice(0, 2));               
                });
        }

        
    }, []);

    let priorityList = '';
    if (priorities) {
        priorityList = priorities.map((item) => {
            return <option key={item.id} value={item.label}>{item.text}</option>;
        });
    }

    let statusList = '';
    if (statuses) {
        statusList = statuses.map((item) => {
            return <option key={item.id} value={item.label}>{item.text}</option>;
        });
    }

    function formatDate(date, toHtml = false) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        var yyyy = date.getFullYear();
        
        if (toHtml) {
            return yyyy + '-' + mm + '-' + dd;
        } else {
            return dd + '.' + mm + '.' + yyyy;
        }
        
    }

    const submitForm = (e) => {
        e.preventDefault();
        
        if (desc === '') {
            alert('Введите описание задачи')
            return false;
        }

        let factDate = '-';

        if (status === 'complete') {
            factDate = formatDate(new Date());
        }

        const newTask = {
            text: desc,
            planDate: formatDate(new Date(date)),
            factDate: factDate,
            statusId: statuses.filter((statusItem) => statusItem.label === status)[0].id,
            priorityId: priorities.filter((priorityItem) => priorityItem.label === priority)[0].id,
        };

        

        if (!isEdit) {
            setIsLoading(true);
            axios
                .post('http://localhost:3001/tasks', newTask)
                .then(({data}) => {

                    
                    data.priority = priorities.filter((priorityItem) => priorityItem.label === priority)[0];

                    data.status = statuses.filter((statusItem) => statusItem.label === status)[0];

                    onAddTask(data);
                    onShowModal();
                })
                .catch(() => {
                    alert('Ошибка при добавлении списка');
                })
                .finally(() => {
                    setIsLoading(false);   
                })
        } else {
            setIsLoading(true);
            axios
                .patch('http://localhost:3001/tasks/' + editId, newTask)
                .then(({data}) => {

                    
                    data.priority = priorities.filter((priorityItem) => priorityItem.label === priority)[0];

                    data.status = statuses.filter((statusItem) => statusItem.label === status)[0];

                    onEditTask(data);
                    onShowModal();
                })
                .catch(() => {
                    alert('Ошибка при изменении списка');
                })
                .finally(() => {
                    setIsLoading(false);   
                })
        }
        
    }

    // const isEdit = typeof editId == "number";

    const title = isEdit ? 'Редактировать задачу' : 'Создание задачи';
    

    return (
        <div className="modal">
            <button 
                className="modal__close btn"
                onClick={() => onShowModal()}>
                    X
            </button>
            <h2 className="modal__title">{ title }</h2>
            <div className="t-form">
                <div className="row row--wrap">
                    <div className="t-form__wrap">
                        <label 
                            htmlFor="task_descr" 
                            className="t-form__label">
                                Описание*:
                        </label>
                        <textarea 
                            name="descr" 
                            id="task_descr"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            className="t-form__textarea"/>
                    </div>
                    {
                        priorities && (     
                            <div className="t-form__wrap t-form__wrap--half">
                                <label 
                                    htmlFor="task_priority" 
                                    className="t-formm-_label">
                                        Приоритет:
                                </label>
                                <select 
                                    value={priority}
                                    className="t-form__select" 
                                    name="priority" 
                                    onChange={e => setPriority(e.target.value)}
                                    id="task_priority">
                                    {priorityList}
                                </select>
                            </div>
                        )
                    }
                    
                    {
                        statuses && (
                            <div className="t-form__wrap t-form__wrap--half">
                                <label 
                                    htmlFor="task_status" 
                                    className="t-formm-_label">
                                        Статус:
                                </label>
                                <select 
                                    className="t-form__select" 
                                    name="status" 
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                    id="task_status">
                                    {statusList}
                                </select>
                            </div>
                        )
                    }
                    
                    <div className="t-form__wrap t-form__wrap--half">
                        <label 
                            htmlFor="task_date" 
                            className="t-form__label">
                                Крайний срок:
                        </label>
                        <input 
                            type="date" 
                            id="task_date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="t-form__input t-form__input--date"/>
                    </div>

                    <div className="t-form__wrap t-form__wrap--half">
                        <button
                            className="btn t-form__submit"
                            onClick={submitForm}>
                            {isLoading ? 'Добавление...' : 'Сохранить'}
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
