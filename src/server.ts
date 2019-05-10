import express from 'express';
import bodyParser from 'body-parser';
import bluebird from 'bluebird';
import api from './routes/routes';
import mongoose from 'mongoose';


const mongodbURL = process.env.MONGODB_URL || "mongodb://localhost:27017/teste-bitx";

(<any>mongoose).Promise = bluebird;
mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    auth: {
        user: "root",
        password: "t3st3b1tX"
        }
    }).then(() => {
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


