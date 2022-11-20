import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import img from "../../../../api/routes/images"
const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
  console.log(user);
  const navigate=useNavigate();
  const handellogout=()=>{
dispatch({type:"LOGOUT"})
  }
const handelclick=(state)=>{
  navigate(`/${state}`)
}
// const PF="http://localhost:8800/routes/images/1668950227620.jfif"
const PF="http://localhost:8800/routes/images/"
// http://localhost:8800/routes/images/1668950549058download%20(1).jfif
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BookForMe</span>
        </Link>
        {user ?
        ( <div className="personalDetails">
          {user ? (<img className="img" src={PF+user.img} alt="my pic"  />) :
        (<img src="" alt="my pic"  />)}
        <span>{user.username}</span>
        <button className="navButton" onClick={()=>handellogout("register")}>Logout</button></div>)
         : (
          <div className="navItems">
            <button className="navButton" onClick={()=>handelclick("register")}>Register</button>
            <button className="navButton" onClick={()=>handelclick("login")}>Login</button>
          </div>
        )}
        {/* {user && } */}
      </div>
    </div>
  );
};

export default Navbar;
