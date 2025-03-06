/** @format */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity({ name: "client" })
export class ClientEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "isSeller", type: "boolean" })
  isSeller: boolean;

  @Column({ name: "state", type: "text" })
  state: string;
}
