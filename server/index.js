const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(3000, () => console.log('Server listening on port 3000!'));