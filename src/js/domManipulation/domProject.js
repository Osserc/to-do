import { allProjects, currentProject } from "../buildProject"
import { showTaskAll, showTask, wipeTasks } from "./domTask"
import { buildEditButton } from "./domTaskShared"
import { showEditForm, buildEditForm } from "./domForms"
import { addTask } from "../buildTask"
import * as bootstrap from "bootstrap"

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
    body.append(buildProgress(), buildAddTaskButton(), buildEditButton(`Project`))
    return body
}

function buildProgress() {
    let completedTasks = determineCompletedTasks()
    const taskProgress = document.createElement(`div`)
    taskProgress.id = `progress`
    taskProgress.innerHTML = `Tasks: ${completedTasks}/${determineTotalTasks()}`
    return taskProgress
}

function determineCompletedTasks() {
    let completedTasks = 0
    for (let i = 0; i < currentProject.tasks.length; i++) {
        if ((currentProject.tasks[i] == null) || (currentProject.tasks[i].done != true )) continue
        completedTasks++
    }
    return completedTasks
}

function refreshProjectProgress() {
    let completedTasks = determineCompletedTasks()
    document.getElementById(`progress`).innerHTML = `Tasks: ${completedTasks}/${determineTotalTasks()}`
}

function determineTotalTasks() {
    return currentProject.tasks.filter(totalTasksCriteria).length
}

function totalTasksCriteria(task) {
        return task != null
}

function buildAddTaskButton() {
    const addTaskButton = document.createElement(`button`)
    addTaskButton.id = `add-task`
    addTaskButton.dataset.bsToggle = `modal`
    addTaskButton.dataset.bsTarget = `#multipurposeModal`
    addTaskButton.dataset.action = `addTask`
    addTaskButton.classList.add(`btn`, `btn-primary`)
    addTaskButton.innerHTML = `Add task`
    addTaskButton.addEventListener(`click`, function() {
        prepareTaskModal(`Task`, `New`)
    })
    return addTaskButton
}

function prepareTaskModal(type, action) {
    const modalTitle = document.getElementById(`multipurposeModalLabel`)
    const modalBody = document.getElementById(`modal-body`)
    modalTitle.innerHTML = `New task`
    const form = buildEditForm(type, action, currentProject.tasks.length)
    modalBody.replaceChildren(form)
    form.addEventListener(`submit`, function() {
        event.preventDefault()
        succesfulTaskCreation(event)
    })
}

function succesfulTaskCreation(event) {
    addTask(event.target.elements)
    bootstrap.Modal.getInstance(document.getElementById(`multipurposeModal`)).hide()
    let task = currentProject.tasks[currentProject.tasks.length - 1]
    showTask(task)
    refreshProjectProgress()
}

function wipeProject() {
    card.replaceChildren()
}

showProject()

export { currentProject, refreshProjectProgress }