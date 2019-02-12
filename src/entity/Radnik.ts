import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Sektor } from "./Sektor";

@Entity()
export class Radnik {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imePrezime: string;

    @Column()
    datumRodjenja: Date;

    @Column()
    pol: string;

    //moze i {lazy: true} onda je radnik.sektor promise
    //ako se ne stavi nista, mora u find-u za radnike da se stavi {relations: ["sektor"]}
    @ManyToOne(type => Sektor, sektor => sektor.radnici, {eager: true})
    sektor: Sektor;

}
