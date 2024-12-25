const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/transaction", require("./routers/Transaction.route"));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})