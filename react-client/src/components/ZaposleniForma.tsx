import React, { Component } from 'react';
import { Sektor } from '../model/Sketor';
import DatePicker from "react-datepicker";

interface Props {
    sektori: Sektor[];
}

interface State {
    imePrezime: string;
    datumRodjenja: Date | null;
    pol: string;
    sektor: number;
}

class ZaposleniForma extends Component<Props, State> {

    state = {
        imePrezime: '',
        datumRodjenja: null,
        pol: 'M',
        sektor: 0
    }

    handleDateChange = (e: any) => {
        this.setState({ datumRodjenja: e });
    }

    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Ime i prezime</label>
                        <input type="text" className="form-control" name="imePrezime" value={this.state.imePrezime} />
                    </div>
                    <div className="form-group col-md-3">
                        <label className="col-form-label">Datum rodjenja</label>
                        {/* <input type="date" name="datumRodjenja" className="form-control" /> */}
                        <DatePicker
                            className="form-control"
                            selected={this.state.datumRodjenja}
                            onChange={this.handleDateChange}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Pol</label>
                        <select className="custom-select form-control" value={this.state.pol}>
                            <option value="M">Muski</option>
                            <option value="Z">Zenski</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="col-form-label">Sektor</label>
                        <select className="custom-select form-control" value={this.state.sektor}>
                            <option value="0">Izaberite sektor...</option>
                            {this.props.sektori.map(sektor => <option key={sektor.id} value={sektor.id}>{sektor.naziv}</option>)}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4">
                        <button id="btn-add" className="btn btn-primary"><i className="fa fa-plus"></i> Dodaj</button>
                    </div>
                    <div className="col-md-4">
                        <button id="btn-update" className="btn btn-success " disabled><i className="fa fa-pencil"></i> Izmeni</button>
                    </div>
                    <div className="col-md-4">
                        <button id="btn-delete" className="btn btn-danger" disabled><i className="fa fa-times"></i> Obrisi</button>
                    </div>

                </div>
            </form>
        );
    }
}

export default ZaposleniForma;