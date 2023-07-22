const ContactForm = (props) => {
  return (
    <form onSubmit={props.onAddContact}>
      <div>
        <div> name: <input value={props.name} onChange={props.onChangeName}/> </div>
        <div> number: <input value={props.number} onChange={props.onChangeNumber}/> </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default ContactForm;