import ConnectionDB from '../singleton/ConnectionDB';

const taskDB = ConnectionDB.getInstance().getDB('task');

taskDB.create(
    new Task('Tarefa 1', 'Descrição da tarefa 1'),
);

taskDB.create(
    new Task('Tarefa 2', 'Descrição da tarefa 2'),
);

taskDB.create(
    new Task('Tarefa 3', 'Descrição da tarefa 3'),
);

console.log(taskDB.getAll());

var task = taskDB.read(1);
task.status = 1;
taskDB.update(1, task);

console.log(taskDB.getAll());

// delete
taskDB.delete(1);
console.log(taskDB.getAll());

// create new
taskDB.create(
    new Task('Tarefa 4', 'Descrição da tarefa 4'),
);
console.log(taskDB.getAll());

// getTotalItems
console.log(taskDB.getTotalItems());

if(taskDB.getTotalItems() === 3) {
    console.log('OK');
}else{
    console.log('FAIL');
}
