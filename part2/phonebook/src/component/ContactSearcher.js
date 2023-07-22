const ContactSearcher = (props) => {
  return (
    <div>
      filter shown with <input value={props.filter} onChange={props.onChangeFilter}/>
    </div> 
  )
}

export default ContactSearcher;
