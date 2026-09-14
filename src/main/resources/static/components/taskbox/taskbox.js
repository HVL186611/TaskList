const taskbox = document.createElement("template");
taskbox.innerHTML = `
    <link rel="stylesheet" type="text/css"
        href="${new URL('taskbox.css',import.meta.url)}">
    <dialog>
       <!-- Modal content -->
        <span>&times;</span>
        <div>
            <div>Title:</div>
            <div>
                <input type="text" size="25" maxlength="80"
                    placeholder="Task title" autofocus/>
            </div>
            <div>Status:</div><div><select></select></div>
        </div>
        <p><button type="submit">Add task</button></p>
     </dialog>
`;

class TaskBox extends HTMLElement {
    /*
    Taskbox owns:
    - dialog
    - title input
    - status select
    - add task button
    - X/close button
    - related event listeners
    */
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(taskbox.cloneNode(true));
    }

    show() {
        
    }

    setStatusesList(list) {
        
    }

    addNewTaskCallback(callback) {

    }

    close() {

    }
}

customElements.define('group7-task-box', TaskBox);
