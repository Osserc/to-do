import { allProjects, currentProject, addProject } from "../buildProject"
import { showTaskAll, showTask, wipeTasks } from "./domTask"
import { buildEditButton } from "./domTaskShared"
import { showForm, buildForm } from "./domForms"
import { addTask, allTasks } from "../buildTask"
import * as bootstrap from "bootstrap"


function showProject() {
    const card = document.getElementById(`project-details`)
    card.classList.add(`invisible`)
    wipeProject()
    if (allProjects.length > 0) {
        card.classList.remove(`invisible`)
        buildProject().forEach((element) => {
            card.append(element)
        })
    }
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
    addTaskButton.classList.add(`btn`, `btn-primary`)
    addTaskButton.innerHTML = `Add task`
    addTaskButton.addEventListener(`click`, function() {
        prepareModal(`Task`, `New`)
    })
    return addTaskButton
}

function prepareModal(type, action) {
    const modalTitle = document.getElementById(`multipurposeModalLabel`)
    const modalBody = document.getElementById(`modal-body`)
    let form = null
    if (type == `Project`) {
        modalTitle.innerHTML = `New project`
        form = buildForm(type, action)
    } else {
        modalTitle.innerHTML = `New task`
        form = buildForm(type, action, currentProject.tasks.length)
    }
    modalBody.replaceChildren(form)
    form.addEventListener(`submit`, function() {
        event.preventDefault()
        if (type == `Project`) {
            successfulProjectCreation(event)
        } else {
            successfulTaskCreation(event)
        }  
    })
}

function successfulProjectCreation(event) {
    addProject(event.target.elements)
    bootstrap.Modal.getInstance(document.getElementById(`multipurposeModal`)).hide()
    buildProjectsList()
}

function successfulTaskCreation(event) {
    addTask(event.target.elements)
    bootstrap.Modal.getInstance(document.getElementById(`multipurposeModal`)).hide()
    let task = currentProject.tasks[currentProject.tasks.length - 1]
    showTask(task)
    refreshProjectProgress()
}

function wipeProject() {
    const card = document.getElementById(`project-details`)
    card.replaceChildren()
}

function activateAddProjectButton() {
    const addButton = document.getElementById(`add-project`)
    addButton.addEventListener(`click`, prepareModal(`Project`, `New`))
}

function buildProjectsList() {
    const projectsList = document.getElementById(`projects-list`)
    projectsList.replaceChildren()
    allProjects.forEach((project) => {
        projectsList.append(buildProjectCard(project))
    })
}

function buildProjectCard(project) {
    const card = document.createElement(`div`)
    card.classList.add(`text-bg-primary`, `d-flex`, `flex-column`, `flex-md-row`, `justify-content-between`, `align-items-center`, `p-2`, `rounded`, `gap-3`)
    const title = document.createElement(`div`)
    title.innerHTML = project.title
    const actions = document.createElement(`div`)
    actions.classList.add(`d-flex`, `gap-3`)
    const deleteButton = document.createElement(`button`)
    deleteButton.classList.add(`btn`, `btn-info`)
    deleteButton.innerHTML = `Delete`
    const selectButton = document.createElement(`button`)
    selectButton.classList.add(`btn`, `btn-info`)
    selectButton.innerHTML = `Select`
    actions.append(deleteButton, selectButton)
    card.append(title, actions)
    return card
}

function initializeCanvas() {
    activateAddProjectButton()
    buildProjectsList()
}

showProject()
initializeCanvas()

export { refreshProjectProgress }