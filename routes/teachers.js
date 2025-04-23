import express from "express";

const teachers = []

const teachersRouter = express.Router();


//Get a all teachers
teachersRouter.get("/", (req, res) => {

    try{
       res.send({msg: "Info about all the teachers", teachers})
    }catch(err){
        res.status(500).send({msg: "Internal Server Error", err})
    }
})


//Get a single teachers
teachersRouter.get("/:teacherId", (req, res) => {
     const teacherId = req.params.teacherId

     try{
       const teacherObj = teachers.find((teacher)=> teacher.id === teacherId) 
       if(teacherObj){
        res.send({...teacherObj})
       }else{
        res.status(404).send({msg: "No Teacher Found"})
       }

     }catch(err){
        res.status(500).send({msg: "Internal Server Error", err})
     }
})


//Create a Single teachers
teachersRouter.post("/", (req, res) => {
    const teacherInfo = {...req.body, id: Date.now().toString()}
    try{
      teachers.push(teacherInfo)
      res.send({msg: "Teacher Created Successfully"})
    }catch{
        res.status(500).send({msg: "Internal Server Error", err})
    }
})

//Update a Single teachers
teachersRouter.put("/:teacherId", (req, res)=>{
    const teacherId = req.params.teacherId
    const updateInfo = req.body
    
    try{
       const index = teachers.findIndex((teacher) => teacher.id === teacherId)
       const teacherObj = teachers.find((teacher) => teacher.id === teacherId)

       if(teacherObj){
        teachers[index] = {...teacherObj, ...updateInfo}
        res.send({msg: "Teacher Updated Successfully"})
       }else{
        res.status(404).send({msg: "No Teacher Found"})
       }
    }catch(err){
        res.status(500).send({msg: "Internal Server Error", err})
    }
})

                    // path params
//Delete a Single teachers
teachersRouter.delete("/:teacherId", (req, res)=>{  
    const teacherId = req.params.teacherId

    try{
       const index = teachers.findIndex((teacher) => teacher.id === teacherId)
       if(index !== -1){
         teachers.splice(index, 1)
         res.send({msg: "Teacher Deleted Successfully"})
       }else{
        res.status(404).send({msg: "No Teacher Found"})
       } 
    }catch(err){
        res.status(500).send({msg: "Internal Server Error", err})
    }
})

                          // query params

// teachersRouter.delete("/", (req, res)=>{  // query params-> http://localhost:4000/teachers?Id=123
//     const teacherId = req.query.teacherId
//      console.log("comming from query", teacherId)
//     try{
//        const index = teachers.findIndex((teacher) => teacher.id === teacherId)
//        if(index !== -1){
//          teachers.splice(index, 1)
//          res.send({msg: "Teacher Deleted Successfully"})
//        }else{
//         res.status(404).send({msg: "No Teacher Found"})
//        } 
//     }catch(err){
//         res.status(500).send({msg: "Internal Server Error", err})
//     }
// })

export default teachersRouter