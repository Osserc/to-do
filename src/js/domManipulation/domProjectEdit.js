import { currentProject, changeProjectData } from "../buildProject"
import { buildEditProjectButton } from "./domProject"

function showProjectEditForm() {
    const projectToEdit = document.getElementById(`project-details`)
    projectToEdit.appendChild(buildProjectEditCard())
    activateProjectEditForm()
}

function buildProjectEditCard() {
    const formCard = document.createElement(`div`)
    formCard.id = `project-edit-container`
    formCard.classList.add(`p-3`, `container-fluid`)
    formCard.appendChild(buildProjectEditForm())
    return formCard
}

function buildProjectEditForm() {
    const form = document.createElement(`form`)
    form.id = `project-edit-form`
    form.classList.add(`d-flex`, `justify-content-between`, `align-items-center`, `gap-3`)
    form.append(buildProjectEditFormTitle(), buildProjectEditFormDate(), buildProjectEditFormButton())
    return form
}

function buildProjectEditFormTitle() {
    const formTitleContainer = document.createElement(`div`)
    formTitleContainer.classList.add(`form-group`)
    formTitleContainer.append(buildProjectEditFormTitleLabel(), buildProjectEditFormTitleInput())
    return formTitleContainer
}

function buildProjectEditFormTitleLabel() {
    const formTitleLabel = document.createElement(`label`)
    formTitleLabel.setAttribute(`for`, `title`)
    formTitleLabel.innerHTML = `Title`
    return formTitleLabel
}

function buildProjectEditFormTitleInput() {
    const formTitleInput = document.createElement(`input`)
    formTitleInput.setAttribute(`name`, `title`)
    formTitleInput.setAttribute(`type`, `text`)
    formTitleInput.id = `title`
    formTitleInput.setAttribute(`placeholder`, `Type to modify the title`)
    formTitleInput.classList.add(`form-control`)
    return formTitleInput
}

function buildProjectEditFormDate() {
    const formDateContainer = document.createElement(`div`)
    formDateContainer.classList.add(`form-group`)
    formDateContainer.append(buildProjectEditFormDateLabel(), buildProjectEditFormDateInput())
    return formDateContainer
}

function buildProjectEditFormDateLabel() {
    const formDateLabel = document.createElement(`label`)
    formDateLabel.setAttribute(`for`, `dueDate`)
    formDateLabel.innerHTML = `Due date`
    return formDateLabel
}

function buildProjectEditFormDateInput() {
    const formDateInput = document.createElement(`input`)
    formDateInput.setAttribute(`name`, `dueDate`)
    formDateInput.setAttribute(`type`, `date`)
    formDateInput.id = `date`
    formDateInput.classList.add(`form-control`)
    return formDateInput
}

function buildProjectEditFormButton() {
    const button = document.createElement(`button`)
    button.classList.add(`btn`, `btn-primary`)
    button.innerHTML = `Confirm`
    return button
}


function activateProjectEditForm() {
    const form = document.getElementById(`project-edit-form`)
    form.addEventListener(`submit`, function() {
        event.preventDefault()
        changeProjectData(event.target.elements)
        refreshProjectData()
        document.getElementById(`project-edit-container`).remove()
        const button = document.getElementById(`button-edit-project`)
        button.replaceWith(buildEditProjectButton())
    })
}

function refreshProjectData() {
    const title = document.getElementById(`project-title`)
    title.innerHTML = currentProject.title
    const date = document.getElementById(`project-date`)
    date.innerHTML = currentProject.dateFormatted()
}

export { showProjectEditForm }