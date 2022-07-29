let allTasks = []

const taskFactory = (title, priority, id, done = false) => {

    const toggleTask = () => {
        done = !done
    }

    return { title, done, priority, id, toggleTask }
}

function createTask(title, priority) {
    allTasks.push(taskFactory(title, priority, allTasks.length))
}

function changeTaskData(elements) {
    let values = collectValues(elements)
    if (values.name == ``) {
        console.log(values)
    } else {
        substituteTaskData(values)
    }
}

function collectValues(elements) {
    let values = []
    values[`${elements.name.name}`] = elements.name.value
    values[`${elements.priority.name}`] = elements.priority.value
    values[`${elements.taskId.name}`] = elements.taskId.value
    return values
}

function substituteTaskData(values) {
    let singleTask = allTasks[values.taskId]
    singleTask.name = values.name
    singleTask.priority = values.priority
}

createTask(`Buy wood`, `Urgent`)
createTask(`Repair workbench`, `Urgent`)
createTask(`Assemble tools`, `Trivial`)
createTask(`Get back planer`, `Pressing`)
createTask(`Put away ladder`, `Pressing`)
createTask(`Prepare snake juice`, `Trivial`)
createTask(`Make chicharrones`, `Trivial`)

export { allTasks, changeTaskData }