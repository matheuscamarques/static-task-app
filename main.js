// É necessário aguardar que todos os recursos sejam carregados.
window.addEventListener('load', Main);

var taskDB = undefined;
var EventEmmiter = {
    onChange: function () { },
    onDelete: function () { },
    OnInit: function () { }
};
async function Main() {
    // Atenção fazer tudo da aplicação aqui dentro da função main
    taskDB = ConnectionDB.getInstance().getDB('task');

    // Disparo de Eventos para atualizar UI
    EventEmmiter = {
        onChange: LoadTasks,
        onDelete: LoadTasks,
        OnInit: LoadTasks
    };


    //Start Aplication
    EventEmmiter.OnInit();
}



//Função para carregar as tarefas
function LoadTasks() {
    if (!taskDB) return;
    console.log("Event received");
    let tasks = taskDB.getAll();
    console.log(tasks);
    let listTasks = document.getElementById('list-tasks');
    let table = listTasks.getElementsByTagName('table')[0];
    // remove coluns table 
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let row = table.insertRow(i + 1);
        let cellId = row.insertCell(0);
        let cellTitle = row.insertCell(1);
        let cellDescription = row.insertCell(2);
        let cellCreatedAt = row.insertCell(3);
        let cellUpdatedAt = row.insertCell(4);
        let cellStatus = row.insertCell(5);
        let cellActions = row.insertCell(6);
        cellId.innerHTML = task.id;
        cellTitle.innerHTML = task.title;
        cellDescription.innerHTML = task.description;
        cellCreatedAt.innerHTML = task.created_at;
        cellStatus.innerHTML = task.getStatus();
        cellUpdatedAt.innerHTML = task.updated_at;
        cellActions.innerHTML = `<button onclick="GetTask(${task.id})">Edit</button>
                                        <button onclick="DeleteTask(${task.id})">Delete</button>`;
    }

}
//Função para criar uma task
function CreateTask() {
    if (!taskDB) return;
    let title = document.getElementById('title-input').value;
    let description = document.getElementById('description-input').value;
    let task = new Task(title, description);
    taskDB.create(task);
    EventEmmiter.onChange();
}
//Função para deletar uma task
function DeleteTask(id) {
    if (!taskDB) return;
    taskDB.delete(id);
    EventEmmiter.onDelete();
}
//Função para atualizar uma task
function UpdateTask() {
    if (!taskDB) return;
    let id = document.getElementById('selected-id-input').value;
    let title = document.getElementById('selected-title-input').value;
    let description = document.getElementById('selected-description-input').value;
    let status = document.getElementById('selected-status-input').value;
    let task = taskDB.read(id);
    task.title = title;
    task.description = description;
    task.status = status;
    task.updated_at = new Date().toLocaleString();
    taskDB.update(task.id, task);
    EventEmmiter.onChange();
}

//Função para buscar uma task
function GetTask(id) {
    if (!taskDB) return;
    let task = taskDB.read(id);
    document.getElementById('selected-id-input').value = task.id;
    document.getElementById('selected-title-input').value = task.title;
    document.getElementById('selected-description-input').value = task.description;
    document.getElementById('selected-status-input').value = task.status;
}