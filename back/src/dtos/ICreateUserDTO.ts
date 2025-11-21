
export interface ICreateUserDTO{
  name: string; // name: nombre completo del usuario.
  email: string; // email: dirección de email del usuario.
  birthdate: Date; // birthdate: fecha de nacimiento.
  nDni: number; // nDni: número de DNI o identificación.
  username: string;
  password: string; // credentialsId: ID de las credenciales del usuario.
}