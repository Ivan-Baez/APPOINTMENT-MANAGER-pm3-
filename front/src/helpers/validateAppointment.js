export const validateAppointment = (formData) => {
  const errors = {};

  if (!formData.date) {
    errors.date = "La fecha es requerida";
  }

  if (!formData.time) {
    errors.time = "La hora es requerida";
  }

  return errors;
};