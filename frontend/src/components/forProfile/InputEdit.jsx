const InputEdit = ({ ref, type, placeholder, value }) => {
  return(
    <div>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

export default InputEdit