# to-do

A to-do application made for the Odin Project (https://www.theodinproject.com/lessons/javascript-todo-list)

Features:
- Create projects to work on, with custom title and due date
- Create tasks inside project, with title, degree of urgency and status
- Delete tasks
- Delete projects
    - Automatically switch to the first project if deleting the current project
    - Present blank page if all projects are deleted
- Seed projects with samples on first visit
- Store changes and additions and dynamically regenerate the "database"

As usual, made with webpack and Bootstrap. The project was much harder than I anticipated, and did give me plenty of opportunities to grasp new concepts and solidify my understanding of older ones.  
One example is the relationship between modules, and the fac that variables declared in one module cannot be changed outside of it; I also re-learned the importance of careful planning when it came to refactor my code for DOM manipulation, given that I realized I basically copy-pasted the code from a different module.

My refactor significantly cut down on size and complexity (don't look at the commit history, please), but it could stand some further refinements. It is still paying the debt it owes to my lack of foresight and excessive ambition, but the app is functional and rewriting it (properly) from scratch would be too taxing.  
After using webpack a bunch I can see why it's so popular, and not too hard to deal with, at least at this level. Especially the --watch option, it saved me a lot of headache, as well as the development options to keep the modules separate to troubleshoot.

Of interest was also my experience with localStorage to both seed and store objects. It wasn't as complex as I thought it would be, as it does seem pretty straightforward. I am rather satisfied with what I accomplished thanks to it.

Live preview: https://osserc.github.io/to-do/