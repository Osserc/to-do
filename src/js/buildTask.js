import { allProjects, currentProject } from "./buildProject"

let allTasks = currentProject.tasks

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

function substituteTaskData(values) {
    let singleTask = allTasks[values.taskId]
    if (values.title != ``) {
        singleTask.title = values.title
    }
    singleTask.priority = values.priority
}

createTask(`Buy wood`, `Urgent`)
createTask(`Repair workbench`, `Urgent`)
createTask(`Assemble tools`, `Trivial`)
createTask(`Get back planer`, `Pressing`)
createTask(`Put away ladder`, `Pressing`)
createTask(`Prepare snake juice`, `Trivial`)
createTask(`Make chicharrones`, `Trivial`)
allTasks[0].done = true
allTasks[2].done = true
allTasks[3].done = true

console.log(allTasks)

export { allTasks, changeTaskData }