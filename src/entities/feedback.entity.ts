/** @format */

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "feedback" })
export class FeedbackEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "firstname" })
  firstname: string;

  @Column({ name: "lastname" })
  lastname: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "message", type: "text" })
  message: string;

  @Column({ name: "sentiment", type: "enum", enum: ["good", "bad", "neutral"] })
  sentiment: string;

  // Many-to-one relationship with UserEntity
  @ManyToOne(() => UserEntity, (user) => user.uuid)
  user: UserEntity;
}
