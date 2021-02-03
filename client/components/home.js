/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from './modal'
import Task from './task'

const Home = () => {
  const [category, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  const [modal, setModal] = useState({
    modal1: false,
    modal2: false
  })

  useEffect(() => {
    axios(`/api/v1/tasks/`).then(({ data }) => setCategories(data))
  }, [])
  const addTasks = (title1, name1) => {
    axios
      .post(`/api/v1/tasks/`, {
        title: title1,
        name: name1
      })
      .then(({ data }) => setTasks([...tasks, data.title, data.name]))
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen flex-col ">
        <h1>TO DO:</h1>
        <Task category={category} />
        <button
          type="button"
          onClick={() =>
            setModal({
              ...modal,
              modal1: true
            })
          }
        >
          add
        </button>
        <Modal
          title="Modal 1  Title"
          isOpened={modal.modal1}
          onModalClose={() => setModal({ ...modal, modal1: false })}
          addTasks={addTasks}
        />
        <Modal title="Modal 2  Title" isOpened={modal.modal2} addTasks={addTasks} />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
