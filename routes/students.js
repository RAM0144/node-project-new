//APIs for CRUD operations specific to students object

import express from "express";


//in - memory array for storing the students data
const students = []

//Router for the students
const studentsRouter = express.Router();

//Read all the students
studentsRouter.get("/", (req, res)=> {
    try{
      res.send({msg: "Info about all the students", students})
    }catch(err){
        res.status(500).send({msg: "Internal Server Error", err})
    }
})


//Read a single student
studentsRouter.get("/:studentId", (req, res) => {
    const studentId = req.params.studentId;

    try{
        const stuData = students.find((stu) => stu.id === studentId)
        if(stuData){
            res.send({...stuData})
        }else{
            res.status(404).send({msg: "No Student Found"})
        }
    }catch(err){
        res.status(500).send({msg: "Internal Server Error", err })
    }
})


//Create a new student
studentsRouter.post("/", (req, res) => {
    const studentInfo = {...req.body, id: Date.now().toString(), teacherId: null}

    try{
        students.push(studentInfo)
        res.send({msg: "Student created successfully"})   
    }catch (err){
        res.status(500).send({msg: "Internal Server Error", err})
    }
})


// Update a single student
studentsRouter.put("/:studentId", (req, res)=>{
    const studentId = req.params.studentId
    const updateInfo = req.body

    try{
      const index = students.findIndex((stu) => stu.id === studentId)
      const stuObj = students.find((stu) => stu.id === studentId)
      
      if(stuObj){
        students[index] = {...stuObj, ...updateInfo}  // students[index] -> particular index will capture then alreay we have students to pass now updated student 
        
        res.send({msg: "Student Updated Successfully"})  
      }else{
        res.status(404).send({msg: "No Student Found"})
      }
      
    }catch(err){
        res.status(500).send({msg: "Internal Server Error", err})
    }
})


// Delete a single student
studentsRouter.delete("/:studentId", (req, res)=> {
    const studentId = req.params.studentId

    try{
        const index = students.findIndex((stu) => stu.id === studentId)  //-> findIndex return true or -1
        //const stuObj = students.find((stu) => stu.id === studentId)

        if(index !== -1){    // so stuObj 
          students.splice(index, 1) 
          res.send({msg: "Student Deleted Successfully"})   
        }else{
            res.status(404).send({msg: "No Student Found"})
        }
    }catch(err){
        res.status(500).send({msg: "Internal Server Error", err})
    }
})


export default studentsRouter



