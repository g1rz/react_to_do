import React, { useState , useEffect} from 'react';
import { AddTask } from './AddTask/AddTask.js';
import { Search } from './Search/Search';
import { Filter } from './Filter/Filter.js';
import { Tasks } from './Tasks/Tasks';


import axios from 'axios';

const App = () => {

    // const taskList;
    const [search, setSearch] = useState('');
    const [tasks, setTasks] = useState(null);
    const [filter, setFilter] = useState('all');
    const [filters, setFilters] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);


    useEffect(() => {
        axios
            .get('http://localhost:3001/tasks?_expand=priority&_expand=status')
            .then(({ data }) => {
                setTasks(data);
            });

        axios
            .get('http://localhost:3001/statuses')
            .then(({ data }) => {
                setFilters(data);
            });
    }, []);

    const deleteTask = (id) => {       
        axios
            .delete('http://localhost:3001/tasks/' + id)
            .then(() => {
                const newTasks = tasks.filter( (task) => task.id !== id);
                setTasks(newTasks);
            });
    };

    const onSearch = (text) => {
        setSearch(text);
    };

    const changeFilter = (filter) => {
        setFilter(filter)
    }

    const searchTasks = (tasks, search) => {
        return tasks.filter( (task) => task.text.toLowerCase().indexOf(search.toLowerCase()) > -1);
    }

    const filterTasks = (tasks, filter) => {
        if (filter === 'all') {
            return tasks;
        } else {
            return tasks.filter( (task) => task.status.label === filter );
        }
    }


    const onShowModal = ( id = false ) => {
  
        setEditId(id);
        
        setShowModal(!showModal);
        
    }

    const onAddTask = (task) => {
        const newTasks = [
            ...tasks,
            task
        ]
        setTasks(newTasks);
    }

    const onEditTask = (newTask) => {
        const newTasks = tasks.map(task => {
            if (task.id === newTask.id) {
                return newTask;
            }
            return task;
        });
        setTasks(newTasks);
    }


    let visibleTasks = null;
    
    if (tasks) {
        visibleTasks = filterTasks(searchTasks(tasks, search), filter);
    }
    
    // console.log(editId);
    

    return (
        <div className="container">
            <div className="todo">
                <h1 className="todo__title">My todo-list</h1>
                <div className="todo-nav row row--wrap row--space-b">
                    <button 
                        className="btn add-btn"
                        onClick={onShowModal}>
                            Добавить задачу
                    </button>
                    <Search onSearch={onSearch}/>
                    {
                        tasks && filters &&
                        <Filter 
                            filter={ filter } 
                            filters={ filters }
                            taskList={ tasks }  
                            changeFilter={ changeFilter }
                        />
                    }
                    
                    {
                        tasks &&  
                        <Tasks 
                            taskList={ visibleTasks } 
                            deleteTask={ deleteTask }
                            onShowModal={ onShowModal }
                        />                        
                    }
                </div>
            </div>
            {
                showModal && 
                <AddTask 
                    onShowModal={ onShowModal }
                    onAddTask={ onAddTask }
                    onEditTask={ onEditTask }
                    editId={ editId }/>
            }
            
        </div>
        
    );
};

export default App;