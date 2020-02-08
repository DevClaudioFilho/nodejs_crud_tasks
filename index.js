const express = require('express');

const server = express();

server.use(express.json())

const projects = []

function checkID(req,res,next){
  const {id} =req.params

  const project = projects.find(p=>p.id ===id)
  
  if(!project){
    return res.status(400).json({error:"This project does not exits"})
  }
  
  return next()
}

function countReq(res,res,next){
  console.count("Number of Requests")

  return next()
}

server.use(countReq)

server.post('/projects',(req,res)=>{
  const {id,title} = req.body
  const response = {
    id,
    title,
    tasks:[]
  }

  projects.push(response)

  return res.json(response)
})

server.get('/projects',(req,res)=>{
  return res.json(projects)
})

server.put('/projects/:id',checkID, (req,res)=>{
  const {id} = req.params
  const {title} = req.body

  const project = projects.find(p=>p.id === id)

  project.title=title

  return res.json(projects)
})

server.delete('/projects/:id',checkID, (req,res)=>{
  const {id} = req.params

  const project = projects.find(p=>p.id === id)

  projects.splice(project,1)

  return res.json(projects); 
})

server.post('/projects/:id/tasks',checkID, (req,res)=>{
  const {id} = req.params
  const {title} = req.body

  const project = projects.find(p=>p.id === id)

  project.tasks.push(title) 

  return res.json(project)
})

server.listen(3333);