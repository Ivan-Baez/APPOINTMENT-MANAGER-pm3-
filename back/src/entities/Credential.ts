
import { Column, CreateDateColumn,Entity,OneToOne,PrimaryGeneratedColumn,UpdateDateColumn} from "typeorm";
import { User } from "./User";

@Entity({
     name: "credentials" })
export class Credential {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ 
    type: "varchar", length: 100, nullable: false ,unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255,nullable:false })
  password!: string;

  @OneToOne(() => User)
  user: User ;




  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
  

} 