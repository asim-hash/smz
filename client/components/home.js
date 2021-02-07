/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from './modal'
import Task from './task'

const Home = () => {
  const [category, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  const [check, setCheck] = useState(false)
  const [sorted, setSorted] = useState([])

  const [modal, setModal] = useState({
    modal1: false,
    modal2: false
  })

  useEffect(() => {
    axios(`/api/v1/tasks/`).then(({ data }) => setCategories(data))
  }, [])

  const sort = () => {
    return setSorted(category.sort((a, b) => a.priority - b.priority))
  }

  const addTasks = (taskInput, taskname, taskPriority, taskDescription, taskProject) => {
    axios
      .post(`/api/v1/tasks/`, {
        title: taskInput,
        name: taskname,
        priority: taskPriority,
        project: taskProject,
        description: taskDescription
      })
      .then(({ data }) => setTasks([...tasks, data.taskInput]))
      .then(() => setModal({ ...modal, modal1: false }))
  }
  const deleteTask = (id) => {
    axios.delete(`/api/v1/tasks/${id}`)
    setTasks(tasks.filter((el) => el.taskId !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen flex-col ">
        <h1>TO DO:</h1>
        <Task
          category={check ? sorted : category}
          deleteTask={deleteTask}
          setModal={setModal}
          modal={modal}
        />
        <button
          type="button"
          onClick={() =>
            setModal({
              ...modal,
              modal1: true
            })
          }
        >
          Добавить
        </button>
        <label htmlFor="check">по приоритету</label>
        <input type="checkbox" id="check" checked={() => setCheck(true)} onClick={() => sort()} />
        <Modal
          title="Modal 1  Title"
          isOpened={modal.modal1}
          onModalClose={() => setModal({ ...modal, modal1: false })}
          addTasks={addTasks}
          category={category}
        />
        <Modal
          title="Modal 2  Title"
          isOpened={modal.modal2}
          addTasks={addTasks}
          category={category}
        />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
