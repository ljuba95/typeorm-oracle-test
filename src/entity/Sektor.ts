import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Radnik } from "./Radnik";

@Entity()
export class Sektor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    naziv: string;

    @OneToMany(type => Radnik, radnik => radnik.sektor)
    radnici: Radnik[];
}
