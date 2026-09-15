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

function success(json) {
    return json.responseStatus;
}

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
        // let's not paste this ugly thing all over the code
        return await fetch(`${this.serviceUrl}${url}`)
        
    }

    async loadStatuses() {
        const response = await this.ftch("/allstatuses");
        const json = await response.json();

        if (!success(json)) return; // update message?

        const statuses = json.allstatuses;
        this.#tasklist.setStatuseslist(statuses);
        this.#taskbox.setStatuseslist(statuses);
    }

    async loadTasks() {
        const response = await this.ftch("/tasklist");
        const json = await response.json();

        if (!success(json)) return; // update message?
        
        const tasks = json.tasks;
        for (const task of tasks)
            this.#tasklist.showTask(task);
    }

    async addTask(task) {
        "task.title, task.status";
        let data = null;
        try {
            const response = await fetch(`${this.serviceUrl}/task`, {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(task)
            });
            try {
                data = await response.json()
            } catch(e) { console.log(e); }
        } catch(e) { console.log(e); }
        
        //this.#tasklist.showTask(task);

        return data;
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
await view.addTask({
    title: "test",
    status: "DONE"
});
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