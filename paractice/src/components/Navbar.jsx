
//Props ka through data pass kiya ha yaha
const Navbar = ({title,children}) => {
  return (
    <div className="navbar">
       <h1>{title}</h1>
       <div>
          {children}
       </div>
    </div>
  )
}

export default Navbar
