import { Radnik } from "../model/Radnik";

const baseUrl = "http://localhost:8080/FpisAplikacijaWS";

export async function getAllZaposleni() {
    let res = await fetch(baseUrl + "/radnik");
    let zaposleni = await res.json();
    return zaposleni.map((zap: any) => ({...zap, sektor: zap.sektor.id}));
}

export async function getAllSektor() {
    let res = await fetch(baseUrl + "/sektor");
    return await res.json();
}

export async function addZaposleni(zaposleni: Radnik) {
    let { id, ...zap } = zaposleni;
    let res = await fetch(baseUrl + "/radnik", {
        method: 'POST',
        body: JSON.stringify(zap),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export async function updateZaposleni(zaposleni: Radnik) {
    let { id, ...zap } = zaposleni;
    let res = await fetch(baseUrl + `/radnik/${id}`, {
        method: 'PUT',
        body: JSON.stringify(zap),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

export async function removeZaposleni(id: number) {
    let res = await fetch(baseUrl + `/radnik/${id}`, {
        method: 'DELETE'
    });
}