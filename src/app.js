const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('dotenv').config()
require('./db/mongoose')
const Notes = require('./notes')


const pubdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const port = process.env.PORT || 3002

const app = express()

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubdir))

app.use(express.json())

app.get('/', (req,res)=> {
    res.render('index', {
        title: 'NOTES',
        description: 'Choose what you want to do with your notes!'
    })
})

app.get('/add', (req,res)=> {
    res.render('add', {
        title: 'ADD',
        description: 'Write the title and body of the note you want to add!'
    })
})

app.post('/add', async (req, res) => {
    const notes = new Notes(req.body)

    try {
        await notes.save()
        res.status(201).send(notes)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.get('/remove', (req,res)=> {
    res.render('remove', {
        title: 'REMOVE',
        description: 'Write the title of the note you want to remove!'
    })
})

app.get('/remove/:title', async (req, res) => {
    const title = req.params.title
    try {
        const note = await Notes.findOneAndDelete({title})

        if(!note) {
            //return res.status(404).send()
            res.render('remove', {
                title: 'REMOVE',
                description: 'Write the title of the note you want to remove!',
                details: 'Cannot find your note!'
            })
        }
        //res.send(note)
        res.render('remove', {
            title: 'REMOVE',
            description: 'Write the title of the note you want to remove!',
            details: 'Note removed..',
            note: "Title: " + note.title,
            body: note.body
        })
    } catch(e) {
        //res.status(500).send()
        res.render('remove', {
            title: 'REMOVE',
            description: 'Write the title of the note you want to remove!',
            details: 'Server error...'
        })
    }
})

app.get('/list', async (req, res) => {
    try {
        const notes = await Notes.find({})
        const titles = notes.reduce((combine, note) => {
            combine.push(note.title)
            return combine
        },[])
        //res.send(titles)
        res.render('list', {
                    title: 'LIST',
                    description: 'Here is a list of your notes!',
                    details: titles
                })
    } catch (error) {
        //res.status(500).send(error)
        res.render('list', {
            title: 'LIST',
            description: 'Here is a list of your notes!',
            details: 'Cant list!'
        })
    }
})


app.get('/read', (req,res)=> {
    res.render('read', {
        title: 'READ',
        description: 'Write the title of the note you want to read!'
    })
})

app.get('/read/:title', async (req, res) => {
    const title = req.params.title
    //console.log(title)
    try {
        const note = await Notes.findOne({title})

        if(!note) {
            //return res.status(404).send()
            res.render('read', {
                title: 'READ',
                description: 'Write the title of the note you want to read!',
                details: 'Cannot find your note!'
            })
        }
        //res.send(note.body)
        res.render('read', {
            title: 'READ',
            description: 'Write the title of the note you want to read!',
            details: 'Title: ' + title,
            body: note.body
        })
    } catch (error) {
        //res.status(500).send()
        res.render('read', {
            title: 'READ',
            description: 'Write the title of the note you want to read!',
            details: 'Server error...'
        })
    }
})


app.listen(port, () => {
    console.log('Server is up on port '+ port)
})