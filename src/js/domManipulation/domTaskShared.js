import { showForm } from "./domForms"

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

function buildEditButton(type, id = 0) {
    const editButton = document.createElement(`button`)
    if (type == `Project`) {
        editButton.id = `button-edit-project`
    } else {
        editButton.dataset.taskId = id
        editButton.id = `button-edit-${id}`
    }
    editButton.classList.add(`btn`, `btn-primary`)
    editButton.innerHTML = `Edit`
    activateEditButton(type, editButton)
    return editButton
}

function activateEditButton(type, button) {
    button.addEventListener(`click`, function() {
        if (type == `Project`) {
            showForm(`Project`, `Edit`)
            swapEditButton(`Project`, button)
        } else {
            showForm(`Task`, `Edit`, button.dataset.taskId)
            swapEditButton(`Task`, button, button.dataset.taskId)
        }
    }, { once: true })
}

function swapEditButton(type, button, id = 0) {
    button.innerHTML = `Close`
    button.addEventListener(`click`, function() {
        buttonSwapper(type, button, id)
    }, { once: true })
}

function buttonSwapper(type, button, id = 0) {
    let formEdit = null
    if (type = `Project`) {
        formEdit = document.getElementById(`project-edit-container`)
    } else {
        formEdit = document.getElementById(`task-${id}-edit-container`)
    }
    if (formEdit != null) {
        formEdit.remove()
    }
    activateEditButton(type, button)
    button.innerHTML = `Edit`
}

export { determinePriorityColor, buildEditButton }