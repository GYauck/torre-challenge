import axios from "axios";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate();
  const checkLogin = async () => {
    try {
      await axios.get("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/logout");
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogin;
  }, []);

  return (
    <div className="bg-lime-600 w-screen h-10 flex justify-evenly items-center">
        {token? (
            <>
            <NavLink to={"/favourites"}>
            FAVOURITES
            </NavLink>
          <button onClick={handleLogout} className="">
            LOGOUT
          </button>
          </>
        ) : (
            <NavLink to={"/login"}>
            LOG IN
            </NavLink>
        )}
      
    </div>
  );
};

export default Navbar;