let allProjects = []

const projectFactory = (title, dueDate, id) => {

    return { title, dueDate, id }
}

function createProject(title, dueDate) {
    allProjects.push(projectFactory(title, dueDate, allProjects.length))
}

createProject(`Build a doghouse`, ``)