import { allProjects, currentProject } from "./buildProject"

let allTasks = []

function taskFactory(title, priority, id, done = false) {

    function toggleDone() {
        this.done = !this.done
    }

    return { title, done, priority, id, toggleDone }
}

function createTask(title, priority) {
    allTasks.push(taskFactory(title, priority, allTasks.length))

}

function changeTaskData(elements) {
    let values = collectValues(elements)
    substituteTaskData(values)
}

function collectValues(elements) {
    let values = []
    values[`${elements.title.name}`] = elements.title.value
    values[`${elements.priority.name}`] = elements.priority.value
    values[`${elements.taskId.name}`] = elements.taskId.value
    return values
}

function addTask(elements) {
    let values = collectValues(elements)
    if (validateData(values) == false) return false
    createTask(values.title, values.priority)
    console.log(JSON.parse(localStorage.getItem(`storedData`)))
    localStorage.setItem(`storedData`, JSON.stringify(allProjects))
    console.log(JSON.parse(localStorage.getItem(`storedData`)))
}

function validateData(values) {
    if (values.title == ``) return false
}

function substituteTaskData(values) {
    let singleTask = allTasks[values.taskId]
    if (values.title != ``) {
        singleTask.title = values.title
    }
    singleTask.priority = values.priority
}

function refreshAllTasks() {
    if (currentProject == null) {
        allTasks = []
    } else {
        allTasks = currentProject.tasks
    }
}

export { allTasks, changeTaskData, addTask, refreshAllTasks, createTask }