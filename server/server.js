/* eslint-disable prettier/prettier */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import ids from 'short-id'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const read = () => {
  return readFile(`${__dirname}/tasks/tasks.json`, { encoding: 'utf8' })
    .then((result) => {
      return JSON.parse(result)
    })
    .catch(() => {
      return []
    })
}

const write = (tasks) => {
  return writeFile(`${__dirname}/tasks/tasks.json`, JSON.stringify(tasks, 1, 2), {
    encoding: 'utf8'
    // eslint-disable-next-line consistent-return
  })
}

const filteredKeys = (array) => {
  return array.reduce((acc, rec) => {
    // eslint-disable-next-line no-underscore-dangle
    if (rec._isDeleted) {
      return acc
    }
    return [
      ...acc,
      {
        taskId: rec.taskId,
        title: rec.title,
        name: rec.name,
        description: rec.description,
        priority: rec.priority,
        project: rec.project,
        status: rec.status
      }
    ]
  }, [])
}

server.get('/api/v1/tasks/', async (req, res) => {
  const tasks = filteredKeys(JSON.parse(await readFile(`${__dirname}/tasks/tasks.json`, 'utf-8')))
  res.json(tasks)
})

server.post('/api/v1/tasks/', async (req, res) => {
  const tasks = JSON.parse(await readFile(`${__dirname}/tasks/tasks.json`, 'utf-8'))
  const newTask = {
    taskId: ids.generate(),
    title: req.body.title,
    name: req.body.name,
    priority: req.body.priority,
    project: req.body.project,
    description: req.body.description,
    _isDeleted: false,
    _createdAt: +new Date(),
    _deleteAt: null
  }
  const addedTasks = [...tasks, newTask]
  await write(addedTasks)

  res.json(tasks)
})

server.patch('/api/v1/tasks/:id', async (req, res) => {
  const { id } = req.params
  const newTaskName = req.body.name
  const newTitle = req.body.title
  const newPriority = req.body.priority
  const newProject = req.body.project
  const newDescription = req.body.description
  const tasks = await read()
  const updatedName = tasks.map((el) =>
    el.taskId === id
      ? {
          ...el,
          name: newTaskName,
          title: newTitle,
          priority: newPriority,
          project: newProject,
          description: newDescription
        }
      : el
  )
  await write(updatedName)
  res.json({ status: 'updated' })
})

server.delete('/api/v1/tasks/:id', async (req, res) => {
  const { id } = req.params
  const tasks = await read()
  const deleted = tasks.map((el) => (el.taskId === id ? { ...el, _isDeleted: true } : el))
  await write(deleted)
  res.json({ status: 'deleted' })
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Boilerplate'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
