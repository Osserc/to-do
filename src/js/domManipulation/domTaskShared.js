import { showEditForm } from "./domTaskEdit"

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
    }, { once: true })
}

export { determinePriorityColor, activateEditButton }