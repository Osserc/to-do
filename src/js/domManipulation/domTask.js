
const list = document.getElementById(`task-list`)

function showTask() {
    list.append(buildTask())
}

function buildTask() {
    const task = document.createElement(`div`)
    task.classList.add(`col-md-5`, `col-12`, `card`, `border`, `border-3`, `shadow`, `px-0`)
    task.append(buildHeader(), buildBody())
    return task
}

function buildHeader() {
    const header = document.createElement(`div`)
    header.classList.add(`card-header`, `d-flex`, `justify-content-between`, `align-items-center`, `text-bg-primary`, `border-bottom`, `border-2`)
    header.append(buildTitle(), buildDeleteButton())
    return header
}

function buildTitle() {
    const title = document.createElement(`div`)
    title.innerHTML = `Buy wood`
    return title
}

function buildDeleteButton() {
    const closeButton = document.createElement(`button`)
    closeButton.classList.add(`btn-close`)
    return closeButton
}

function buildBody() {
    const body = document.createElement(`div`)
    body.classList.add(`card-body`, `d-flex`, `justify-content-between`, `align-items-center`, `text-bg-secondary`, `py-2`)
    body.append(buildCheckmark(), buildUrgency(), buildEditButton())
    return body
}

function buildCheckmark() {
    const formCheck = document.createElement(`div`)
    formCheck.classList.add(`form-check`, `m-0`)
    const checkButton = document.createElement(`input`)
    checkButton.classList.add(`form-check-input`)
    checkButton.type = `checkbox`
    checkButton.value = ``
    checkButton.id = `check-button-1`
    const checkLabel = document.createElement(`label`)
    checkLabel.classList.add(`form-check-label`)
    checkLabel.setAttribute(`for`, `check-button-1`)
    formCheck.append(checkButton, checkLabel)
    return formCheck
}

function buildUrgency() {
    const urgency = document.createElement(`div`)
    urgency.classList.add(`fw-bold`, `fs-5`, `text-danger`)
    urgency.innerHTML = `Urgent`
    return urgency
}

function buildEditButton() {
    const editButton = document.createElement(`button`)
    editButton.classList.add(`btn`, `btn-primary`)
    editButton.innerHTML = `Edit`
    return editButton
}

showTask()

// <div class="col-md-5 col-12 card border border-3 shadow px-0">
//     <div class="card-header d-flex justify-content-between align-items-center text-bg-primary border-bottom border-2">
//         <div class="title">Buy wood</div>
//         <button class="btn-close"></button>
//     </div>
//     <div class="card-body d-flex justify-content-between align-items-center text-bg-secondary py-2">
//         <div class="form-check m-0">
//             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
//             <label class="form-check-label" for="flexCheckDefault">Done</label>
//         </div>
//         <div class="fw-bold fs-5 text-danger">Urgent</div>
//         <button class="btn btn-primary">Edit</button>
//     </div>
// </div>