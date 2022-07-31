import { showEditForm } from "./domForms"

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

function activateEditButton(button) {
    button.addEventListener(`click`, function() {
        showEditForm(button.dataset.taskId)
        swapEditButton(button, button.dataset.taskId)
    }, { once: true })
}

function swapEditButton(button, id) {
    button.innerHTML = `Close`
    button.addEventListener(`click`, function() {
        buttonSwapper(button, id)
    }, { once: true })
}

function buttonSwapper(button, id) {
    const formEdit = document.getElementById(`task-${id}-edit-container`)
    if (formEdit != null) {
        formEdit.remove()
    }
    activateEditButton(button)
    button.innerHTML = `Edit`
}

export { determinePriorityColor, activateEditButton, swapEditButton, buttonSwapper }