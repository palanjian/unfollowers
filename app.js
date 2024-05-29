const express = require('express');
const multer = require('multer')
const ejs = require('ejs')
const path = require('path');

const app = express()
const upload = multer({dest: 'uploads/'})

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//users multer middleware, before we run our logic multer runs its
//file == name on html form
app.post('/api/upload', upload.single('file'), (req, res) => {  
    res.render('index', { fileinfo: `Name of file: ${req.file.filename}` })
})

app.get('/', (req, res) => {
    res.render('index', { fileinfo: null})
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})