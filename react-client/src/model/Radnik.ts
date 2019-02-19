import { Sektor } from "./Sketor";


export class Radnik {

    id: number;

    imePrezime: string;

    datumRodjenja: string;

    pol: string;

    sektor: number;

    constructor(id: number, imePrezime: string, datumRodjenja: string, pol: string, sektor: number) {
        this.id = id;
        this.imePrezime = imePrezime;
        this.datumRodjenja = datumRodjenja;
        this.pol = pol;
        this.sektor = sektor;
    }
}