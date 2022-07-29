let allTasks = []

const taskFactory = (title, urgency, id, done = false) => {

    const toggleTask = () => {
        done = !done
    }

    return { title, done, urgency, id, toggleTask }
}

function createTask(title, urgency) {
    allTasks.push(taskFactory(title, urgency, allTasks.length))
}

createTask(`Buy wood`, `Urgent`)
createTask(`Repair workbench`, `Urgent`)
createTask(`Assemble tools`, `Trivial`)
createTask(`Get back planer`, `Pressing`)
createTask(`Put away ladder`, `Pressing`)
createTask(`Prepare snake juice`, `Trivial`)
createTask(`Make chicharrones`, `Trivial`)

export { allTasks }