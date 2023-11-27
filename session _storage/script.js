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

let allTasks = JSON.parse(sessionStorage.getItem('task')) || []

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

    sessionStorage.setItem('task', JSON.stringify(allTasks))

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
let inprogress = document.querySelector('.inprogress')
let Review = document.querySelector('.Review')

function updateUI(){
    todo.innerHTML = ''
    done.innerHTML = ''
    inprogress.innerHTML = ''
    Review.innerHTML = ''

    allTasks.forEach((task) =>{
        let element =  `<div class="banners" draggable="true" id=${task.id}>
                         <h5 class="common_heading">${task.title}</h5>
                         <p>${task.description}</p>
                        <div class="common_content">
                            <button class="common_button boxone_color">${task.priority}</button>
                        </div>
                    </div>`

                    if(task.status == 'done'){
                        todo.insertAdjacentHTML('beforeend', element)
                       
                    }

                    if(task.status == ''){
                        inprogress.insertAdjacentHTML('beforeend', element)
                    }

                    if(task.status == ''){
                        Review.insertAdjacentHTML('beforeend', element)
                    }

                    if(task.status == ''){
                       
                        done.insertAdjacentHTML('beforeend', element)
                    }
                   
                })
            }
            
            updateUI()

            let boxes = document.querySelectorAll('.box')
            let dragabbleElement = null

            boxes.forEach((box)=> {

                box.addEventListener('dragstart', function(event){
                    dragabbleElement = event.target
                    event.target.style.opacity = '0.5'
                })

                box.addEventListener('dragover', function(event){
                    event.preventDefault()
                })
                
                box.addEventListener('drop', function(event){
                    if(dragabbleElement){
                        box.appendChild(dragabbleElement)
                    }
                })

                box.addEventListener('dragend', function(event){
                    event.target.style.opacity = '1'
                    let id = event.target.id
                    let status = box.classList[2]
            
                    let findIdx = allTasks.findIndex((item)=> item.id == id)
                    allTasks[findIdx].status = status
                    localStorage.setItem('task', JSON.stringify(allTasks))
                })
            
               
            })