const mongoose = require('mongoose')

module.exports = async () =>{
    const mongoUri = process.env.MONGODB_URI
    try {
    const connect = await mongoose.connect(mongoUri, {
        dbName:"MERN_JOB_SEEKING"
      });
      console.log(`MongoDb connected`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}