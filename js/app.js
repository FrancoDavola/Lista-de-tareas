const formulario = document.querySelector('#formulario')
const listaDeTareas = document.querySelector('#lista-tweets')
let tareas = []


eventListener()

function eventListener(){
    formulario.addEventListener('submit' , tareaProgramada)
    document.addEventListener('DOMContentLoaded' , () => {
        tareas = JSON.parse(localStorage.getItem('tareas')) || []

        crearHTML()
    })
    
}





function tareaProgramada(e){
    e.preventDefault()

   const tarea = document.querySelector('#tweet').value

   if(tarea === ''){
    mostrarError('Debe agregar una tarea')
   
    

    return;
   }

   objTarea = {
       id: Date.now(), 
       tarea
    }

   tareas = [...tareas , objTarea]
   formulario.reset() 
   crearHTML()
   
}

function mostrarError(error){
    const mensajeDeError = document.createElement('p')
    mensajeDeError.textContent = error
    mensajeDeError.classList.add('error')

    const contenedor = document.querySelector('#contenido')
    contenedor.appendChild(mensajeDeError)

    setTimeout(() => {
        mensajeDeError.remove()
    }, 2000);

}


function crearHTML(){
    limpiarHTML()
    if(tareas.length > 0){
        

        tareas.forEach( tarea => {

            const btnBorrar = document.createElement('a')
             btnBorrar.classList.add('borrar-tweet')
             btnBorrar.innerText = 'X'  ;
             btnBorrar.onclick = () =>{
                 borrarTarea(tarea.id)
             }
 
            let li = document.createElement('li')
            li.textContent = tarea.tarea

            li.appendChild(btnBorrar)
            listaDeTareas.appendChild(li)
        })
    }

    guardasLocalStorage()
}

function limpiarHTML(){

    while(listaDeTareas.firstChild){
        listaDeTareas.removeChild(listaDeTareas.firstChild)
    }
}

function guardasLocalStorage(){
    localStorage.setItem('tareas' , JSON.stringify(tareas))
}

function borrarTarea(id){
    
  tareas = tareas.filter( tarea =>   tarea.id !== id)
    
    crearHTML()
    
    
}