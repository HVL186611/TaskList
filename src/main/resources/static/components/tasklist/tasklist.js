const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" type="text/css" href="${import.meta.url.match(/.*\//)[0]}/tasklist.css"/>

    <div id="tasklist"></div>`;

const tasktable = document.createElement("template");
tasktable.innerHTML = `
    <table>
        <thead><tr><th>Task</th><th>Status</th></tr></thead>
        <tbody></tbody>
    </table>`;

const taskrow = document.createElement("template");
taskrow.innerHTML = `
    <tr>
        <td></td>
        <td></td>
        <td>
            <select>
                <option value="0" selected>&lt;Quack&gt;</option>
            </select>
        </td>
        <td><button type="button">Honk</button></td>
    </tr>`;

/**
  * TaskList
  * Manage view with list of tasks
  */
class TaskList extends HTMLElement {
    #deleteCallbacks;
    #updateCallbacks;

    // 
    #root;
    #statuses = [];
    constructor() {
        super();
        //this.#shadow = this.AttachShadow({mode: "open"});
        // kan visst bruke this.#root
        this.#root = this.attachShadow({mode: "closed"});


        this.statuses = []; //
        this.#deleteCallbacks = [];
        this.#updateCallbacks = [];

        this.#root.appendChild(template.content.cloneNode(true));

        //this.#root.appendChild(tasktable.content.cloneNode(true)); // moving to showtask
    }

    onStatusChange(id, newStatus) {
        if (newStatus == 0) return; // default option
        const e = this.#root.getElementById(id);
        const userConfirm = confirm(`Set "${e.querySelector("td").textContent}" status to "${newStatus}"?`);

        if (userConfirm) {
            for (let i in this.#updateCallbacks) {
                this.#updateCallbacks[i](id, newStatus);
            }
        }
    }
    onDelete(id) {
        const e = this.#root.getElementById(id);
        const userConfirm = confirm(`Are you sure you want to honk "${e.querySelector("td").textContent}"?`);
        if (userConfirm) {
            for (let i in this.#deleteCallbacks)
                this.#deleteCallbacks[i](id);
            //this.removeTask(id); // ajax should handle this
        }
    }

    /**
     * @public
     * @param {Array} list with all possible task statuses
     */
    setStatuseslist(allstatuses) {
        /**
         * Fill inn the code
         */
        this.statuses = allstatuses;

        return;
        // uhhhhhhhhhhhhhhhh cant get this to work:

        // add options to select dropdown
        const options = this.#root.querySelectorAll("option");
        for (let i in options) {
            console.log(options[i].content);
            //options[i].remove();
        }
        const selects = this.#root.querySelectorAll("select");
        if (selects == null) return;
        for (let i in selects) {
            console.log(selects[i]);
            for (let s in this.statuses) {
                selects[i].appendChild(new Option(this.statuses[s]))
            }
        }
    }

    /**
     * Add callback to run on change on change of status of a task, i.e. on change in the SELECT element
     * @public
     * @param {function} callback
     */
    addChangestatusCallback(callback) {
        /**
         * Fill inn the code
         */
        this.#updateCallbacks.push(callback);
    }

    /**
     * Add callback to run on click on delete button of a task
     * @public
     * @param {function} callback
     */
    addDeletetaskCallback(callback) {
        /**
         * Fill inn the code
         */
        this.#deleteCallbacks.push(callback);

    }

    /**
     * Add task at top in list of tasks in the view
     * @public
     * @param {Object} task - Object representing a task
     */
    showTask(task) {
        /**
         * Fill inn the code
         */

        // generate table if it doesnt exist
        const tasklist = this.#root.getElementById("tasklist");

        const table = this.#root.querySelector("table");
        if (table == null)
            tasklist.appendChild(tasktable.content.cloneNode(true));


        // select table body
        const tbody = this.#root.querySelector("tbody");
        
        // clone row template and modify
        const newRow = taskrow.content.cloneNode(true);
        newRow.firstElementChild.id = task.id; // set <tr id=task.id></tr>
        const cells = newRow.querySelectorAll("td");

        // display title and status
        cells[0].textContent = task.title;
        cells[1].textContent = task.status;

        // remove callback on button
        newRow.querySelector("button").addEventListener(
            "click", () => {this.onDelete(task.id);}
        );

        // add options to select dropdown
        const select = newRow.querySelector("select");
        for (let s in this.statuses) {
            //select.appendChild(new Option(this.statuses[s])) // "No additional innerHTML or createElement should be needed"
            const option = select.firstElementChild.cloneNode(true);
            option.value = this.statuses[s];
            option.textContent = this.statuses[s];
            option.selected = false;

            select.appendChild(option);
        }

        // add callback to select
        select.addEventListener("change", 
            (e) => {
                this.onStatusChange(task.id, e.target.value);
                e.target.value = "0"; // switch back to quack
            }
        );


        // append new row
        tbody.prepend(newRow);

        // modify 

    }

    askUpdate(id, status) {

    }

    /**
     * Update the status of a task in the view
     * @param {Object} task - Object with attributes {'id':taskId,'status':newStatus}
     */
    updateTask(task) {
        /**
         * Fill inn the code
         */
        const e = this.#root.getElementById(task.id);
        e.querySelectorAll("td")[1].textContent = task.status;
    }

    /**
     * Remove a task from the view
     * @param {Integer} task - ID of task to remove
     */
    removeTask(id) {
        /**
         * Fill inn the code
         */
        const e = this.#root.getElementById(id);

        console.log(`Removing task id=${id}`);
        e.remove(); // delete element

        // remove table if there are no rows
        const row = this.#root.querySelector("tbody tr"); // avoid counting tr in thead
        if (row == null)
            this.#root.querySelector("table").remove();
    }

    /**
     * @public
     * @return {Number} - Number of tasks on display in view
     */
    getNumtasks() { // NumTasks*
        /**
         * Fill inn the code
         */
        return this.#root.querySelectorAll("tbody tr").length; // i thought for sure this wasn't gonna work first try but here we are 🦆
    }
}


customElements.define('group7-task-list', TaskList);
