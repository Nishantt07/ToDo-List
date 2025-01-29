let i ;
let li;
let button = document.getElementsByClassName("button")[0];
let input = document.getElementById("text");
let listitems = document.getElementsByClassName("listitems")[0];
let isEditMode = false;
let ii;
let allTasks = [];
let realtask;
let lasteditedtask;
let innerDetails;
let newindex;
// code to add the task listitems//
function addTask(){
    if(isEditMode ==  false){
        if(input.value.trim() === ""){
            alert("Please enter a task")
            return;
        }
        else if(allTasks.includes(input.value.trim())){
            alert("Already Exists");
            input.value =  ""
        }
        else{
            li = document.createElement("li");
            li.innerHTML = input.value;
            i = document.createElement("i");
            i.classList.add("fa-regular",  "fa-pen-to-square","editicon");
            i.setAttribute("id","Editicon")
            ii = document.createElement("i");
            ii.classList.add("fa-solid","fa-xmark");
            ii.setAttribute("id","Crossicon")
            listitems.appendChild(li);

            li.appendChild(i);
            li.appendChild(ii);
            allTasks.push(input.value.trim());
            saveTask();
            input.value = ""; 
            }
    }

}
button.addEventListener("click" , addTask )


// Edit button click code// 
listitems.addEventListener("click", function (event) {
    if (event.target.tagName === "I" && event.target.id === "Editicon") {
        let li = event.target.parentElement; 
        input.value = li.firstChild.textContent.trim();
        realtask = input.value;
        button.innerHTML = "Edit";
        isEditMode = true;



        button.onclick = function(){

            if(isEditMode == true){
                if(input.value.trim() === ""){
                    alert("Enter a task");
                }
                else {
                   

                    li.firstChild.textContent= input.value.trim();
                    lasteditedtask = input.value.trim();
                    editTask();
                    input.value = "";
                    button.innerHTML = "Add";
                    isEditMode = false;
                }

            }
         
        }   
    }
})


listitems.addEventListener("click", function(element){
    if(element.target.tagName === "I" && element.target.id === "Crossicon"){
        let li  = element.target.parentElement;
        innerDetails = li.textContent.trim();
        deleteTask(innerDetails);
        li.remove();
    }
})



function saveTask(){
let tasks = [];

    listitems.querySelectorAll('li').forEach(function(element){
        let text = element.textContent.trim();
        if(!tasks.includes(text)){
            tasks.push(text);
        }

    });
    localStorage.setItem('tasks',JSON.stringify(tasks));


}


function editTask(){
    let index;
    let alltasks = JSON.parse(localStorage.getItem('tasks'));
    if(alltasks.includes(realtask)){
    index = alltasks.indexOf(realtask);
    alltasks[index] = lasteditedtask;
    localStorage.setItem('tasks',JSON.stringify(alltasks))
    }

    if(allTasks.includes(realtask)){
        allTasks[index] = lasteditedtask;
        // console.log(allTasks)
    }
}

function showTask(){
    allTasks = [];
let totaltask  = JSON.parse(localStorage.getItem("tasks"));
totaltask.forEach((value)=>{
    if(value === ""){
        return;
    }
    else{
           li = document.createElement("li");
            li.innerHTML = value;
            i = document.createElement("i");
            i.classList.add("fa-regular",  "fa-pen-to-square","editicon");
            i.setAttribute("id","Editicon")
            ii = document.createElement("i");
            ii.classList.add("fa-solid","fa-xmark");
            ii.setAttribute("id","Crossicon")
            listitems.appendChild(li);

            li.appendChild(i);
            li.appendChild(ii);
    }
 
})
}

function deleteTask(innerDetails){
let allthetasks = JSON.parse(localStorage.getItem("tasks"));
if(allthetasks.includes(innerDetails)){
    newindex = allthetasks.indexOf(innerDetails);
    allthetasks.splice(newindex,1);
}
localStorage.setItem("tasks",JSON.stringify(allthetasks));

if(allTasks.includes(innerDetails)){
    allTasks.splice(newindex,1);
}
}

window.onload = showTask();




