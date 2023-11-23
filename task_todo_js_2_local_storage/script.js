document.getElementById("button").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
})
document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
})

let title = document.getElementById('title')
let description = document.getElementById('description')
let date = document.getElementById('date')
let values = document.querySelectorAll('input[name="priority"]');

let allTasks = JSON.parse(localStorage.getItem('task')) || []

document.querySelector(".popup_button").addEventListener("click",function(){
    let priority = Array.from(values).find(radio => radio.checked)

    let data = {
        title : title.value,
        description: description.value,
        date: date.value,
        priority: priority.id,
        status: 'done'
    }
    allTasks.push(data)

    localStorage.setItem('task', JSON.stringify(allTasks))

    updateUI()
    title.value= ''
    description.value = ''
    date.value = ''

    values.forEach(value => {
        value.checked = false
    })
    document.querySelector(".popup").style.display="none";
})

let todo = document.querySelector('.todoList')
let done = document.querySelector('.doneList')

function updateUI(){
    todo.innerHTML = ''
    allTasks.forEach((task) =>{
        let element =  `<div class="banners">
                         <h5 class="common_heading">${task.title}</h5>
                         <p>${task.description}</p>
                        <div class="common_content">
                            <button class="common_button boxone_color">${task.priority}</button>
                        </div>
                    </div>`

                    if(task.statusselection == 'done'){
                        done.insertAdjacentHTML('beforeend', element)
                    }
                    else {
                        todo.insertAdjacentHTML('beforeend', element)
                    }
                    
                })
            }
            
            updateUI()