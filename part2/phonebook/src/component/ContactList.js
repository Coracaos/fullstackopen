import Contact from './Contact';

const ContactList = (props) => {

  const showContacts = () => {
    return props.contacts.filter(c => props.filter === "" || c.name.toLowerCase().includes(props.filter.toLowerCase()))
                         .map(c => <Contact key={c.id} contact={c} onDelete={() => props.onDelete(c.id, c.name)}/>);
  }

  return (
    <div>
      {showContacts()}
    </div>
  )
}

export default ContactList;