import { currentProject, changeProjectData } from "../buildProject"
import { determinePriorityColor, activateEditButton, buttonSwapper } from "./domTaskShared"
import { allTasks, changeTaskData } from "../buildTask"
import { allProjects } from "../buildProject"
import { buildEditButton } from "./domTask"

function showEditForm(id = null, type) {
    if (type == `Project`) {
        const projectToEdit = document.getElementById(`project-details`)
        projectToEdit.appendChild(buildEditCard(id, type))
        activateEditForm(id, type)
    } else {
        const taskToEdit = document.getElementById(`single-task-${id}`)
        taskToEdit.appendChild(buildEditCard(id, type))
        activateEditForm(id, type)
    }
}

function buildEditCard(id = null, type) {
    const formCard = document.createElement(`div`)
    if (type == `Project`) {
        formCard.id = `project-edit-container`
    } else {
        formCard.id = `task-${id}-edit-container`
    }
    formCard.classList.add(`p-3`, `container-fluid`)
    formCard.appendChild(buildEditForm(id, type))
    return formCard
}

function buildEditForm(id = null, type) {
    const form = document.createElement(`form`)
    if (type == `Project`) {
        form.id = `project-edit-form`
        form.append(buildFormTitle(id), buildFormDate(), buildFormButton())
    } else {
        form.id = `task-${id}-edit-form`
        form.append(buildFormHiddenField(id, type), buildFormTitle(id, type), buildFormPriority(id), buildFormButton())
    }
    form.classList.add(`d-flex`, `justify-content-between`, `align-items-center`, `gap-3`)
    return form
}

function buildFormHiddenField(id) {
    const idField = document.createElement(`input`)
    idField.setAttribute(`type`, `hidden`)
    idField.setAttribute(`name`, `taskId`)
    idField.setAttribute(`value`, id)
    return idField
}

function buildFormTitle(id = null, type) {
    const formTitleContainer = document.createElement(`div`)
    formTitleContainer.classList.add(`form-group`)
    formTitleContainer.append(buildFormTitleLabel(id, type), buildFormTitleInput(id, type))
    return formTitleContainer
}

function buildFormTitleLabel(id = null, type) {
    const formTitleLabel = document.createElement(`label`)
    if (type == `Project`) {
        formTitleLabel.setAttribute(`for`, `title`)
    } else {
        formTitleLabel.setAttribute(`for`, `title-${id}`)
    }
    formTitleLabel.innerHTML = `Title`
    return formTitleLabel
}

function buildFormTitleInput(id = null, type) {
    const formTitleInput = document.createElement(`input`)
    formTitleInput.setAttribute(`name`, `title`)
    formTitleInput.setAttribute(`type`, `text`)
    if (type == `Project`) {
        formTitleInput.id = `title`
    } else {
        formTitleInput.id = `title-${id}`
    }
    formTitleInput.setAttribute(`placeholder`, `Type to modify the title`)
    formTitleInput.classList.add(`form-control`)
    return formTitleInput
}

function buildFormDate() {
    const formDateContainer = document.createElement(`div`)
    formDateContainer.classList.add(`form-group`)
    formDateContainer.append(buildFormDateLabel(), buildFormDateInput())
    return formDateContainer
}

function buildFormDateLabel() {
    const formDateLabel = document.createElement(`label`)
    formDateLabel.setAttribute(`for`, `dueDate`)
    formDateLabel.innerHTML = `Due date`
    return formDateLabel
}

function buildFormDateInput() {
    const formDateInput = document.createElement(`input`)
    formDateInput.setAttribute(`name`, `dueDate`)
    formDateInput.setAttribute(`type`, `date`)
    formDateInput.id = `date`
    formDateInput.classList.add(`form-control`)
    return formDateInput
}

function buildFormPriority(id) {
    const formTitleContainer = document.createElement(`div`)
    formTitleContainer.classList.add(`form-group`)
    formTitleContainer.append(buildFormPriorityLabel(id), buildFormPriorityInput(id))
    return formTitleContainer
}

function buildFormPriorityLabel(id) {
    const formPriorityLabel = document.createElement(`label`)
    formPriorityLabel.setAttribute(`for`, `priority-${id}`)
    formPriorityLabel.innerHTML = `Priority`
    return formPriorityLabel
}

function buildFormPriorityInput(id) {
    const formPriorityInput = document.createElement(`select`)
    formPriorityInput.setAttribute(`name`, `priority`)
    formPriorityInput.id = `priority-${id}`
    formPriorityInput.classList.add(`form-control`)
    let priorityLevels = [`Trivial`, `Pressing`, `Urgent`]
    priorityLevels.forEach((level) => {
        formPriorityInput.add(buildPriorityOptions(level))
    })
    return formPriorityInput
}

function buildPriorityOptions(priority) {
    let option = document.createElement('option')
    option.value = option.text = priority
    return option
}

function buildFormButton() {
    const button = document.createElement(`button`)
    button.classList.add(`btn`, `btn-primary`)
    button.innerHTML = `Confirm`
    return button
}

function activateEditForm(id = null, type) {
    let form = null
    if (type == `Project`) {
        form = document.getElementById(`project-edit-form`)
    } else {
        form = document.getElementById(`task-${id}-edit-form`)
    }
    form.addEventListener(`submit`, function() {
        event.preventDefault()
        if (type == `Project`) {
            changeProjectData(event.target.elements)
            refreshProjectData()
            document.getElementById(`project-edit-container`).remove()
            const button = document.getElementById(`button-edit-project`)
            button.replaceWith(buildEditButton(id, `Project`))
        } else {
            changeTaskData(event.target.elements)
            refreshTaskData(id)
            document.getElementById(`task-${id}-edit-container`).remove()
            const button = document.getElementById(`button-edit-${id}`)
            button.replaceWith(buildEditButton(id, `Task`))
        }
    })
}

function refreshTaskData(id) {
    const title = document.getElementById(`task-title-${id}`)
    title.innerHTML = allTasks[id].title
    const priority = document.getElementById(`task-priority-${id}`)
    removeClassByPrefix(priority, `text-`)
    priority.classList.add(determinePriorityColor(allTasks[id].priority))
    priority.innerHTML = `${allTasks[id].priority}`
}

function refreshProjectData() {
    const title = document.getElementById(`project-title`)
    title.innerHTML = currentProject.title
    const date = document.getElementById(`project-date`)
    date.innerHTML = currentProject.dateFormatted()
}

function removeClassByPrefix(element, prefix) {
    var regx = new RegExp('\\b' + prefix + '.*?\\b', 'g')
    element.className = element.className.replace(regx, '')
}

export { showEditForm, buildEditForm }