import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateAppointment } from "../../helpers/validateAppointment";
import axios from "axios";
import styles from './appointmentForm.module.css';

function AppointmentForm({ onAddAppointment }) {
  const initialState = {
    date: "",
    time: "",
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("No hay usuario logueado");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/appointments/schedule",
        {
          ...values,
          userId: user.id,
        }
      );

      onAddAppointment(response.data);
      alert("Turno reservado");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar el formulario");
    }
  };

  const hours = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ];

  const today = new Date().toISOString().split("T")[0];

  return (
    <Formik
      initialValues={initialState}
      validate={validateAppointment}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={styles.appointmentForm}>
          <div className={styles.inputGroup}>
            <label>Fecha de reserva</label>
            <Field
              type="date"
              name="date"
              min={today}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const day = selectedDate.getDay(); // 0 = domingo, 6 = sábado
                if (day === 0 || day === 6) {
                  alert("No se pueden agendar turnos los fines de semana");
                  setTimeout(() => {
                    setFieldValue("date", "", true); // limpia y fuerza validación
                  }, 0);
                } else {
                  setFieldValue("date", e.target.value);
                }
              }}
            />
            <p>
              <ErrorMessage name="date" />
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label>Hora</label>
            <Field as="select" name="time">
              <option value="">Seleccionar hora</option>
              {hours.map((hour) => (
                <option value={hour} key={hour}>
                  {hour}
                </option>
              ))}
            </Field>
            <p>
              <ErrorMessage name="time" />
            </p>
          </div>

          <button type="submit">Reservar</button>
        </Form>
      )}
    </Formik>
  );
}

export default AppointmentForm;