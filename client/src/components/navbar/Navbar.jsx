import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
  const navigate=useNavigate();
  const handellogout=()=>{
dispatch({type:"LOGOUT"})
  }
const handelclick=(state)=>{
  navigate(`/${state}`)
}
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BookForMe</span>
        </Link>
        {user ?
        ( <div><span>{user.username}</span>
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
