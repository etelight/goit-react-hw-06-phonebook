import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Contactslist } from './Contactslist/Contactslist';
import Section from './Section/Section';
import { useEffect, useState } from 'react';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const getContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return initialContacts;
};

export const App = () => {
  const [contacts, setContacts] = useState(getContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    if (
      contacts.find(
        contact =>
          contact.name === newContact.name ||
          contact.number === newContact.number
      )
    ) {
      return alert(`${newContact.name} is already in contacts`);
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const CangeFilter = evt => {
    const searchQuerry = evt.currentTarget.value;
    setFilter(searchQuerry);
  };

  const removeContact = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <Section title={'Contact Form'}>
        <ContactForm onAdd={addContact}></ContactForm>
      </Section>
      <Section title={'Contacts'}>
        <div>
          <Filter filter={filter} getContact={CangeFilter} />
        </div>
        <Contactslist
          filteredContacts={filteredContacts}
          removeContact={removeContact}
        />
      </Section>
    </>
  );
};
