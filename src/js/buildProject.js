function projectFactory(title, dueDate, id, tasks = []) {

    function dateFormatted() {
        return this.dueDate.toLocaleString().split(',')[0]
    }

    return { title, dueDate, id, tasks, dateFormatted }
}

function createProject(title, dueDate) {
    allProjects.push(projectFactory(title, dueDate, allProjects.length))
}

function changeProjectData(elements) {
    let values = collectValues(elements)
    substituteProjectData(values)
}

function collectValues(elements) {
    let values = []
    values[`${elements.title.name}`] = elements.title.value
    values[`${elements.dueDate.name}`] = elements.dueDate.value
    return values
}

function addProject(elements) {
    let values = collectValues(elements)
    createProject(values.title, values.dueDate)
}

function substituteProjectData(values) {
    if (values.title != ``) {
        currentProject.title = values.title
    }
    if (values.dueDate != ``) {
        currentProject.dueDate = new Date(values.dueDate)
    }
}

function deleteProject(id) {
    allProjects[id] = null
}

function changeCurrentProject(id) {
    if (allProjects.every((project) => project == null)) {
        currentProject = null
    } else {
        currentProject = allProjects[id]
    }
}

let allProjects = []
createProject(`Build a doghouse`, new Date(`March 5, 2023`))

let currentProject = null
if ((allProjects.length > 0) && (allProjects.some((project) => project != null))) {
    currentProject = allProjects.find((project) => project != null)
}


export { allProjects, currentProject, addProject, changeProjectData, changeCurrentProject, deleteProject }