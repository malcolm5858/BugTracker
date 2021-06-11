import { BaseEntity, ManyToOne } from "typeorm";
import { Project } from "./Project";
import { Tag } from "./Tag";

export class Bug extends BaseEntity {
  id: number;
  name: string;
  description: string;
  tags: Promise<Tag[]>;

  @ManyToOne(() => Project, (crp) => crp.bugs, { onDelete: "CASCADE" })
  project: Promise<Project[]>;
}
