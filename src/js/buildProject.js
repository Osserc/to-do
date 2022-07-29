let allProjects = []

const projectFactory = (title, dueDate, priority, description, id, tasks = []) => {

    const dateFormatted = () => {
        return dueDate.toLocaleString().split(',')[0]
    }

    return { title, dueDate, priority, description, id, tasks, dateFormatted }
}

function createProject(title, dueDate, priority, description) {
    allProjects.push(projectFactory(title, dueDate, priority, description, allProjects.length))
}

createProject(`Build a doghouse`, new Date(`March 5, 2023`), `Pressing`, `Make a new doghouse for the dog after the hurricane destroyed it.`)
let currentProject = allProjects[0]

export { allProjects, currentProject }