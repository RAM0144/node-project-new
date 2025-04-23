import express from "express";

// import connectToDb from "./DB-utils/mongodb-connection.js"
import connectToDb from "./DB-utils/mongodb-safe-Connection.js";

// import studentsRouter from "./routes/students.js";
// import teachersRouter from "./routes/teachers.js";
import studentDbRouter from "./routes/students-db.js";
import teachersDbRouter from "./routes/teachers-db.js";

const server = express();

//Body parsing Middleware
server.use(express.json())   // did not use this (POST) data will undefined shown

//Connecting to the DB before server starts
// Top level await
await connectToDb();


server.get("/", (req, res)=>{
    res.send({ message: "Hello World" })
})

server.get("/users", (req, res)=>{
    res.send({
        message: "Users Data",
        users: [{name: "Ram"}, {name: "Varsha"}]
    })
})

server.post("/", (req, res)=>{

    const body = req.body;

    console.log("Body data from Request",body)

    res.send({ message: "Data created Successfully" })
})



//Use the router middleware into the server
// server.use("/students", studentsRouter);
// server.use("/teachers", teachersRouter)

server.use("/students", studentDbRouter)
server.use("/teachers", teachersDbRouter)

const port = 4000;

server.listen(port, ()=>{
    console.log(Date().toString(),"listening on port", port)
})