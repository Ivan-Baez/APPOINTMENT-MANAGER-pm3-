import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);


  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const navigatePageTimeout = setTimeout(() => {
      clearInterval(countdownInterval);  
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(navigatePageTimeout);
    };
  }, [navigate]);

  return (
    <main>
      <h2>Ruta no encontrada</h2>
      <p>Vas a ser redirigido a la pagina principal en {countdown}</p>
    </main>
  );
};

export default PageNotFound;