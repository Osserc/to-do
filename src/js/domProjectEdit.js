// function showEditForm(id) {
//     const taskToEdit = document.getElementById(`single-task-${id}`)
//     taskToEdit.appendChild(buildEditCard(id))
//     activateEditForm(id)
// }

// function buildEditCard(id) {
//     const formCard = document.createElement(`div`)
//     formCard.id = `task-${id}-edit-container`
//     formCard.classList.add(`p-3`)
//     formCard.appendChild(buildEditForm(id))
//     return formCard
// }

// function buildEditForm(id) {
//     const form = document.createElement(`form`)
//     form.id = `task-${id}-edit-form`
//     form.classList.add(`d-flex`, `justify-content-between`, `align-items-center`, `gap-3`)
//     form.append(buildEditFormHiddenField(id), buildEditFormTitle(), buildEditFormPriority(), buildEditFormButton())
//     return form
// }

// function buildEditFormTitle() {
//     const formTitleContainer = document.createElement(`div`)
//     formTitleContainer.classList.add(`form-group`)
//     formTitleContainer.append(buildEditFormTitleLabel(), buildEditFormTitleInput())
//     return formTitleContainer
// }

// function buildEditFormTitleLabel() {
//     const formTitleLabel = document.createElement(`label`)
//     formTitleLabel.setAttribute(`for`, `name`)
//     formTitleLabel.innerHTML = `Title`
//     return formTitleLabel
// }

// function buildEditFormTitleInput() {
//     const formTitleInput = document.createElement(`input`)
//     formTitleInput.setAttribute(`name`, `title`)
//     formTitleInput.setAttribute(`type`, `text`)
//     formTitleInput.setAttribute(`placeholder`, `Type to modify the title`)
//     formTitleInput.classList.add(`form-control`)
//     return formTitleInput
// }

// function buildEditFormPriority() {
//     const formTitleContainer = document.createElement(`div`)
//     formTitleContainer.classList.add(`form-group`)
//     formTitleContainer.append(buildEditFormPriorityLabel(), buildEditFormPriorityInput())
//     return formTitleContainer
// }

// function buildEditFormPriorityLabel() {
//     const formTitleLabel = document.createElement(`label`)
//     formTitleLabel.setAttribute(`for`, `priority`)
//     formTitleLabel.innerHTML = `Priority`
//     return formTitleLabel
// }

// function buildEditFormPriorityInput() {
//     const formTitleInput = document.createElement(`select`)
//     formTitleInput.setAttribute(`name`, `priority`)
//     formTitleInput.classList.add(`form-control`)
//     let priorityLevels = [`Trivial`, `Pressing`, `Urgent`]
//     priorityLevels.forEach((level) => {
//         formTitleInput.add(buildEditFormPriorityOptions(level))
//     })
//     return formTitleInput
// }

// function buildEditFormPriorityOptions(priority) {
//     let option = document.createElement('option')
//     option.value = option.text = priority
//     return option
// }

// function buildEditFormButton() {
//     const button = document.createElement(`button`)
//     button.classList.add(`btn`, `btn-primary`)
//     button.innerHTML = `Confirm`
//     return button
// }

// function buildEditFormHiddenField(id) {
//     const idField = document.createElement(`input`)
//     idField.setAttribute(`type`, `hidden`)
//     idField.setAttribute(`name`, `taskId`)
//     idField.setAttribute(`value`, id)
//     return idField
// }

// function activateEditForm(id) {
//     const form = document.getElementById(`task-${id}-edit-form`)
//     form.addEventListener(`submit`, function() {
//         event.preventDefault()
//         changeTaskData(event.target.elements)
//         refreshTaskData(id)
//         document.getElementById(`task-${id}-edit-container`).remove()
//         const button = document.getElementById(`button-edit-${id}`)
//         button.replaceWith(buildEditButton(id))
//     })
// }

// function refreshTaskData(id) {
//     const title = document.getElementById(`task-title-${id}`)
//     title.innerHTML = allTasks[id].title
//     const priority = document.getElementById(`task-priority-${id}`)
//     removeClassByPrefix(priority, `text-`)
//     priority.classList.add(determinePriorityColor(allTasks[id].priority))
//     priority.innerHTML = `${allTasks[id].priority}`
// }