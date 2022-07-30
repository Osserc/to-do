import { allProjects, currentProject } from "../buildProject"
import { showTaskAll, wipeTasks } from "./domTask"
import { determinePriorityColor } from "./domTaskShared"
import { showProjectEditForm } from "./domProjectEdit"

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
    title.id = `project-title`
    title.innerHTML = currentProject.title
    return title
}

function buildProjectDate() {
    const dueDate = document.createElement(`div`)
    dueDate.classList.add(`col-md-5`, `col-12`, `text-light`, `fw-bold`, `text-center`, `text-md-end`)
    dueDate.id = `project-date`
    dueDate.innerHTML = currentProject.dateFormatted()
    return dueDate
}

function buildDetails() {
    const body = document.createElement(`div`)
    body.classList.add(`card-body`, `d-flex`, `justify-content-between`, `align-items-center`, `w-100`, `py-2`)
    body.append(buildProgress(), buildAddTaskButton(), buildEditProjectButton())
    return body
}

function buildProgress() {
    let completedTasks = determineCompletedTasks()
    const taskProgress = document.createElement(`div`)
    taskProgress.id = `progress`
    taskProgress.innerHTML = `Tasks: ${completedTasks}/${currentProject.tasks.length}`
    return taskProgress
}

function determineCompletedTasks() {
    let completedTasks = 0
    for (let i = 0; i < currentProject.tasks.length; i++) {
        if (currentProject.tasks[i].done != true ) continue
        completedTasks++
    }
    return completedTasks
}

function refreshProjectProgress() {
    let completedTasks = determineCompletedTasks()
    document.getElementById(`progress`).innerHTML = `Tasks: ${completedTasks}/${currentProject.tasks.length}`
}

function buildAddTaskButton() {
    const addTaskButton = document.createElement(`button`)
    addTaskButton.id = `add-task`
    addTaskButton.classList.add(`btn`, `btn-primary`)
    addTaskButton.innerHTML = `Add task`
    return addTaskButton
}

function buildEditProjectButton() {
    const editButton = document.createElement(`button`)
    editButton.id = `button-edit-project`
    editButton.classList.add(`btn`, `btn-primary`)
    editButton.innerHTML = `Edit`
    activateEditButton(editButton)
    return editButton
}

function activateEditButton(button) {
    button.addEventListener(`click`, function() {
        showProjectEditForm()
        swapEditButton(button)
    }, { once: true })
}

function swapEditButton(button) {
    button.innerHTML = `Close`
    button.addEventListener(`click`, function() {
        buttonSwapper(button)
    }, { once: true })
}

function buttonSwapper(button) {
    const formEdit = document.getElementById(`project-edit-container`)
    if (formEdit != null) {
        formEdit.remove()
    }
    activateEditButton(button)
    button.innerHTML = `Edit`
}

function wipeProject() {
    card.replaceChildren()
}

showProject()

export { currentProject, buildEditProjectButton, refreshProjectProgress }