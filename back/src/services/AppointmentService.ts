import { FindManyOptions } from "typeorm";
import { appointmentRepository } from "../config/data-source";
import { ICreateAppointmentDTO } from "../dtos/ICreateAppointmentDTO";
import { Appointment } from "../entities/Appointment";
import { AppointmentStatus, IAppointment } from "../interfaces/IAppointment";
import { getUserByIdService } from "./UserService";

// ✅ Obtener todos los turnos (opcionalmente filtrado por usuario)
export const getAllAppointmentsService = async (
  userId: number | null = null
): Promise<Appointment[]> => {
  const options: FindManyOptions<Appointment> = {
    relations: ["user"],
  };

  if (userId) {
    options.where = {
      user: {
        id: userId,
      },
    };
  }

  const appointments = await appointmentRepository.find(options);
  return appointments;
};

// ✅ Obtener turno por ID
export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
  const foundAppointment: Appointment | null = await appointmentRepository.findOne({
    where: { id },
    relations: ["user"],
  });

  if (!foundAppointment) {
    throw new Error("Turno no encontrado");
  }

  return foundAppointment;
};

// ✅ Crear nuevo turno con validación de hora, día y duplicados
export const createAppointmentService = async (
  createAppointmentDTO: ICreateAppointmentDTO
): Promise<Appointment> => {
  console.log("DTO recibido:", createAppointmentDTO);
  console.log("Hora recibida:", createAppointmentDTO.time);

  const horasValidas = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const horaRecortada = createAppointmentDTO.time?.slice(0, 5) ?? "";

  if (!horaRecortada) {
    throw new Error("Hora no recibida");
  }

  if (!horasValidas.includes(horaRecortada)) {
    throw new Error("Hora no válida");
  }

  // ⛔ Validación de día no hábil
  const fechaTurno = new Date(createAppointmentDTO.date);
  const diaSemana = fechaTurno.getDay(); // 0 = domingo, 6 = sábado
  console.log("🕓 Día recibido:", diaSemana);
  if (diaSemana === 0 || diaSemana === 6) {
    throw new Error("No se pueden agendar turnos los fines de semana");
  }

  const turnoExistente = await appointmentRepository.findOne({
    where: {
      date: createAppointmentDTO.date,
      time: horaRecortada,
      user: { id: createAppointmentDTO.userId },
    },
  });

  if (turnoExistente) {
    throw new Error("Ya existe un turno en ese horario");
  }

  const foundUser = await getUserByIdService(createAppointmentDTO.userId);
  console.log("Usuario encontrado:", foundUser);

  const newAppointment: Appointment = appointmentRepository.create({
    date: createAppointmentDTO.date,
    time: horaRecortada,
    user: foundUser,
    reason: "Reserva sin motivo",
    status: AppointmentStatus.ACTIVE,
  });

  const result = await appointmentRepository.save(newAppointment);
  return result;
};

// ✅ Cancelar turno por ID
export const cancelAppointmentService = async (id: number): Promise<number> => {
  const foundAppointment = await getAppointmentByIdService(id);

  if (foundAppointment.status === AppointmentStatus.CANCELLED) {
    throw new Error("El turno ya estaba cancelado");
  }

  foundAppointment.status = AppointmentStatus.CANCELLED;
  const results = await appointmentRepository.save(foundAppointment);

  return results.id;
};