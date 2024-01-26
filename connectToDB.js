import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('Connected to the database')
        return connection
    } catch (error) {
        console.error('Error connecting to the database:', error)
        throw error
    }
}

export const disconnectFromDB = async () => {
    mongoose.connection.close()
    console.log('Disconnected from DB.');
}

export const createCollection = async name => {
    mongoose.connection.createCollection(name)
}

// module.exports = {
//     connectToDB,
//     disconnectFromDB,
//     createCollection
// }