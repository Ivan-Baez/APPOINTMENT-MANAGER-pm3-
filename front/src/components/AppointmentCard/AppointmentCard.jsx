import axios from 'axios';
import styles from './AppointmentCard.module.css';

function AppointmentCard({ appointment, onCancel }) {
  const handleCancel = async () => {
    try {
      const appointmentDate = new Date(appointment.date);
      const currentDate = new Date();

      if (appointmentDate.getTime() <= currentDate.getTime()) {
        return alert("El turno se puede cancelar únicamente hasta el día anterior de la reserva");
      }

      await axios.put(`http://localhost:8080/appointments/cancel/${appointment.id}`);
      alert("Turno cancelado con éxito");
      onCancel(appointment.id);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al cancelar el turno");
    }
  };

  return (
    <div className={styles.appointmentCard}>
      <p>Date: <span>{appointment.date}</span></p>
      <p>Time: <span>{appointment.time}</span></p>
      <p>Status: <span>{appointment.status}</span></p>
      {appointment.status !== 'cancelled' && (
        <button onClick={handleCancel}>Cancelar</button>
      )}
    </div>
  );
}

export default AppointmentCard;