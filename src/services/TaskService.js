import axios from 'axios';

export default class TaskService {
    
    constructor() {
        this._apiBase = 'http://localhost:3001';

        this.getTasks = this.getTasks.bind(this);
    }

    async getTasks() {
        let tasks = null;
        axios.get('http://localhost:3001/tasks?_expand=priority&_expand=status')
            .then(({ data }) => {
                tasks = data;
            });
    }
}
