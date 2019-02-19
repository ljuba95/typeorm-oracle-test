import { Sektor } from "./Sketor";


export class Radnik {

    id: number;

    imePrezime: string;

    datumRodjenja: string;

    pol: string;

    sektor: Sektor;

    constructor(id: number, imePrezime: string, datumRodjenja: string, pol: string, sektor: Sektor) {
        this.id = id;
        this.imePrezime = imePrezime;
        this.datumRodjenja = datumRodjenja;
        this.pol = pol;
        this.sektor = sektor;
    }
}