import { allProjects, currentProject } from "../buildProject"
import { showTaskAll, wipeTasks } from "./domTask"
import { determinePriorityColor } from "./domTaskShared"

const card = document.getElementById(`project-details`)

function showProjectsAll() {

}

function showProject() {
    wipeProject()
    buildProject().forEach((element) => {
        card.append(element)
    })
}

function buildProject() {
    const allProjectInfo = []
    allProjectInfo.push(buildProjectHeader(), buildDetails())
    return allProjectInfo
}

function buildProjectHeader() {
    const header = document.createElement(`h3`)
    header.classList.add(`card-header`, `row`, `justify-content-between`, `w-100`, `text-bg-info`, `border-bottom`, `border-2`)
    header.append(buildProjectTitle(), buildProjectDate())
    return header
}

function buildProjectTitle() {
    const title = document.createElement(`div`)
    title.classList.add(`col-md-5`, `col-12`, `text-light`, `fw-bold`, `text-center`, `text-md-start`)
    title.id = `project-${currentProject.id}-title`
    title.innerHTML = currentProject.title
    return title
}

function buildProjectDate() {
    const dueDate = document.createElement(`div`)
    dueDate.classList.add(`col-md-5`, `col-12`, `text-light`, `fw-bold`, `text-center`, `text-md-end`)
    dueDate.id = `project-${currentProject.id}-date`
    dueDate.innerHTML = currentProject.dateFormatted()
    return dueDate
}

function buildDetails() {
    const body = document.createElement(`div`)
    body.classList.add(`card-body`, `d-flex`, `justify-content-between`, `align-items-center`, `w-100`, `py-2`)
    body.append(buildProgress(), buildAddTask(), buildEditProject())
    return body
}

function buildProgress() {
    let completedTasks = determineCompletedTasks()
    const taskProgress = document.createElement(`div`)
    taskProgress.innerHTML = `Tasks: ${completedTasks}/${currentProject.tasks.length}`
    return taskProgress
}

function determineCompletedTasks() {
    let completedTasks = 0
    for (let i = 0; i < currentProject.tasks.length; i++) {
        if (currentProject.tasks[i].done == true) {
            completedTasks++
        }
    }
    return completedTasks
}

function buildAddTask() {

}

function buildEditProject() {
    const editButton = document.createElement(`button`)
    editButton.dataset.taskId = 8
    editButton.id = `button-edit-`
    editButton.classList.add(`btn`, `btn-primary`)
    editButton.innerHTML = `Edit`
    return editButton
}

function wipeProject() {
    card.replaceChildren()
}

showProject()

export { currentProject }