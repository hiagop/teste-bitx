import express from 'express';
import bodyParser from 'body-parser';
import bluebird from 'bluebird';
import api from './routes/routes';
import mongoose from 'mongoose';


const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017/teste-bitx";
const mongodbOptions = {
    useNewUrlParser: true,
    auth: {
        user: "root",
        password: "t3st3b1tX"
    },
    authSource: "admin"
    };

(<any>mongoose).Promise = bluebird;
mongoose.set("useCreateIndex", true);
mongoose.connect(mongodbURL, mongodbOptions).then(() => {
    console.log(`mongodb connected at ${mongodbURL}`);
}).catch((err) => {
    console.log(`mongodb connection error: ${err}`)
})

const port = parseInt(process.env.SERVER_PORT) || 8000;
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use("/", api);

server.listen(port, () => {
    console.log(`server running on port: ${port}`);
})


