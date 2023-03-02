const express = require('express');
const {v4: uuidv4} = require('uuid');
const {format} = require('date-fns');

const contactsDB = [
    {
        body: '',
        createdAt: '2.3.2023',
        id: 1,
        isDone: true,
    },
];

class ContactsDB {
    constructor(arr) {
        this.contacts = [...arr];
    }

    createContact(newContact) {
        this.contacts.push({...newContact, id: uuidv4(), idDone: true});
        return this.contacts[this.contacts.length - 1];
    }

    getContacts() {
        return [...this.contacts];
    }
}

const ContactsDBinstance = new ContactsDB(contactsDB);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
    console.log(contactsDB);
});

app.get('/contacts', (req, res) => {
    const contacts = ContactsDBinstance.getContacts();
    res.status(200).send(contacts);
});

app.post('/contacts', (req, res) => {
    const Contact = ContactsDBinstance.createContact(req.body);
    res.status(201).send(Contact);
});

module.exports = app;