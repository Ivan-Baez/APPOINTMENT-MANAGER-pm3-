
export interface IUser {
  id: number; // id: ID numérico que identifica al usuario.
  name: string; // name: nombre completo del usuario.
  email: string; // email: dirección de email del usuario.
  birthdate: Date; // birthdate: fecha de nacimiento.
  nDni: number; // nDni: número de DNI o identificación.
  credentialsId: number; // credentialsId: ID de las credenciales del usuario.
}