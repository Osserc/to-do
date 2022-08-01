# to-do

A to-do application made for the Odin Project (https://www.theodinproject.com/lessons/javascript-todo-list)

As usual, made with webpack and Bootstrap.

Live preview: 


function projectFactory(title, dueDate, id, tasks = []) {

    function dateFormatted() {
        return this.dueDate.toLocaleString().split(',')[0]
    }

    return { title, dueDate, id, tasks, dateFormatted }
}

function createProject(title, dueDate) {
    allProjects.push(projectFactory(title, dueDate, allProjects.length))
}

function taskFactory(title, priority, id, done = false) {

    function toggleDone() {
        this.done = !this.done
    }

    return { title, done, priority, id, toggleDone }
}

function createTask(title, priority) {
    allTasks.push(taskFactory(title, priority, allTasks.length))
}

let allProjects = []
createProject(`Build a doghouse`, new Date(`March 5, 2023`))
createProject(`Test`, new Date(`April 5, 2026`))

let currentProject = []
if (allProjects.length > 0) {
    currentProject = allProjects[0]
}

let allTasks = []
if (allProjects.length > 0) {
    allTasks = currentProject.tasks
}
createTask(`Buy wood`, `Urgent`)
createTask(`Repair workbench`, `Urgent`)
createTask(`Assemble tools`, `Trivial`)
createTask(`Get back planer`, `Pressing`)
createTask(`Put away ladder`, `Pressing`)
createTask(`Prepare snake juice`, `Trivial`)
createTask(`Make chicharrones`, `Trivial`)
