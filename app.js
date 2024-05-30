const express = require('express');
const multer = require('multer')
const ejs = require('ejs')
const path = require('path');

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//users multer middleware, before we run our logic multer runs its
//file == name on html form
app.post('/api/upload', upload.single('file'), (req, res) => {  
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    if (req.file.mimetype !== 'application/json') {
        return res.status(400).send('Invalid file type. Only JSON files are allowed.');
    }

    const jsonData = JSON.parse(req.file.buffer.toString());
    res.render('index', { people: jsonData });
})

app.get('/', (req, res) => {

    res.render('index', {
        people: []
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})