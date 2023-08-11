import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import style from './App.module.css';

export class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    componentDidMount() {
        const localContacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(localContacts);
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }
    componentDidUpdate(prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }

    addPerson = data => {
        const person = {
            id: nanoid(),
            name: data.name,
            number: data.number,
        };
        this.checkForDuplicates(person)
            ? alert(`${person.name} is already in contacts`)
            : this.setState(prevState => ({
                contacts: [person, ...prevState.contacts],
            }));
    };

    checkForDuplicates = person =>
        this.state.contacts.some(
            contact => contact.name.toLowerCase() === person.name.toLowerCase()
        );

    deletePerson = personId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== personId),
        }));
    };

    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    getFilteredPerson = () => {
        const normalisedFilter = this.state.filter.toLowerCase();

        return this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalisedFilter)
        );
    };

    render() {
        const { filter } = this.state;
        const filteredPerson = this.getFilteredPerson();
        return (
            <div className={style.main_section}>
                <h1>Phonebook</h1>
                <ContactForm onSubmit={this.addPerson} />

                <h2>Contacts</h2>
                <Filter value={filter} onChange={this.changeFilter} />
                <ContactList data={filteredPerson} onDeletePerson={this.deletePerson} />
            </div>
        );
    }
}