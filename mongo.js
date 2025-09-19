const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personToAdd = process.argv[3]
const newPhoneNumber = process.argv[4]

const url = `mongodb+srv://zeeglermusic:${password}@cluster0.vp4c8zn.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
    name: personToAdd,
    phone: newPhoneNumber
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})