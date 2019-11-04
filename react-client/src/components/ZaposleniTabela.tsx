import React, { Component } from 'react';
import { Radnik } from '../model/Radnik';
import { Sektor } from '../model/Sketor';

interface Props {
    zaposleni: Radnik[];
    sektori: Sektor[];
    selectedRow: number|null;
    setSelectedRow: (id: number|null) => any;
}

function ZaposleniTabela(props: Props) {

    const getFormattedDatumRodjenja = (datum: string) => datum.split('T')[0];

    const setSelectedRow = (id: number) => {
        if (props.selectedRow === id) props.setSelectedRow(null);
        else props.setSelectedRow(id);
    }

    const getNazivSektora = (id: number) => {
        let sektor = props.sektori.find(sektor => sektor.id === id);
        return sektor ? sektor.naziv : '';
    }

    return (
        <table className="table table-hover">
            <thead className="thead-inverse">
                <tr>
                    <th>#</th>
                    <th>Ime i prezime</th>
                    <th>Datum rodjenja</th>
                    <th>Pol</th>
                    <th>Sektor</th>
                </tr>
            </thead>
            <tbody id="table-body">
                {props.zaposleni.map(radnik => (
                    <tr key={radnik.id} className="table-row" style={props.selectedRow === radnik.id ? {backgroundColor: "#BEB5B5"} : {}} onClick={() => setSelectedRow(radnik.id)}>
                        <th scope="row">{radnik.id}</th>
                        <td>{radnik.imePrezime}</td>
                        <td>{getFormattedDatumRodjenja(radnik.datumRodjenja)}</td>
                        <td>{radnik.pol}</td>
                        <td>{getNazivSektora(radnik.sektor)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
}

export default ZaposleniTabela;