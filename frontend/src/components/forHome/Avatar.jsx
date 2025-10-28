const Avatar = ({ avatar }) => {
  return(
    <div>
      <img src={`data:image/png;base64,${avatar}`} />
    </div>
  ) 
}

export default Avatar