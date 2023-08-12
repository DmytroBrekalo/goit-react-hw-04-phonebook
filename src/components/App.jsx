import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import style from './App.module.css';

const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(
        () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
    );

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export const App = () => {
    const [contacts, setContacts] = useLocalStorage(
        'contacts',
        defaultContacts
    );
    const [filter, setFilter] = useState('');

    const addPerson = data => {
        const person = {
            id: nanoid(),
            name: data.name,
            number: data.number,
        };
        checkForDuplicates(person)
            ? alert(`${person.name} is already in contacts`)
            : setContacts(prevState => [person, ...prevState]);
    };

    const checkForDuplicates = person =>
        contacts.some(
            contact => contact.name.toLowerCase() === person.name.toLowerCase()
        );

    const deletePerson = personId => {
        setContacts(contacts.filter(contact => contact.id !== personId));
    };

    const changeFilter = event => {
        setFilter(event.currentTarget.value);
    };

    const getFilteredPerson = () => {
        const normalisedFilter = filter.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalisedFilter)
        );
    };

    return (
        <div className={style.main_section}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addPerson} />

            <h2>Contacts</h2>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList
                data={getFilteredPerson()}
                onDeletePerson={deletePerson}
            />
        </div>
    );
};