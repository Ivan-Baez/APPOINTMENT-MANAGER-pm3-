import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credential";
import { credentialRepository } from "../config/data-source";
import bcrypt from "bcryptjs";

// Crear un nuevo par de credenciales en la base de datos
export const createCredentialsService = async (
  entityManager: EntityManager,
  username: string,
  password: string
): Promise<Credential> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newCredentials: Credential = entityManager.create(Credential, {
    username,
    password: hashedPassword, // ✅ Guardamos el hash, no el texto plano
  });

  const results = await entityManager.save(Credential, newCredentials);
  return results;
};

/**
 * Valida las credenciales y retorna el ID si son correctas.
 * Lanza error si el username no existe o la contraseña es incorrecta.
 */
export const validateCredentialsService = async (
  username: string,
  password: string
): Promise<number> => {
  const foundCredentials: Credential | null = await credentialRepository.findOne({
    where: { username },
  });

  if (!foundCredentials) {
    throw new Error("No existe el username");
  }

  const isValid = await bcrypt.compare(password, foundCredentials.password);

  if (!isValid) {
    throw new Error("Contraseña incorrecta");
  }

  return foundCredentials.id;
};
