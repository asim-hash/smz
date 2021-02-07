import React, { useState } from 'react'
import axios from 'axios'

const Eddit = ({ onModalClose, category }) => {
  const [taskInput, setTaskInput] = useState('')
  const [taskname, setTaskname] = useState('')
  const [taskPriority, setTaskPriority] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskProject, setTaskProject] = useState('')
  const [tasks, setTasks] = useState([])

  const edditTasks = (Input, Name, Priority, Description, Project, id) => {
    axios.post(`/api/v1/tasks/${id}`, { title: taskInput })
    setTasks(
      tasks.map((el) =>
        el.taskId === id
          ? { ...el, title: Input, name: Name, description: Description, project: Project }
          : el
      )
    )
  }
  return (
    <div className="flex flex-col border-8 border-black font-bold">
      <div className="flex py-2 ">
        <label htmlFor="title" className="text-black">
          Заголовок
        </label>
        <input
          value={taskInput}
          id="title"
          type="text"
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="name" className="text-black">
          Название проекта
        </label>
        <input
          value={taskname}
          id="name"
          type="text"
          onChange={(e) => setTaskname(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="priority" className="text-black">
          Приоритет
        </label>
        <input
          value={taskPriority}
          id="priority"
          type="text"
          onChange={(e) => setTaskPriority(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="project" className="text-black">
          Проект
        </label>
        <input
          value={taskProject}
          id="project"
          list="project"
          onChange={(e) => setTaskProject(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
        <datalist id="<project>">
          <option value="1" />
          <option value="2" />
          <option value="3" />
        </datalist>
      </div>
      <div className="flex py-2 ">
        <label htmlFor="description" className="text-black">
          описание
        </label>
        <input
          value={taskDescription}
          id="description"
          type="text"
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() =>
            edditTasks(taskInput, taskname, taskPriority, taskDescription, taskProject)
          }
          className="border border-black"
        >
          сохранить
        </button>
        <button type="button" className="border border-black" onClick={() => onModalClose()}>
          Отменить
        </button>
      </div>
    </div>
  )
}

export default Eddit
