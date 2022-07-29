let allProjects = []

const projectFactory = (title, dueDate, id, tasks = []) => {

    const dateFormatted = () => {
        return dueDate.toLocaleString().split(',')[0]
    }

    return { title, dueDate, id, tasks, dateFormatted }
}

function createProject(title, dueDate) {
    allProjects.push(projectFactory(title, dueDate, allProjects.length))
}

createProject(`Build a doghouse`, new Date(`March 5, 2023`))

export { allProjects }