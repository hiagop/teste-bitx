import express from "express";
import bodyParser from 'body-parser';
import api from './routes/routes';

const port = process.env.SERVER_PORT || 8000;
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use("/", api);

server.listen(port, () => {
    console.log(`server running on port: ${port}`);
})


