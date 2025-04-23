// import isEqual from "lodash/isEqual.js";
import express from "express"
import { createFile, readFolder } from "./fs-utils.js";

// const obj1 = {name: "Ram", role: "Developer"}

// const obj2 = {role: "Developer",name: "Ram"}

// console.log(isEqual(obj1, obj2))

const app = express();

app.get("/create-file", (req, res)=> {
    createFile()
    res.send({msg: "file created succesfully"})
})

app.get("/read-files", (req, res)=>{
    const files = readFolder("files")
    res.send(files)
})

app.listen(5000, ()=>{
    console.log("APIs listening on 5000")
})


// let date = new Date().toString()
//  let textDate = date.toString()
//  let txt = textDate.split(":").join("-")

//  console.log(txt)