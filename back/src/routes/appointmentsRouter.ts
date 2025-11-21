import { Router } from "express";

import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  cancelAppointment,
  getAppointmentsByUserId // ✅ nuevo
} from "../controllers/appointmentsController";

const appointmentsRouter = Router();

// ✅ NUEVA RUTA: Obtener todos los turnos de un usuario
appointmentsRouter.get("/user/:userId", getAppointmentsByUserId);

// GET /appointments -> Obtener el listado de todos los turnos
appointmentsRouter.get("/", getAllAppointments);

// GET /appointments/:id -> Obtener el detalle de un turno específico
appointmentsRouter.get("/:id", getAppointmentById);

// POST /appointments/schedule -> Agendar un nuevo turno
appointmentsRouter.post("/schedule", createAppointment);

// PUT /appointments/:id/cancel -> Cambiar el estatus de un turno a "cancelado"
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;