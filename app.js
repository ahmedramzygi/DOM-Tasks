const form=document.querySelector('#task-form');
//this is for the ul
const taskList=document.querySelector('.collection');
//This is for the clear tasks button
const clearBtn=document.querySelector('.clear-tasks');
// This for the filter tasks
const filter=document.querySelector('#filter');
// This is for the varied New Task input
const taskInput=document.querySelector('#task');
//We called the loadEventListeners
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTasks);
    filter.addEventListener('keyup',filterTasks);
}
// Reload/get the tasks from the LS
function getTasks(){
    let tasks;
    // We want to save the tasks in the local storage  
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        // We want to parse it as JSON coz the local storage accepts only strings
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
   tasks.forEach(function(task)
   {
        const li=document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        //Append the li to the ul
        taskList.appendChild(li);
   });
}


function addTask(e){
    if(taskInput.value === ''||taskInput.value===' ') {
        alert('Add a task');
        return ;
      }
        const li=document.createElement('li');
    // For every added list we must give it a collectioon item class for the materlize css
        li.className='collection-item';
        li.appendChild(document.createTextNode(taskInput.value));

        const link=document.createElement('a');
        //In materlize css to put the link to the right we put the class name secondary content
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
    //We must clear the input after adding to the tasks
        taskInput.value='';
        e.preventDefault();
}
function storeTaskInLocalStorage(task){
    let tasks;
    // We want to save the tasks in the local storage  
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        // We want to parse it ti JSON as the local storage accepts only strings
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are u sure?')){
        //Our li that we want to remove is the parent of the parent of icon
        e.target.parentElement.parentElement.remove();
        
    
    //remove the task from the LS
    removeTaskLocalStorage(e.target.parentElement.parentElement);
    }
    }
}
function removeTaskLocalStorage(taskItem){
    let tasks;
    // We want to save the tasks in the local storage  
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else{
        // We want to parse it as JSON coz the local storage accepts only strings
        tasks=JSON.parse(localStorage.getItem('tasks'));
    } 
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task)
        {
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearTasks(e){
    //Inner HTML is slower than the remove child loop
// taskList.innerHTML='';
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

//clear from LS
function clearTasksFromLocalStorage(){
    localStorage.clear(); 
}

//We filter the added tasks
function filterTasks(e){
    const text=e.target.value.toLowerCase();
    //We used for each  as the query selector all returns nodelist
    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1)
        {
            task.style.display='block';

        }
        else{
            task.style.display='none';
        }
    });
}
