const Contact = (props) => {
  return (
    <div>
      <p>{props.contact.name} {props.contact.number}</p>
      <button onClick={props.onDelete}>delete</button>
    </div>
  )
}

export default Contact;