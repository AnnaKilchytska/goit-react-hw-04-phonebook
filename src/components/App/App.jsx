import { nanoid } from 'nanoid';

import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from './App.module.css';

function App() {
  const contactList = [
    { id: 'id-1', nameInput: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', nameInput: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', nameInput: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', nameInput: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || contactList
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log(contacts);
  }, [contacts]);

  const addContact = contact => {
    if (contacts.some(item => item.nameInput === contact.nameInput)) {
      alert(`${contact.nameInput} is already in contact list!`);
      return;
    }

    contact.id = nanoid();

    console.log('contact on App', contact);
    setContacts([contact, ...contacts]);
  };

  const onFilterContacts = contacts => {
    console.log(contacts);
    return contacts.filter(contact => {
      console.log('on filter change', filter, contact);
      return contact.nameInput.toLowerCase().includes(filter?.toLowerCase());
    });
  };

  const changeFilter = e => {
    console.log(e.target.value);

    setFilter(e.target.value);
    console.log(filteredContacts);
  };

  const onDeleteContact = id => {
    console.log(id);
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = onFilterContacts(contacts);
  return (
    <div className={css.AppContainer}>
      <h1 className={css.AppTitle}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <Filter onChange={changeFilter} value={filter} />
      <ContactList contacts={filteredContacts} onDelete={onDeleteContact} />
    </div>
  );
}

export default App;
