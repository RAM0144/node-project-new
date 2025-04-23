import express from "express"

import { db } from "../DB-utils/mongodb-safe-Connection.js";

const teachersDbRouter = express.Router();

const collection = db.collection("teachers")


//Create a Teacher
teachersDbRouter.post("/", async (req, res) => {
    const teacherInfo = {...req.body, id: Date.now().toString()}

    try {
        await collection.insertOne(teacherInfo)
        res.send({msg: "Teacher Created Successfully"})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//get All Teachers

teachersDbRouter.get("/", async(req, res) => {
  
    try {
        const teachers = await collection.find({},{projection:{_id:0}}).toArray()
        res.send({msg: "About all Teacher Info", teachers})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//get a single teacher
teachersDbRouter.get("/:teacherId", async (req, res) => {
    const teacherId = req.params.teacherId

    try{
       const teacher = await collection.findOne({id:teacherId},{projection:{_id:0}})
       res.send({msg:"Info about TeacherId "+ teacherId, teacher})
    }catch(e){
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//Update a teacher
teachersDbRouter.put("/:teacherId", async (req, res) => {
    const teacherId = req.params.teacherId
    const updateInfo = req.body
    
    try{
        await collection.updateOne(
            {
                id: teacherId
            },
            {
                $set: updateInfo
            }
        )
        res.send({msg:"Teacher Updated successfully"})
    }catch(e){
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

//Delete a teacher
teachersDbRouter.delete("/:teacherId", async (req, res) => {
  const teacherId = req.params.teacherId

    try {
        await collection.deleteOne({id: teacherId})
        res.send({msg: "Teacher Deleted Successfully"})
    } catch (e) {
        console.log(e)
        res.status(500).send({msg: "Internal Server Error"})
    }
})

export default teachersDbRouter;
