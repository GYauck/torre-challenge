import axios from "axios";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

 /*  const checkLogin = async () => {
    try {
      await axios.get("https://torre-challenge-server-production.up.railway.app/api/users/me", {
        headers: { Authorization: `Bearer${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  }; */
  const handleLogout = async () => {
    try {
      await axios.post("https://torre-challenge-server-production.up.railway.app/api/users/logout");
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

 /*  useEffect(() => {
    checkLogin;
  }, []); */

  return (
    <div className="bg-lime-600 w-screen h-10 flex justify-evenly items-center">
      {token ? (
        <>
          <NavLink to={"/"}>HOME</NavLink>
          <NavLink to={"/favourites"}>FAVOURITES</NavLink>
          <button onClick={handleLogout} className="">
            LOGOUT
          </button>
        </>
      ) : (
        <NavLink to={"/login"}>LOG IN</NavLink>
      )}
    </div>
  );
};

export default Navbar;
