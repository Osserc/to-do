import { allTasks } from "../buildTask"
import { allProjects } from "../buildProject"
import { determinePriorityColor, buildEditButton } from "./domTaskShared"
import { showForm } from "./domForms"
import { refreshProjectProgress } from "./domProject"

const list = document.getElementById(`task-list`)

function showTaskAll() {
    wipeTasks()
    allTasks.forEach(task => {
        showTask(task)
    });
}

function showTask(task) {
    list.append(buildTask(task))
}

function buildTask(task) {
    const singleTask = document.createElement(`div`)
    singleTask.dataset.taskId = task.id
    singleTask.classList.add(`col-md-5`, `col-12`,  `card`, `border`, `border-3`, `shadow`, `px-0`, `mb-auto`)
    singleTask.id = `single-task-${task.id}`
    singleTask.append(buildHeader(task), buildBody(task))
    return singleTask
}

function buildHeader(task) {
    const header = document.createElement(`div`)
    header.classList.add(`card-header`, `d-flex`, `justify-content-between`, `align-items-center`, `text-bg-primary`, `border-bottom`, `border-2`)
    header.append(buildTitle(task.title, task.id), buildDeleteButton(task.id))
    return header
}

function buildTitle(title, id) {
    const taskTitle = document.createElement(`div`)
    taskTitle.id = `task-title-${id}`
    taskTitle.innerHTML = title
    return taskTitle
}

function buildDeleteButton(id) {
    const closeButton = document.createElement(`button`)
    closeButton.dataset.taskId = id
    closeButton.classList.add(`btn-close`)
    activateDeleteButton(closeButton)
    return closeButton
}

function activateDeleteButton(button) {
    button.addEventListener(`click`, function() {
        removeTask(button.dataset.taskId)
        allTasks[button.dataset.taskId] = null
    })
}

function buildBody(task) {
    const body = document.createElement(`div`)
    body.classList.add(`card-body`, `d-flex`, `justify-content-between`, `align-items-center`, `text-bg-secondary`, `py-2`)
    body.append(buildCheckmark(task.id), buildPriority(task.priority, task.id), buildEditButton(`Task`, task.id))
    return body
}

function buildCheckmark(id) {
    const formCheck = document.createElement(`div`)
    formCheck.classList.add(`form-check`, `m-0`)
    const checkButton = document.createElement(`input`)
    formCheck.append(buildCheckmarkButton(id), buildCheckmarkLabel(id))
    return formCheck
}

function buildCheckmarkButton(id) {
    const checkButton = document.createElement(`input`)
    checkButton.classList.add(`form-check-input`)
    checkButton.type = `checkbox`
    checkButton.checked = allTasks[id].done
    checkButton.id = `check-button-${id}`
    checkButton.addEventListener('change', function() {
        allTasks[id].toggleDone()
    })
    checkButton.addEventListener(`change`, refreshProjectProgress)
    return checkButton
}

function buildCheckmarkLabel(id) {
    const checkLabel = document.createElement(`label`)
    checkLabel.classList.add(`form-check-label`)
    checkLabel.setAttribute(`for`, `check-button-${id}`)
    checkLabel.innerHTML = `Done`
    return checkLabel
}

function buildPriority(priority, id) {
    const priorityLevel = document.createElement(`div`)
    priorityLevel.classList.add(`fw-bold`, `fs-5`, determinePriorityColor(priority))
    priorityLevel.id = `task-priority-${id}`
    priorityLevel.innerHTML = `${priority}`
    return priorityLevel
}

function removeTask(id) {
    const singleTask = document.getElementById(`single-task-${id}`)
    allTasks[id] = null
    singleTask.remove()
    refreshProjectProgress()
}

function wipeTasks() {
    list.replaceChildren()
}

showTaskAll()

export { showTaskAll, showTask, wipeTasks }