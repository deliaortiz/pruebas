const apiUrl = 'https://jsonplaceholder.typicode.com/todos';;//url de la api para tareas
const taskList = document.getElementById('task-list');//obtiene el elemento de la lista
const taskForm = document.getElementById('task-form');//obtiene el formulario de la tarea
const taskInput = document.getElementById('task-input');//obtiene el campo de entrada del formulario

//funcion para obtener y demostrar las tareas desde la api
async function fetchTasks() {
    try {
        const response =await fetch(apiUrl);//realiza una solicitud get a la api
        const tasks = await response.json();//convierte la repsuesta en json
        displayTasks (tasks);//llama a la funcion para mostrar las tareas
    } catch (error) {
        console.error('Error fetching tasks', error);//maneja y muestra errores de la solicitud
    }
    
}

//funcion para mostrar las tareas de la lista
function displayTasks(tasks){
    taskList.innerHTML = '';//limpia la lista actual
    tasks.forEach (task => {//itera sobre la tarea
        const listItem = document.createElement('li');//crea un nuevo elemento de lista
        listItem.textContent = task.title;//Añade la clase a para estilos
        const deleteBtn = document.createElement('button');//crea un nuevo boton de eliminar
        deleteBtn.textContent = 'Eliminar';//establece el texto del boton
        deleteBtn.classList.add('delete-btn');//añade la clase para estilos
        deleteBtn.onclick = () => deleteTask(task.id, listItem);//asigna la funcion de eliminar a un clic
        listItem.appendChild(deleteBtn);//añade el boton al elementd la lista
        taskList.appendChild(listItem);//añade el elemento a la lista de tareas
        });
    }
    
    //Maneja la sumisión del formulario para agregar una tarea nueva
    taskForm.addEventListener('submit', async(event)=> {
        event.preventDefault();//previene el comportamiento por defecto del formulario
        const taskTitle = taskInput.value;//obtiene el valor del campo de entrada 3
        if(taskTitle) {//Si el el campo de entrada no esta vacio
            try {
                const response = await fetch(apiUrl, {//realiza una solicitud post a la api para agregar una tarea
                    method:'POST',//Metodo de solicitud post
                    headers: {
                        'Content-Type':`application/json`},//tipo de contenid json
                    
                    body: JSON.stringify({//Crea el cuerpo de la solictud json

                        title: taskTitle, complete: false}),
                        complete: false,//marca la tarea como no completada
                        });
                    
                    if(!response.ok) {
                        throw new Error('Network response was not ok');
                        
                    
                }
                const newTask = await response.json();//convierte la respuesta en json
                const li = document.createElement('li');//crea un nuevo elemento en la lista
                li.textContent = newTask.title;//establece el texto dentro del elemento
                const deleteBtn = document.createElement('button');//crea un nuevo boton para eliminar
                deleteBtn.textContent = 'Eliminar';//establecer le texto del boton
                deleteBtn.classList.add('delete-btn');//añade la clase para estilos
                deleteBtn.onclick = () => deleteTask(newTask.id, li);//asigna la funcion de elimina un clic
                li.appendChild(deleteBtn);//añade el boton al elemento lita
                taskList.appendChild(li);//añade el elemento de lista a la lista de tareas
                taskInput.value = '';//limpia el campo de entrada 
            } catch (error) {
                console.error('Error adding task: ', error);//maneja y nuestra los errores de la solicitud
            }

        }
    });

    //funcion para eliminar una tarea
    async function deleteTask(taskId, listItem) {
        try {
            await fetch(`${apiUrl}/${taskId}`, {//realiza una solicitud delete de la api para eliminar una tarea
                method: 'DELETE', //Metodo de solicitud Delete
            });
            taskList.removeChild(listItem);//elimina el elemento de la lista dom
        } catch (error) {
            console.error('Error deleting task:', error)//maneja y muestra errores de la solicitud
        }
    };

//llamada a la funcion para obtener al cargar la pagina
fetchTasks();