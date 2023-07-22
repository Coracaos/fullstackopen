import { useState, useEffect } from 'react';
import ContactSearcher from './component/ContactSearcher';
import ContactForm from './component/ContactForm';
import ContactList from './component/ContactList';
import Notification from './component/Notification';
import contactService from './service/contact';

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotifiaction] = useState(null);

  useEffect(() =>{
    contactService.getAll()
    .then(initialContacts => setContacts(initialContacts));
  },[]);

  const removeContact = (id, name) => {
    if(window.confirm(`delete ${name}`)){
      contactService.remove(id)
      .then( () => {
        setContacts(contacts.filter(c => c.id !== id));
      });
    }
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleAddContact = (event) => {
    event.preventDefault();
    const contact = contacts.find(c => c.name.toLowerCase() === newName.toLowerCase());
    if(contact){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === true){
        const modifiedContact = { ...contact, number: newNumber};
        contactService.update(modifiedContact.id, modifiedContact)
        .then(updatedContact => {
          setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
          setNewName('');
          setNewNumber('');
          setNotifiaction({message: `Changed ${updatedContact.name} number`, type: 'confirm'});
          setTimeout(() => {
            setNotifiaction(null);
          }, 4000);
        })
        .catch(error => {
          if(error.response.status === 404){
            setNotifiaction({message: `Information of ${newName} has already been removed from server`, type: 'error'});
            setContacts(contacts.filter(c => c.id !== contact.id));
            setTimeout(() => {
              setNotifiaction(null);
            }, 4000);
          }
        });
      } 
      setNewName('');
      setNewNumber('');
    }else{
      const addedContact = {name: newName, number: newNumber};
      contactService.create(addedContact)
      .then(createdContact => {
        setContacts(contacts.concat(createdContact));
        setNewName('');
        setNewNumber('');
        setNotifiaction({message: `Addded ${createdContact.name}`, type: 'confirm'});
        setTimeout(() => {
          setNotifiaction(null);
        }, 4000);
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notification} />
      <ContactSearcher filter={filter} onChangeFilter={handleChangeFilter}/>
      <h2>Add a new</h2>
      <ContactForm name={newName} number={newNumber} onChangeName={handleChangeName} onChangeNumber={handleChangeNumber} onAddContact={handleAddContact}/>
      <h2>Numbers</h2>
      <ContactList contacts={contacts} filter={filter} onDelete={removeContact}/>
    </div>
  ) 
}

export default App;
