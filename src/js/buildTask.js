let allTasks = []

const taskFactory = (title, urgency, id = 0, done = false) => {

    const toggleTask = () => {
        done = !done
    }

    return { title, done, urgency, id, toggleTask }
}

function createTask(title, urgency) {
    allTasks.push(taskFactory(title, urgency, allTasks.length - 1))
}

createTask(`Buy wood`, `Urgent`)
createTask(`Repair workbench`, `Urgent`)
createTask(`Assemble tools`, `Urgent`)
createTask(`Get back planer`, `Urgent`)
createTask(`Put away ladder`, `Urgent`)
createTask(`Prepare snake juice`, `Urgent`)
createTask(`Make chicharrones`, `Urgent`)

export { allTasks, createTask }