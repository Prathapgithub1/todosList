let containerElement=document.getElementById("containerElement");
containerElement.classList.add("container")

//buttonElement 
let buttonElement=document.getElementById("buttonInput");
let SaveButtonElement=document.getElementById("saveButtonElement");

//input of lables 

function getTodoListFromLocalStorage(){
    let stringyfiedTodoList=localStorage.getItem("todoList");
    let parsedTodoLIst=JSON.parse(stringyfiedTodoList);
    if (parsedTodoLIst ===null){
        return [];
    }else{
        return parsedTodoLIst;
    }

}

let todoList= getTodoListFromLocalStorage();
let todoCount=todoList.length;

//SaveButton 
SaveButtonElement.onclick= function(){
    localStorage.setItem("todoList",JSON.stringify(todoList))
}


//onAddTodo 

function onAddTodo(){
    let searchInputElement=document.getElementById("searchInput");
    let inputElementValue=searchInputElement.value;
    if (inputElementValue ===""){
        alert("Enter Valid Text");
        return;
    }
    todoCount=todoCount+1;
    let newTodo={
        text:inputElementValue,
        uniqueNo:todoCount,
        isChecked:false
    }
    todoList.push(newTodo);
    createTodoApp(newTodo);
    searchInputElement.value="";
}

buttonElement.onclick= function(){
    onAddTodo();
}

//onTodoStatusChanges 
function onTodoStatusChanges (checkBoxId,labelId,todoId){
    let checkBoxElement=document.getElementById(checkBoxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle('checked');
    let todoObjectIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId='todo'+eachTodo.uniqueNo;
        if (eachTodoId===todoId){
            return true;
        }else{
            return false;
            }
    });
    let todoObject=todoList[todoObjectIndex];
    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }
    else{
        todoObject.isChecked = true;
    }

}


//onDelete 
function onDelete (todoId){
    let todoIdElement=document.getElementById(todoId);
    containerElement.removeChild(todoIdElement)

    let deleteElementIndex=todoList.findIndex(function(eachTodo){
        let eachTodoId='todo'+eachTodo.uniqueNo;
        if (eachTodoId===todoId){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(deleteElementIndex,1);
}



function createTodoApp(todo){

    let todoId='todo'+todo.uniqueNo;
    let checkBoxId='checkbox'+todo.uniqueNo;
    let labelId='label'+todo.uniqueNo;
    
    let ListElement=document.createElement('li');
    ListElement.classList.add("listItemSContainer");
    ListElement.id=todoId;
    containerElement.appendChild(ListElement);
    
    //checkBoxInput 
    let checkBoxInput=document.createElement("input");
    checkBoxInput.type='checkbox';
    checkBoxInput.id=checkBoxId;
    checkBoxInput.classList.add("checkBox");
    checkBoxInput.checked=todo.isChecked;
    checkBoxInput.onclick= function(){
        onTodoStatusChanges(checkBoxId,labelId,todoId)
    }
    ListElement.appendChild(checkBoxInput)
    
    //labelContainer 
    
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("labelContainer");
    ListElement.appendChild(labelContainer);
    
    //labelElement 
    let labelElement=document.createElement('label');
    labelElement.textContent=todo.text;
    labelElement.id=labelId;
    labelElement.classList.add("labelElements")
    labelElement.setAttribute("for","checkBoxInputElement");
    labelContainer.appendChild(labelElement);
    //deleteIconcontainer 
    let deleteIconCon=document.createElement("div");
    deleteIconCon.classList.add("DeleteCon")
    labelContainer.appendChild(deleteIconCon);
    //deleteIcon 
    
    let deleteIcon=document.createElement('i');
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick=function(){
        onDelete(todoId)
    }
    deleteIconCon.appendChild(deleteIcon);
    
    }
    
    for (let todo of todoList){
        createTodoApp(todo)
    }