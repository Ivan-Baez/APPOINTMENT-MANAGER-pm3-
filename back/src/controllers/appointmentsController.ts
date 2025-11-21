import type { Request, Response } from "express";
import {
  cancelAppointmentService,
  createAppointmentService,
  getAllAppointmentsService,
  getAppointmentByIdService
} from "../services/AppointmentService";

// GET /appointments - Obtener el listado de todos los turnos
export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointmentsService();
    return res.status(200).json(appointments);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};

// GET /appointments/:id - Obtener el detalle de un turno específico
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await getAppointmentByIdService(Number(appointmentId));
    return res.status(200).json(appointment);
  } catch (error: any) {
    if (error.message === "Turno no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// POST /appointments/schedule - Agendar un nuevo turno
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await createAppointmentService(req.body);
    return res.status(201).json(appointment);
  } catch (error: any) {
    if (error.message === "No hay turnos disponibles") {
      return res.status(404).json({
        message: error.message
      });
    }
    return res.status(400).json({
      message: error.message
    });
  }
};

// PUT /appointments/cancel/:id - Cancelar un turno
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await cancelAppointmentService(Number(appointmentId));
    return res.status(200).json(appointment);
  } catch (error: any) {
    if (error.message === "Turno no encontrado") {
      return res.status(404).json({
        message: error.message
      });
    }
    return res.status(400).json({
      message: error.message
    });
  }
};

export const getAppointmentsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const allAppointments = await getAllAppointmentsService();

    console.log("Turnos totales:", allAppointments);
    console.log("Buscando turnos del usuario con ID:", userId);

    const userAppointments = allAppointments.filter((a) => a.user?.id === userId);

    return res.status(200).json(userAppointments);
  } catch (error: any) {
    console.error("Error en getAppointmentsByUserId:", error);
    return res.status(500).json({ message: error.message });
  }
};