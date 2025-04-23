import fs from "fs"

const createFile = ()=> {
 console.log("creating file")
 let date = new Date().toString()
 let textDate = date.toString()
 let txt = textDate.split(":").join("-")
 
    try{
        if(!fs.existsSync("files")){
            fs.mkdirSync("files")
        }
        fs.writeFileSync(`./files/${txt}`, `Time: ${Date.now()}`);
    }catch (e){
        console.log(`Error writing file: ${e.message}`)
    }

}

const readFolder = (folderName)=> {
    try{
       const files = fs.readdirSync(folderName)
       return files  
    }catch (e){
        console.log(`Error writing file: ${e.message}`)
    }
}

export {createFile, readFolder}