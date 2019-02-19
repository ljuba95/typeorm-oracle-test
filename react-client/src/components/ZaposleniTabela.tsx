import React, { Component } from 'react';
import { Radnik } from '../model/Radnik';

interface Props {
    zaposleni: Radnik[];
}
class ZaposleniTabela extends Component<Props> {

    getFormattedDatumRodjenja = (datum: string) => datum.split('T')[0];

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
                        <tr key={radnik.id} className="table-row">
                            <th scope="row">{radnik.id}</th>
                            <td>{radnik.imePrezime}</td>
                            <td>{this.getFormattedDatumRodjenja(radnik.datumRodjenja)}</td>
                            <td>{radnik.pol}</td>
                            <td>{radnik.sektor.naziv}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default ZaposleniTabela;