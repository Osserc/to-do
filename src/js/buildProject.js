import { refreshAllTasks } from "./buildTask"

let allProjects = []
let currentProject = null

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
    if (validateData(values) == false) return false
    createProject(values.title, new Date(values.dueDate))
    localStorage.setItem(`storedData`, JSON.stringify(allProjects))
}

function validateData(values) {
    if ((values.title == ``) || (values.dueDate == ``)) return false
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

function changeCurrentProject(id = null) {
    if ((currentProject == null) && (allProjects.every((project) => project == null))) {
        currentProject = null
        localStorage.removeItem(`currentProjectId`)
    } else if (id != null) {
        currentProject = allProjects[id]
        localStorage.setItem(`currentProjectId`, currentProject.id)
        refreshAllTasks()
    }
}
function initializeCurrentProject() {
    if ((allProjects.length > 0) && (allProjects.some((project) => project != null))) {
        currentProject = allProjects.find((project) => project != null)
    } else {
        currentProject = null
    }
}

export { allProjects, currentProject, addProject, changeProjectData, changeCurrentProject, deleteProject, createProject, initializeCurrentProject }