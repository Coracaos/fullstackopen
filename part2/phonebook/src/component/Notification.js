const Notification = ({data}) => {
  if (data == null){ 
    return null;
  }

  return (
    <div className='notification' style={{color: data.type === 'confirm' ? 'green' : 'red'}}>
      <em>{data.message}</em>
    </div>
  )
}

export default Notification;