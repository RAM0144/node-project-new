import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

// console.log(process.env)

const dbName = process.env.DB_NAME||"fsd56we-tamil";

const dbUsr = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbCluster = process.env.DB_CLUSTER || ""

//Create a client instance
const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(cloudUrl)

//Selecting a particular db-name
const db = client.db(dbName)

//Connecting to the asynchronously
const connectToDb = async()=>{

    try {
        await client.connect()

    } catch (e) {
        console.log("Error connecting to db", e);
        process.exit(1)
    }
}

export {db, client}

export default connectToDb