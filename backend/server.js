const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')

const server = express()

server.use(express.static("frontend/public"))

server.set("view engine", "njk")

nunjucks.configure("../projeto1/frontend/views",{
    express: server,
    autoescape: false,
    noCache:true
})

server.get("/", function(req, res){
    const data = {
        avatar_url:'https://media-exp1.licdn.com/dms/image/C4D03AQHq2-7oOrplaw/profile-displayphoto-shrink_200_200/0?e=1597881600&v=beta&t=jwArfDtw9VKiSnFTLBwy2EpK9ZabhigUzt2LHXnwHxY',
        name:"Pedro Gorrochotegui",
        role:"Consultor Funcional",
        description:"Contador",
        links:[{ name:"linkedin",url:"https://www.linkedin.com/in/pedro-gorrochotegui-30944617a/"},
        {name:"facebook", url: "https://www.facebook.com/pedro.araujo.9638/"},
        {name:"Github", url:"https://github.com/PedroGorro"}
         ] }


    return res.render("index", {data})
})

server.get("/classes",function(req, res){
    return res.render("classes", {itens: videos})    
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        if(id==video.id){
            return true
        }
        if(id!=video.id){
            res.send('id do video não encontrado')
        }
    })

    return res.render("video", {item:video})
})

server.listen(5000, function(){
    console.log("server is running")
})