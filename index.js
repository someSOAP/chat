import 'dotenv/config';
import cors from 'cors';
import express from 'express';


const app = express();

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
