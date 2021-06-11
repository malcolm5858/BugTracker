import { BaseEntity } from "typeorm";

export class Tag extends BaseEntity {
  id: number;
  name: string;
  color: string;
  type: string;
}
