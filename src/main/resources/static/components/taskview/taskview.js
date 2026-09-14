import "../tasklist/tasklist.js";
import "../taskbox/taskbox.js";

const taskview = document.createElement("template");
taskview.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${new URL('taskview.css',import.meta.url)}">
    <h1>Tasks</h1>
    <div id="message"><p>Waiting for server data.</p></div>
    <div id="newtask">
        <button type="button">New task</button>
    </div>
    <!-- The task list -->
    <group7-task-list id="tasklist"></group7-task-list>
    <!-- The Modal -->
    <group7-task-box id="taskbox"></group7-task-box>
`;

class TaskView extends HTMLElement {
    #taskbox; #tasklist;
    constructor() {
        super();

        this.serviceUrl = this.getAttribute("data-serviceurl");

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(taskview.content.cloneNode(true));
        this.shadowRoot.getElementById("newtask")
            .addEventListener("click", this.showNewTask.bind(this));
        
        this.#tasklist = this.shadowRoot.querySelector("group7-task-list");
        this.#taskbox = this.shadowRoot.querySelector("group7-task-box");

        this.#tasklist.addChangestatusCallback(this.changeStatus.bind(this));
        this.#tasklist.addDeletetaskCallback(this.deleteTask.bind(this));

        this.#taskbox.addNewTaskCallback(this.addTask.bind(this));
    }

    async ftch(url) {
        return await fetch(`${this.serviceUrl}${url}`)
    }

    async loadStatuses() {
        const response = await this.ftch("/allstatuses");
        const json = await response.json();
        const statuses = json.allstatuses;
        this.#tasklist.setStatuseslist(statuses);
        this.#taskbox.setStatuseslist(statuses);
    }

    async loadTasks() {
        const response = await this.ftch("/tasklist");
        const json = await response.json();
        const tasks = json.tasks;
        for (const task of tasks)
            this.#tasklist.showTask(task);
    }

    addTask(task) {
        "task.title, task.status";
        this.#tasklist.showTask(task);
    }

    changeStatus(id, newStatus) {

    }

    deleteTask(id) {
        this.#tasklist.removeTask(id);
    }

    updateMessage() {

    }


    showNewTask() {
        this.#taskbox.show();
    }
}

customElements.define('group7-task-view', TaskView);
const view = document.querySelector("group7-task-view");
view.loadStatuses();
view.loadTasks();

/*
// demo/test code from tasklist for copy/pasting to test taskview

// velg tasklist elementet så vi kan bruke metoder
const taskList = document.querySelector("group7-task-list");

const statuses = ["WAITING", "ACTIVE", "DONE"]
taskList.setStatuseslist(statuses);

const tasks = [
    {
        id: 1,
        status: "DONE",
        title: "Look at ducks"
    },
    {
        id: 2,
        status: "ACTIVE",
        title: "Feed ducks"
    },
    {
        id: 3,
        status: "WAITING",
        title: "Say bye to ducks :("
    },
    {
        id: 4,
        status: "ACTIVE",
        title: "Chase away geese"
    }
]

for (let t of tasks) {
    taskList.showTask(t);
}

const status = {id: 4, status: "DONE"};
taskList.updateTask(status);
taskList.addDeletetaskCallback(
    (id) => {
        console.log(`Honk approved for ${id}`);
    }
);
//*/