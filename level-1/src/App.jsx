import React from 'react'
import TaskColumn from './components/TaskColumn'
import TaskCard from './components/TaskCard'
import taskData from './taskData.json'
import './app.css'

function App() {

  const tasks = taskData.tasks
  const todoItems = tasks.todoItems.map((todo, index) => {
    return <TaskCard key={index} title={todo.title} description={todo.description}/>
  })
  const inprogressItems = tasks.inprogressItems.map((inprogress, index) => {
    return <TaskCard key={index} title={inprogress.title} description={inprogress.description}/>
  })
  const doneItems = tasks.doneItems.map((done, index) => {
    return <TaskCard key={index} title={done.title} description={done.description}/>
  })
  


  return (
    <>
      <h1>Tasks</h1>
      <div className="column-container">
        <section className="task-column">
          <TaskColumn title="To Do"/>
          {todoItems}
        </section>

        <section className="task-column">
          <TaskColumn title="In Progress"/>
          {inprogressItems}
        </section>

        <section className="task-column">
          <TaskColumn title="Done"/>
          {doneItems}
        </section>
      </div>
    </>
  )
}

export default App
