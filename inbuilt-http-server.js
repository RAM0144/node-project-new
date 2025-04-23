import {createServer} from "http";

const server = createServer((req, res) => {
    // res.end("<h1>Hello World </h1>")
    // if(req.method === "GET"){
    //     res.end(JSON.stringify({message: "Hello World"}))
    // }else if(req.method === "POST"){
    //     res.end(JSON.stringify({message: "Data Created Successfully"}))
    // }

    if(req.method === "GET"){
        if(req.url === "/users"){
            res.end(JSON.stringify({message: "Users Data", 
                users: [{name: "Ram"}, {name: "Varsha"}]
            }))
        }else{
            res.end(JSON.stringify({message: "Hello world"}))
        }
    }else if(req.method === "POST"){
        res.end(JSON.stringify({message: "Data created successfully"}))
    }
})

const port = 3600

server.listen(port, ()=>{
    console.log("Server Listening on port" + port)
})