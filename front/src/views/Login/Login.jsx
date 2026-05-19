import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateLogin } from "../../helpers/validateLogin";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      // ✅ URL corregida: usa la variable de entorno
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        values
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("userchange"));
      navigate("/");
      alert("Logeo exitoso");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar el formulario");
    }
  };

  return (
    <main className={styles.loginContainer}>
      <h2>Login</h2>
      <Formik
        initialValues={initialState}
        validate={validateLogin}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={styles.inputGroup}>
            <label>Nombre de usuario</label>
            <Field type="text" name="username" />
            <p>
              <ErrorMessage name="username" />
            </p>
          </div>
          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <Field type="password" name="password" />
            <p>
              <ErrorMessage name="password" />
            </p>
          </div>
          <button type="submit">Enviar</button>
        </Form>
      </Formik>
    </main>
  );
}

export default Login;
