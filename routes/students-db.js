import express from "express";

import { db } from "../DB-utils/mongodb-safe-Connection.js";

const studentDbRouter = express.Router();

const collection = db.collection("students")
//Creating a new student
studentDbRouter.post("/", async (req, res) => {
    try{
        const payload = req.body

        // const collection = db.collection("students")
        //await db.collection("students").insertOne({
     await collection.insertOne({
        ...payload, id: Date.now().toString(), teacherId: null
     })

     res.status(201).send({msg: "Student Created Successfully"})

    }catch(e){
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//Get all the Students
studentDbRouter.get("/", async(req, res) => {
    try{
     const students = await collection.find({}, {projection:{_id:0}}).toArray()
     res.send({msg: "Info about students", students})
    }catch(e){
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//Get single Student
studentDbRouter.get("/:studentId", async (req, res) => {
    try{
     const studentId = req.params.studentId
     const student = await collection.findOne({id:studentId}, {projection:{_id:0}})
     res.send({msg: "Info about student " + studentId, student})
    
    }catch(e){
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//Update a student
studentDbRouter.put("/:studentId", async (req, res) => {
    try{
      const studentId = req.params.studentId
      const payload = req.body
      
      await collection.updateOne(
        {
          id: studentId,
        },
        {
          $set: payload
        }
    );
      res.send({msg: "student updated successfully"})
    }catch(e){
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//Delete a student
studentDbRouter.delete("/:studentId", async (req, res) => {

    try {
        const studentId = req.params.studentId
        await collection.deleteOne({id: studentId})
        res.send({msg: "Student deleted successfully"})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})


export default studentDbRouter