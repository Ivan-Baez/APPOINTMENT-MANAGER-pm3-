export const validateLogin = (formData) => {
  const errors = {};



  if (!formData.username) {
    errors.username = "El username es requerido";
  } else if (formData.username.length < 3) {
    errors.username = "El username tiene que tener 3 o mas caracteres";
  }

  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña tiene que tener 8 o mas caracteres";
  }

  return errors;
};