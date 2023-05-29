import mongoose from "mongoose"
import app from "./app";
import config from "./config";

async function connect() {
    try {
        await mongoose.connect(config.database_url as string)
        .then(() => console.log('Connected!'));
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          })
    } catch (error) {
        console.log(error);
    }
}
connect();


