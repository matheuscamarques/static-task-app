"use strict";
export default class Task {
    constructor(titulo, description) {
        this.id = 0;
        this.title = titulo;
        this.description = description;
        this.created_at = new Date().toLocaleString();
        this.updated_at = new Date().toLocaleString();
        this.status = 0;
    }

    getStatus(){
        return this.status == 0 ? 'In Progress' : 'Done';
    }
}

window.Task = Task;