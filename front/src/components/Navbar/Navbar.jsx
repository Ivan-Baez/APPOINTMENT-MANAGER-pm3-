import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    const handleUserChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userchange", handleUserChange); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <h1>Turnos App</h1>
      <nav>
        <ul className={styles.navList}> 
          <li>
            <Link to='/'>Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to='/appointments'>Mis Turnos</Link>
              </li>
              <li> 
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <> 
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;