require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()
var morgan = require('morgan')


app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const persons = response
    console.log(`Perosons: ${persons}`)
    // const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }else {
        response.status(404).end()
    }
    
})

app.get('/info', (request, response) => {
    let pLength = persons.length
    const now = new Date()
    let message = `Phonebook has info for ${pLength} people.
        ${now}`
    response.send(message)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    newId = Math.random() * 10000
    return newId
}

app.post('/api/persons', (request, response) => {
    
    const body = request.body

    const targetKey = 'name'
    const targetValue = body.name
    const foundObject = persons.find(person => person[targetKey] === targetValue)
    if (foundObject){
        return response.status(400).json({
            error: 'Name already included'
        })
    }

    if (!body.name) {
        return response.status(400).json({
        error: 'Missing Name'
        })
    }else if (!body.number) {
        return response.status(400).json({
            error: 'Missing Phone Number'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})