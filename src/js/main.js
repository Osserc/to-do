import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import * as domTask from  "./domManipulation/domTask"
import * as domTaskShared from "./domManipulation/domTaskShared"
import * as domProject from "./domManipulation/domProject"
import * as domForms from "./domManipulation/domForms"
import * as buildTask from "./buildTask"
import * as buildProject from "./buildProject"

function initializeData() {
    let data, current = null
    if (localStorage.currentProjectId != undefined) {
        current = localStorage.currentProjectId
    }
    if (localStorage.storedData == undefined) {
        data = [{"title":"Build a doghouse","dueDate":"2023-03-04T23:00:00.000Z","id":0,"tasks":[{"title":"Buy wood","done":true,"priority":"Urgent","id":0},{"title":"Repair workbench","done":false,"priority":"Urgent","id":1},{"title":"Assemble tools","done":true,"priority":"Trivial","id":2},{"title":"Get back planer","done":true,"priority":"Pressing","id":3},{"title":"Put away ladder","done":false,"priority":"Pressing","id":4},{"title":"Prepare snake juice","done":false,"priority":"Trivial","id":5},{"title":"Make chicharrones","done":false,"priority":"Trivial","id":6}]}]
    } else {
        data = JSON.parse(localStorage.getItem(`storedData`))
    }
    decryptData(data)
    if (current != null) {
        buildProject.changeCurrentProject(current)
    } else {
        buildProject.initializeCurrentProject()
    }
    buildTask.refreshAllTasks()
}

function decryptData(data) {
    data.forEach((project) => {
        if (project == null) return
        buildProject.createProject(project.title, new Date(project.dueDate))
        buildProject.changeCurrentProject(buildProject.allProjects[buildProject.allProjects.length - 1].id)
        buildTask.refreshAllTasks()
        project.tasks.forEach((task) => {
            if (task == null) return
            buildTask.createTask(task.title, task.priority, task.done)
        })
    })
}

initializeData()
domProject.showProject()
domProject.initializeCanvas()
domTask.showTaskAll()