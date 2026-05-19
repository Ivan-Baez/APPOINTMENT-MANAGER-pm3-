import { useEffect, useState, useMemo } from "react";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import styles from "./MisTurnos.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MisTurnos() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ user estable, no se recalcula en cada render
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const getAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      // ✅ Ruta corregida: busca turnos por userId
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/appointments/user/${user.id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al pedir los turnos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = (appointment) => {
    setAppointments((prevState) => [...prevState, appointment]);
  };

  const handleCancelAppointment = () => {
    getAppointments();
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      getAppointments();
    }
  }, [navigate]); // ✅ user fuera del array

  return (
    <main className={styles.misTurnosContainer}>
      <h2>Formulario de reserva</h2>
      <AppointmentForm onAddAppointment={handleAddAppointment} />
      <h2>Mis Turnos</h2>
      <div className={styles.turnosList}>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          appointments.map((appoint) => (
            <AppointmentCard
              key={appoint.id}
              appointment={appoint}
              onCancel={handleCancelAppointment}
            />
          ))
        )}
        {error && <p>{error}</p>}
      </div>
    </main>
  );
}

export default MisTurnos;