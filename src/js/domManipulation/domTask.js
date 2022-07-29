import { allTasks, changeTaskData } from "../buildTask"

const list = document.getElementById(`task-list`)

function showTaskAll() {
    allTasks.forEach(task => {
        showTask(task)
        showEditForm(task.id)
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
    body.append(buildCheckmark(task.id), buildPriority(task.priority), buildEditButton(task.id))
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

function buildPriority(priority) {
    const priorityLevel = document.createElement(`div`)
    priorityLevel.classList.add(`fw-bold`, `fs-5`, determinePriorityColor(priority))
    priorityLevel.innerHTML = `${priority}`
    return priorityLevel
}

function determinePriorityColor(priority) {
    switch (priority) {
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
        showEditForm(button.dataset.taskId)
    })
}

function showEditForm(id) {
    const taskToEdit = document.getElementById(`single-task-${id}`)
    taskToEdit.appendChild(buildEditCard(id))
    activateEditForm(id)
}

function buildEditCard(id) {
    const formCard = document.createElement(`div`)
    formCard.id = `task-${id}-edit-container`
    formCard.classList.add(`p-3`)
    formCard.appendChild(buildEditForm(id))
    return formCard
}

function buildEditForm(id) {
    const form = document.createElement(`form`)
    form.id = `task-${id}-edit-form`
    form.classList.add(`d-flex`, `justify-content-center`, `align-items-center`, `gap-3`)
    form.append(buildEditFormHiddenField(id), buildEditFormTitle(id), buildEditFormPriority(id), buildEditFormButton())
    return form
}

function buildEditFormTitle(id) {
    const formTitleContainer = document.createElement(`div`)
    formTitleContainer.classList.add(`form-group`)
    formTitleContainer.append(buildEditFormTitleLabel(id), buildEditFormTitleInput(id))
    return formTitleContainer
}

function buildEditFormTitleLabel(id) {
    const formTitleLabel = document.createElement(`label`)
    formTitleLabel.setAttribute(`for`, `name`)
    formTitleLabel.innerHTML = `Title`
    return formTitleLabel
}

function buildEditFormTitleInput(id) {
    const formTitleInput = document.createElement(`input`)
    formTitleInput.setAttribute(`name`, `title`)
    formTitleInput.setAttribute(`type`, `text`)
    formTitleInput.setAttribute(`placeholder`, `Type to modify the title`)
    formTitleInput.classList.add(`form-control`)
    return formTitleInput
}

function buildEditFormPriority(id) {
    const formTitleContainer = document.createElement(`div`)
    formTitleContainer.classList.add(`form-group`)
    formTitleContainer.append(buildEditFormPriorityLabel(id), buildEditFormPriorityInput(id))
    return formTitleContainer
}

function buildEditFormPriorityLabel(id) {
    const formTitleLabel = document.createElement(`label`)
    formTitleLabel.setAttribute(`for`, `priority`)
    formTitleLabel.innerHTML = `Priority`
    return formTitleLabel
}

function buildEditFormPriorityInput(id) {
    const formTitleInput = document.createElement(`select`)
    formTitleInput.setAttribute(`name`, `priority`)
    formTitleInput.classList.add(`form-control`)
    let priorityLevels = [`Trivial`, `Pressing`, `Urgent`]
    priorityLevels.forEach((level) => {
        formTitleInput.add(buildEditFormPriorityOptions(level))
    })
    return formTitleInput
}

function buildEditFormPriorityOptions(priority) {
    let option = document.createElement('option')
    option.value = option.text = priority
    return option
}

function buildEditFormButton() {
    const button = document.createElement(`button`)
    button.classList.add(`btn`, `btn-primary`)
    button.innerHTML = `Confirm`
    return button
}

function buildEditFormHiddenField(id) {
    const idField = document.createElement(`input`)
    idField.setAttribute(`type`, `hidden`)
    idField.setAttribute(`name`, `taskId`)
    idField.setAttribute(`value`, id)
    return idField
}

function activateEditForm(id) {
    const form = document.getElementById(`task-${id}-edit-form`)
    form.addEventListener(`submit`, function() {
        event.preventDefault()
        changeTaskData(event.target.elements)
        refreshTaskData(id)
    })
}

function refreshTaskData(id) {
    const title = document.getElementById(`task-title-${id}`)
    title.innerHTML = allTasks[id].title
}

function removeTask(id) {
    const taskToRemove = document.getElementById(`single-task-${id}`)
    list.removeChild(taskToRemove)
}

showTaskAll()

export { }