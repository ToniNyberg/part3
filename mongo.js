const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://tonifullstack:${password}@cluster0.ngige.mongodb.net/phonebook-data?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
    name: `${name}`,
    number: `${number}`
})
if (name && number) {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person
        .find({})
        .then(persons => {
            console.log("phonebook:")
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}
