import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email:undefined,
    country:undefined,
    img:undefined,
    city:undefined,
    phone:undefined,
    isAdmin:undefined
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials);
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
   ! error && navigate("/login")
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
         <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
         <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
         <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="lInput"
        />
         
         <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="lInput"
        />
         <input
          type="number"
          placeholder="phone"
          id="phone"
          onChange={handleChange}
          className="lInput"
        />
        <div>
        <p>Are You and Admin ?</p><input type="radio" id="isAdmin" name="isAdmin" value="No" />
  <label htmlFor="html">No</label>
  <input type="radio" id="isAdmin" name="isAdmin" value="Yes"/>
  <label htmlFor="css">Yes</label>
</div>
        {/* <input
          type="radio"
          placeholder="isAdmin"
          id="isAdmin"
          onChange={handleChange}
          className="lInput"
        /> */}
        <input
          type="file"
          placeholder="img"
          id="img"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={(e)=>handleClick(e)} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
