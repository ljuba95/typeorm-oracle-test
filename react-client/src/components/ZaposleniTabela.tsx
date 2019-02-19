import React, { Component } from 'react';
import { Radnik } from '../model/Radnik';
import { Sektor } from '../model/Sketor';

interface Props {
    zaposleni: Radnik[];
    sektori: Sektor[];
    selectedRow: number|null;
    setSelectedRow: (id: number|null) => any;
} 
class ZaposleniTabela extends Component<Props> {

    getFormattedDatumRodjenja = (datum: string) => datum.split('T')[0];

    setSelectedRow = (id: number) => {
        if (this.props.selectedRow === id) this.props.setSelectedRow(null);
        else this.props.setSelectedRow(id);
    }

    getNazivSektora = (id: number) => {
        let sektor = this.props.sektori.find(sektor => sektor.id === id);
        return sektor ? sektor.naziv : '';
    }

    render() {
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
                    {this.props.zaposleni.map(radnik => (
                        <tr key={radnik.id} className="table-row" style={this.props.selectedRow === radnik.id ? {backgroundColor: "#BEB5B5"} : {}} onClick={() => this.setSelectedRow(radnik.id)}>
                            <th scope="row">{radnik.id}</th>
                            <td>{radnik.imePrezime}</td>
                            <td>{this.getFormattedDatumRodjenja(radnik.datumRodjenja)}</td>
                            <td>{radnik.pol}</td>
                            <td>{this.getNazivSektora(radnik.sektor)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default ZaposleniTabela;