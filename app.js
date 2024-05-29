const express = require('express');
const multer = require('multer')
const ejs = require('ejs')

const app = express()
const upload = multer({dest: 'uploads/'})

app.get('/', (req, res) => {
    res.send('Hello World')
})

//users multer middleware, before we run our logic multer runs its
//file == name on html form
app.post('/api/upload', upload.single('file'), (req, res) => {  
    res.send(req.file)
})


app.get('/', (req, res) => {
    res.render(index)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})