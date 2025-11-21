import axios from "axios";
import { useState } from "react";
import { validateRegister } from "../../helpers/validateRegister";
import styles from "./Register.module.css";
function Register() {
  const initialState = {
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const errorMessages = validateRegister(form);

      if (Object.keys(errorMessages).length) {
        setErrors(errorMessages);
        return alert("Hay errores en el formulario");
      }

      const response = await axios.post("http://localhost:8080/users/register",form);
      console.log(response.data);
      setErrors(initialState);
      alert("Usuario registrado con éxito");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar el formulario");
    }
  };

  return (
    <main className={styles.registerContainer}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={styles.inputGroup} >
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={form.email}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="birthdate"
            onChange={handleChange}
            value={form.birthdate}
          />
          {errors.birthdate && <p>{errors.birthdate}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Número de documento</label>
          <input
            type="number"
            name="nDni"
            onChange={handleChange}
            value={form.nDni}
          />
          {errors.nDni && <p>{errors.nDni}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={form.username}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button>Enviar</button>
      </form>
    </main>
  );
}

export default Register;