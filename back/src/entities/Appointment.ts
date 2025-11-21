import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AppointmentStatus } from "../interfaces/IAppointment";
import { User } from "./User";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "varchar", length: 5, nullable: false })
  time: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  reason: string;

  @ManyToOne(() => User, user => user.appointments, { nullable: false })
  @JoinColumn({ name: "userId" }) // ✅ clave para que se guarde correctamente
  user: User;

  @Column({ type: "varchar", length: 9, nullable: false, default: "active" })
  status: AppointmentStatus;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}