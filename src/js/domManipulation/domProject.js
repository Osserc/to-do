import { allProjects, currentProject } from "../buildProject"
import { showTaskAll, wipeTasks } from "./domTask"
import { determinePriorityColor } from "./domTaskShared"

const card = document.getElementById(`project-details`)

function showProjectsAll() {

}

function showProject() {
    wipeProject()
    card.append(buildProject())
}

function buildProject() {
    const allProjectInfo = []
    allProjectInfo.push(buildProjectHeader(), buildProjectDescription())
    return allProjectInfo
}

function buildProjectHeader() {
    const header = document.createElement(`h3`)
    header.classList.add(`card-header`, `row`, `justify-content-between`, `w-100`, `text-bg-info`, `border-bottom`, `border-2`)
    header.append(buildProjectDate(), buildProjectTitle(), buildProjectPriority())
    return header
}

function buildProjectDate() {
    const dueDate = document.createElement(`div`)
    dueDate.classList.add(`col-12`, `text-light`, `fw-bold`, `text-center`)
    dueDate.id = `project-${currentProject.id}-date`
    dueDate.innerHTML = currentProject.dueDate
    return dueDate
}

function buildProjectTitle() {
    const title = document.createElement(`div`)
    title.classList.add(`col-md-5`, `col-12`, `text-light`, `fw-bold`, `text-center`, `text-md-start`)
    title.id = `project-${currentProject.id}-title`
    title.innerHTML = currentProject.title
    return title
}

function buildProjectPriority() {
    const priority = document.createElement(`div`)
    priority.classList.add(`col-md-5`, `col-12`, determinePriorityColor(currentProject.priority), `fw-bold`, `text-center`, `text-md-start`)
    priority.id = `project-${currentProject.id}-priority`
    priority.innerHTML = currentProject.priority
    return priority
}

function buildProjectDescription() {

}

function wipeProject() {
    card.replaceChildren()
}

/* <div class="container-fluid d-flex flex-column justify-content-center align-items-center card border border-3 w-75 px-0 mt-3" id="project-details">
    <h3 class="card-header row justify-content-between w-100 text-bg-info border-bottom border-2">
        <div class="col-12 text-light fw-bold text-center">Due date</div>
        <div class="col-md-5 col-12 text-light fw-bold text-center text-md-start">Current project title</div>
        <div class="col-md-5 col-12 text-light fw-bold text-center text-md-end">Priority level</div>
    </h3>
    <div class="fs-5">
        Task description
    </div>
</div> */

export { currentProject }