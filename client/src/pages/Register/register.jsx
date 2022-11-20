import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
// impoer
const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    country: undefined,
    img: undefined,
    city: undefined,
    phone: undefined,
    isAdmin: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileUpload = async (e) => {
    const data = new FormData();
    const filename = Date.now() + e.target.files[0].name;
    data.append("name", filename);
    data.append("img", e.target.files[0]);
    try {
      // const pf=URL.createObjectURL(e.target.files[0]);
      // console.log(pf);
      await axios.post("/auth/upload", data);
      setCredentials((prev) => ({ ...prev, [e.target.id]: filename}));
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", credentials);
      // if(res.data._id){
      //   try {
      //     await axios.put("auth/register"+res.data._id,data)
      //   } catch (error) {
      // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      //   }
      // }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    if(!error) navigate("/login");
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
          <p>Are You and Admin ?</p>
          <input type="radio" id="isAdmin" name="isAdmin" value="No" /> {" "}
          <label htmlFor="html">No</label>
            <input type="radio" id="isAdmin" name="isAdmin" value="Yes" /> {" "}
          <label htmlFor="css">Yes</label>
        </div>

        <input
          type="file"
          placeholder="img"
          id="img"
          name="img"
          onChange={handleFileUpload}
          className="lInput"
        />
        <button
          disabled={loading}
          onClick={(e) => handleClick(e)}
          className="lButton"
        >
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
