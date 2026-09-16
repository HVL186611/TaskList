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
   #dialog;
   #newTaskCallbacks;
   #statusList;
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(taskbox.content.cloneNode(true));
        this.#dialog = this.shadowRoot.querySelector("dialog");
        this.#dialog.querySelector("span").addEventListener(
            "click", this.close.bind(this)
        )

        this.#newTaskCallbacks = [];
        this.#statusList = [];

        this.shadowRoot.querySelector("button").addEventListener(
            "click", this.addTask.bind(this)
        );
    }

    show() { this.#dialog.showModal(); }
    close() { this.#dialog.close(); }

    //StatusesList*
    setStatuseslist(list) { 
        "assuming this will only ever be run once";
        this.#statusList = list; // dunno if i'll even need this
        const select = this.shadowRoot.querySelector("select")
        for (const status of list) {
            const option = new Option(status, status);
            select.appendChild(option);
        }
    }

    // NewTask*
    addNewTaskCallback(callback) { this.#newTaskCallbacks.push(callback); }

    addTask() {
        const name = this.shadowRoot.querySelector("input").value;
        const status = this.shadowRoot.querySelector("select").value; 
        for (const callback of this.#newTaskCallbacks)
            callback({title: name, status: status})
        this.close();
    }
}

customElements.define('group7-task-box', TaskBox);
