import { allTasks, createTask } from "../buildTask"

const list = document.getElementById(`task-list`)

function showTaskAll() {
    allTasks.forEach(task => {
        showTask(task)
    });
}

function showTask(task) {
    list.append(buildTask(task))
}

function buildTask(task) {
    const singleTask = document.createElement(`div`)
    singleTask.classList.add(`col-md-5`, `col-12`, `card`, `border`, `border-3`, `shadow`, `px-0`)
    singleTask.append(buildHeader(task), buildBody(task))
    return singleTask
}

function buildHeader(task) {
    const header = document.createElement(`div`)
    header.classList.add(`card-header`, `d-flex`, `justify-content-between`, `align-items-center`, `text-bg-primary`, `border-bottom`, `border-2`)
    header.append(buildTitle(task.title), buildDeleteButton(task.id))
    return header
}

function buildTitle(title) {
    const taskTitle = document.createElement(`div`)
    taskTitle.innerHTML = title
    return taskTitle
}

function buildDeleteButton(id) {
    const closeButton = document.createElement(`button`)
    closeButton.dataset.taskId = id
    closeButton.classList.add(`btn-close`)
    return closeButton
}

function buildBody(task) {
    const body = document.createElement(`div`)
    body.classList.add(`card-body`, `d-flex`, `justify-content-between`, `align-items-center`, `text-bg-secondary`, `py-2`)
    body.append(buildCheckmark(task.id), buildUrgency(task.urgency), buildEditButton(task.id))
    return body
}

function buildCheckmark(id) {
    const formCheck = document.createElement(`div`)
    formCheck.classList.add(`form-check`, `m-0`)
    const checkButton = document.createElement(`input`)
    checkButton.classList.add(`form-check-input`)
    checkButton.type = `checkbox`
    checkButton.value = ``
    checkButton.id = `check-button-${id}`
    const checkLabel = document.createElement(`label`)
    checkLabel.classList.add(`form-check-label`)
    checkLabel.setAttribute(`for`, `check-button-${id}`)
    checkLabel.innerHTML = `Done`
    formCheck.append(checkButton, checkLabel)
    return formCheck
}

function buildUrgency(urgency) {
    const urgencyLevel = document.createElement(`div`)
    urgencyLevel.classList.add(`fw-bold`, `fs-5`, `text-danger`)
    urgencyLevel.innerHTML = `${urgency}`
    return urgencyLevel
}

function buildEditButton(id) {
    const editButton = document.createElement(`button`)
    editButton.dataset.taskId = id
    editButton.classList.add(`btn`, `btn-primary`)
    editButton.innerHTML = `Edit`
    return editButton
}

showTaskAll()