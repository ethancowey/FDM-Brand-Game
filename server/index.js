const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/test',(req, res) => {
    res.send('hello, test is working');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server Started'));
