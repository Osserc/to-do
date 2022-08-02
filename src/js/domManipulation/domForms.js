import { currentProject, changeProjectData } from "../buildProject"
import { determinePriorityColor, buildEditButton } from "./domTaskShared"
import { allTasks, changeTaskData } from "../buildTask"
import { allProjects } from "../buildProject"
import { buildProjectsList } from "./domProject"

function showForm(type, action, id = null) {
    if (type == `Project`) {
        const projectToEdit = document.getElementById(`project-details`)
        projectToEdit.appendChild(showFormCard(type, action, id))
        activateEditForm(type, action, id)
    } else {
        const taskToEdit = document.getElementById(`single-task-${id}`)
        taskToEdit.appendChild(showFormCard(type, action, id))
        activateEditForm(type, action, id)
    }
}

function showFormCard(type, action, id = null) {
    const formCard = document.createElement(`div`)
    if (type == `Project`) {
        if (action == `New`) {
            formCard.id = `project-new-container`
        } else {
            formCard.id = `project-edit-container`
        }
    } else {
        if (action == `New`){
            formCard.id = `task-${id}-new-container`
        } else {
            formCard.id = `task-${id}-edit-container`
        }
    }
    formCard.classList.add(`p-3`, `container-fluid`)
    formCard.appendChild(buildForm(type, action, id))
    return formCard
}

function buildForm(type, action, id = null) {
    const form = document.createElement(`form`)
    if (type == `Project`) {
        if (action == `New`) {
            form.id = `project-new-form`
        } else {
            form.id = `project-edit-form`
        }
        form.append(buildFormTitle(type, action), buildFormDate(), buildFormButton())
    } else {
        if (action == `New`) {
            form.id = `task-${id}-new-form`
        } else {
            form.id = `task-${id}-edit-form`
        }
        form.append(buildFormHiddenField(id), buildFormTitle(type, action, id), buildFormPriority(id), buildFormButton())
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

function buildFormTitle(type, action, id = null) {
    const formTitleContainer = document.createElement(`div`)
    formTitleContainer.classList.add(`form-group`)
    formTitleContainer.append(buildFormTitleLabel(type, id), buildFormTitleInput(type, action, id))
    return formTitleContainer
}

function buildFormTitleLabel(type, id = null) {
    const formTitleLabel = document.createElement(`label`)
    if (type == `Project`) {
        formTitleLabel.setAttribute(`for`, `title`)
    } else {
        formTitleLabel.setAttribute(`for`, `title-${id}`)
    }
    formTitleLabel.innerHTML = `Title`
    return formTitleLabel
}

function buildFormTitleInput(type, action, id = null) {
    const formTitleInput = document.createElement(`input`)
    formTitleInput.setAttribute(`name`, `title`)
    formTitleInput.setAttribute(`type`, `text`)
    if (type == `Project`) {
        formTitleInput.id = `title`
    } else {
        formTitleInput.id = `title-${id}`
    }
    if (action == `Edit`) {
        formTitleInput.setAttribute(`placeholder`, `Type to modify the title`)
    }
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

function activateEditForm(type, action, id = null) {
    let form = null
    if (type == `Project`) {
        if (action == `New`) {
            form = document.getElementById(`project-new-form`)
        } else {
            form = document.getElementById(`project-edit-form`)
        }
    } else {
        if (action == `New`) {
            form = document.getElementById(`task-${id}-new-form`)
        } else {
            form = document.getElementById(`task-${id}-edit-form`)
        }
    }
    form.addEventListener(`submit`, function() {
        event.preventDefault()
        if (type == `Project`) {
            changeProjectData(event.target.elements)
            refreshProjectData()
            document.getElementById(`project-edit-container`).remove()
            const button = document.getElementById(`button-edit-project`)
            button.replaceWith(buildEditButton(`Project`))
            buildProjectsList()
        } else {
            changeTaskData(event.target.elements)
            refreshTaskData(id)
            document.getElementById(`task-${id}-edit-container`).remove()
            const button = document.getElementById(`button-edit-${id}`)
            button.replaceWith(buildEditButton(`Task`, id))
        }
        localStorage.setItem(`storedData`, JSON.stringify(allProjects))
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

export { showForm, buildForm }