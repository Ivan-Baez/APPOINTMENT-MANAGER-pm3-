export const validateRegister = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "El nombre es requerido";
  } else if (formData.name.length < 3) {
    errors.name = "El nombre tiene que tener 3 o mas caracteres";
  }

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

  if (!formData.nDni) {
    errors.nDni = "El numero de DNI es requerido";
  } else if (formData.nDni.length < 7 || formData.nDni.length > 8) {
    errors.nDni = "El numero de documento no es valido";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    errors.email = "El email es requerido";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Email invalido";
  }

if (!formData.birthdate) {
  errors.birthdate = "La fecha de nacimiento es requerida";
} else {
  const birthdate = new Date(formData.birthdate);
  const age = new Date().getFullYear() - birthdate.getFullYear();
  if (age < 18) {
    errors.birthdate = "Debe ser mayor de 18 años para registrarse en la app";
  }
}
  return errors;
};