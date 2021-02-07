import React, { useState } from 'react'
import axios from 'axios'
import Modal from './modal'

const EdditModal = () => {
  const [tasks, setTasks] = useState([])
  const [editingMode, setEditingMode] = useState(false)
  const [taskName, setTaskName] = useState(task.title)
  const handleTask = () => {
    saveTask(taskName, task.taskId)
    setEditingMode(false)
  }
  const edditTasks = (TaskName, id) => {
    axios.post(`/api/v1/tasks/${id}`, { title: TaskName })
    setTasks(tasks.map((el) => (el.taskId === id ? { ...el, title: TaskName } : el)))
  }
  const [modal, setModal] = useState({
    modal1: false,
    modal2: false
  })
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setModal({
            ...modal,
            modal1: true
          })
        }
      >
        eddit
      </button>
      <Modal
        title="Modal 1  Title"
        isOpened={modal.modal1}
        onModalClose={() => setModal({ ...modal, modal1: false })}
        edditTasks={edditTasks}
      />
      <Modal title="Modal 2  Title" isOpened={modal.modal2} edditTasks={edditTasks} />
    </div>
  )
}

export default EdditModal
