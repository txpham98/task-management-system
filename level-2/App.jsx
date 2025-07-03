import React from 'react'
import TaskColumn from './components/TaskColumn'
import TaskCard from './components/TaskCard'
import taskData from './taskData.json'
import './app.css'

function App() {

  //Grab data from json file
  const tasks = taskData.tasks

  const todoItems = tasks.todoItems
  const [todoTasks, setTodoTasks] = React.useState(todoItems)
  
  const inprogressItems = tasks.inprogressItems
  const [inprogressTasks, setInprogressTasks] = React.useState(inprogressItems)
  
  const doneItems = tasks.doneItems
  const [doneTasks, setdone] = React.useState(doneItems)

  const [addTask, setAddTask] = React.useState(false)

  function taskForm(formData) {
    const data = Object.fromEntries(formData)
    setTodoTasks(prevTodoTasks => ([...prevTodoTasks, data]))
    setAddTask(false)
  }
  


  return (
    <>
      <h1>Tasks</h1>
      <div className="column-container">
        <section className="task-column">
          <TaskColumn title="To Do"/>
          {todoTasks.map((todo, index) => {
            return <TaskCard key={index} title={todo.title} description={todo.description}/>
          })}
          <div className='form-container'>
            {addTask ? <form action={taskForm}>
              <label>
                Task Title:
                <input type="text" name="title"></input>
              </label> <br></br>
              <label>
                Task Description:
                <textarea name="description"></textarea>
              </label>
              <button onClick={taskForm} type="submit" value="submit">Create Task</button>
            </form> : null}
            {!addTask ? <h3 onClick={() => {setAddTask(true)}}>Add Task +</h3> : null}
          </div>
        </section>

        <section className="task-column">
          <TaskColumn title="In Progress"/>
          {inprogressTasks.map((inprogress, index) => {
            return <TaskCard key={index} title={inprogress.title} description={inprogress.description}/>
          })}
        </section>

        <section className="task-column">
          <TaskColumn title="Done"/>
          {doneTasks.map((done, index) => {
            return <TaskCard key={index} title={done.title} description={done.description}/>
          })}
        </section>
      </div>
    </>
  )
}

export default App
