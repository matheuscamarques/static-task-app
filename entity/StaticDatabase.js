"use strict";
export default class StaticDatabase {
    constructor() {
        this.db = {};
        this.totalItems = 0;
        this.deleted = [];
    }
    create(data) {
        data.id = ++this.totalItems;
        this.db[data.id] = data;
    }

    exist(id) {
        return this.db[id] !== undefined;
    }

    read(id) {
        return this.db[id];
    }

    update(id, data) {
        this.db[id] = data;
    }

    delete(id) {
        this.deleted.push(this.db[id]);
        delete this.db[id];
    }

    getAll() {
        return Object.keys(this.db).map(key => this.db[key]);
    }

    getTotalItems() {
        return this.totalItems - this.deleted.length;
    }

}