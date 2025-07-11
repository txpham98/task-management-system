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
  const [doneTasks, setDone] = React.useState(doneItems)


  //Adding new tasks
  const [addTask, setAddTask] = React.useState(false)

  function taskForm(formData) {
    const data = Object.fromEntries(formData)
    setTodoTasks(prevTodoTasks => ([...prevTodoTasks, data]))
    setAddTask(false)
  }
  
  //Fetch to do data from API
  const [allToDoTasks, setAllToDoTasks] = React.useState([])
  React.useEffect(() => {
    fetch('https://dummyjson.com/todos/random/5')
    .then(res => res.json())
    .then(data => {
      setAllToDoTasks(data);
      })
  }, [])

  //Update task status
  function updateStatus(newStatus, task) {
  // Remove task from current state
  const removeFromList = (list) => {
  return list.filter(t => {
    if (!t) return false; // skip undefined
    if (task.isApiTask) {
      return t.id !== task.id;
    } else {
      return t.title !== task.title || t.description !== task.description;
    }
  });
}

  setTodoTasks(prev => removeFromList(prev, task))
  setInprogressTasks(prev => removeFromList(prev, task))
  setDone(prev => removeFromList(prev, task))
  setAllToDoTasks(prev => removeFromList(prev))


  // Add task to new status list
  if (newStatus === "todo") {
    setTodoTasks(prev => [...prev, task])
  } else if (newStatus === "inprogress") {
    setInprogressTasks(prev => [...prev, task])
  } else if (newStatus === "done") {
    setDone(prev => [...prev, task])
  }
}

  return (
    <>
      <h1>Tasks</h1>
      <div className="column-container">
        <section className="task-column">
          <TaskColumn title="To Do"/>
          {todoTasks.map((todo, index) => {
            return <TaskCard onChange={updateStatus} status="todo" key={index} title={todo.title} description={todo.description}/>
          })}
          {allToDoTasks
            .filter(task => task && task.id && task.todo)
            .map(task => (
              <TaskCard
                onChange={updateStatus}
                status="todo"
                key={task.id}
                id={task.id}
                title={task.todo}
                description="API - No description"
                isApiTask={true}
              />
          ))}
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
            return <TaskCard onChange={updateStatus} status="inprogress" key={index} title={inprogress.title} description={inprogress.description}/>
          })}
        </section>

        <section className="task-column">
          <TaskColumn title="Done"/>
          {doneTasks.map((done, index) => {
            return <TaskCard onChange={updateStatus} status="done" key={index} title={done.title} description={done.description}/>
          })}
        </section>
      </div>
    </>
  )
}

export default App
