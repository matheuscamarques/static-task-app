"use strict";
import StaticDatabase from "../entity/StaticDatabase.js";
// Connection é um Singleton
export default class ConnectionDB {

    constructor() {
        this.db = {};
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ConnectionDB();
        }
        return this.instance;
    }

    getDB(entity) {
        if (!this.db[entity]) {
            this.db[entity] = new StaticDatabase(entity);
        }
        return this.db[entity];
    }

}


window.ConnectionDB = ConnectionDB;