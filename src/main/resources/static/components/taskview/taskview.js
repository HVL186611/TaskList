const taskview = document.createElement("template");
taskview.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${new URL('taskview.css',import.meta.url)}">
    <h1>Tasks</h1>
    <div id="message"><p>Waiting for server data.</p></div>
    <div id="newtask">
        <button type="button" disabled>New task</button>
    </div>
    <!-- The task list -->
    <group7-task-list></group7-task-list>
    <!-- The Modal -->
    <group7-task-box></group7-task-box>
`;

class TaskView extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(taskview.cloneNode(true));
        
    }
}