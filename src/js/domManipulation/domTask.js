import { allTasks } from "../buildTask"

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
    singleTask.dataset.taskId = task.id
    singleTask.classList.add(`col-md-5`, `col-12`, `card`, `border`, `border-3`, `shadow`, `px-0`)
    singleTask.id = `single-task-${task.id}`
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
    body.append(buildCheckmark(task.id), buildUrgency(task.urgency), buildEditButton(task.id))
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
    checkButton.value = ``
    checkButton.id = `check-button-${id}`
    return checkButton
}

function buildCheckmarkLabel(id) {
    const checkLabel = document.createElement(`label`)
    checkLabel.classList.add(`form-check-label`)
    checkLabel.setAttribute(`for`, `check-button-${id}`)
    checkLabel.innerHTML = `Done`
    return checkLabel
}

function buildUrgency(urgency) {
    const urgencyLevel = document.createElement(`div`)
    urgencyLevel.classList.add(`fw-bold`, `fs-5`, determineUrgencyColor(urgency))
    urgencyLevel.innerHTML = `${urgency}`
    return urgencyLevel
}

function determineUrgencyColor(urgency) {
    switch (urgency) {
        case `Trivial`:
            return `text-success`
            break
        case `Pressing`:
            return `text-warning`
            break
        case `Urgent`:
            return `text-danger`
            break
    }
}

function buildEditButton(id) {
    const editButton = document.createElement(`button`)
    editButton.dataset.taskId = id
    editButton.classList.add(`btn`, `btn-primary`)
    editButton.innerHTML = `Edit`
    activateEditButton(editButton)
    return editButton
}

function activateEditButton(button) {
    button.addEventListener(`click`, function() {
        // to do
    })
}

function removeTask(id) {
    const taskToRemove = document.getElementById(`single-task-${id}`)
    list.removeChild(taskToRemove)
}

showTaskAll()

export { determineUrgencyColor }