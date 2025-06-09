import mongoose from 'mongoose';
import * as config from "../config/index.config";

const connect_to_db = async () => {
    let { mongoUri } = config.dbConfig

   try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        process.exit(1); // exit if DB connection fails
    }
}

export default connect_to_db;