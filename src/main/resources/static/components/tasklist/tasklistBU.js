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
                <option value="0" selected>&lt;Modify&gt;</option>
            </select>
        </td>
        <td><button type="button">Removess</button></td>
    </tr>`;

/**
  * TaskList
  * Manage view with list of tasks
  */
class TaskList extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.statuses = [];
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

    const container = this.shadowRoot.querySelector("#tasklist");

    let table = container.querySelector("table");

    // First task? Create the table.
    if (table === null) {
        container.appendChild(tasktable.content.cloneNode(true));
        table = container.querySelector("table");
    }

    const row = taskrow.content.cloneNode(true);

    const tr = row.querySelector("tr");
    tr.dataset.id = task.id;

    const cells = tr.querySelectorAll("td");

    cells[0].textContent = task.title;
    cells[1].textContent = task.status;

    const select = tr.querySelector("select");

    for (const status of this.statuses) {
        const option = select.firstElementChild.cloneNode(true);

        option.value = status;
        option.textContent = status;
        option.selected = false;

        select.appendChild(option);
    }

    // Newest task goes on top
    table.querySelector("tbody").prepend(row);
    }

    /**
     * Update the status of a task in the view
     * @param {Object} task - Object with attributes {'id':taskId,'status':newStatus}
     */
    updateTask(task) {
        /**
         * Fill inn the code
         */
    }

    /**
     * Remove a task from the view
     * @param {Integer} task - ID of task to remove
     */
    removeTask(id) {
        /**
         * Fill inn the code
         */
    }

    /**
     * @public
     * @return {Number} - Number of tasks on display in view
     */
    getNumtasks() {
        /**
         * Fill inn the code
         */
    }
}
customElements.define('task-list', TaskList);

