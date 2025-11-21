import { userRepository, AppDataSource } from '../config/data-source';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { Credential } from '../entities/Credential';
import { IUser } from '../interfaces/IUser';
import { createCredentialsService, validateCredentialsService } from './CredentialsService';
import { IResponseUserDTO } from '../dtos/IResponseUserDTO';


const userDB : IUser[] =[];
let usersId: number = 1;

// Implementar una función que pueda retornar el arreglo completo de usuarios
export const getAllUsersService = async (): Promise<User[]> => {
  const users = await userRepository.find();
  return users;
};

// Implementar una función que pueda retornar un usuario por id
export const getUserByIdService = async (id: number): Promise<User> => {
  const foundUser: User | null = await userRepository.findOne({
    where: {
       id,
       },
       relations:{
        appointments: true,
       },
  });

  if (!foundUser) {
    throw new Error("Usuario no encontrado");
  }

  return foundUser;
};


/**
 * Crear una función que reciba username y password y
 * cree un nuevo par de credenciales con estos datos
 * y lo almacene en el par de credenciales creado.
 */

export const createUserService = async (createUserDTO: ICreateUserDTO ): Promise<IResponseUserDTO> => {
  const resultUser: User = await AppDataSource.transaction(async (entityManager) => {
    const newCredentials: Credential = await createCredentialsService(
      entityManager,
      createUserDTO.username,
      createUserDTO.password
    );

    const newUser: User = entityManager.create(User, {
      name: createUserDTO.name,
      email: createUserDTO.email,
      birthdate: createUserDTO.birthdate,
      nDni: createUserDTO.nDni,
      credentials: newCredentials,
    });
    

    const results = await entityManager.save(User, newUser);
    return results;
  });

  return {
   id: resultUser.id,
    name: resultUser.name,
    email: resultUser.email,
    nDni: resultUser.nDni,
    birthdate: resultUser.birthdate, 
  };
};



export const loginUserService = async ( username: string,password: string): Promise<User> => {
  const credentialId = await validateCredentialsService(username, password);

  const foundUser: User | null = await userRepository.findOne({
    where: {
      credentials: {
        id: credentialId,
      },
    },
  });

  if (!foundUser) {
    throw new Error("Usuario no encontrado");
  }

  return foundUser;
};

