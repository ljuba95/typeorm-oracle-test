import React, { Component } from 'react';
import { Sektor } from '../model/Sketor';
import DatePicker from "react-datepicker";
import { Radnik } from '../model/Radnik';

interface Props {
    sektori: Sektor[];
    zaposleni: Radnik[];
    selectedRow: number | null;
    onAdd: (zaposleni: Radnik) => Promise<any>;
    onUpdate: (zaposleni: Radnik) => Promise<any>;
    onRemove: () => Promise<any>;
}

interface State {
    radnikId: number;
    imePrezime: string;
    datumRodjenja: Date | null;
    pol: string;
    sektor: number;
}

class ZaposleniForma extends Component<Props, State> {

    state = {
        radnikId: 0,
        imePrezime: '',
        datumRodjenja: null,
        pol: 'M',
        sektor: 0
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        if(nextProps.selectedRow !== null && nextProps.selectedRow !== prevState.radnikId){
            let radnik: Radnik = nextProps.zaposleni.find((zap: Radnik) => zap.id === nextProps.selectedRow)!;
            return {
                radnikId: radnik.id,
                imePrezime: radnik.imePrezime,
                datumRodjenja: ZaposleniForma.getDatumRodjenja(radnik.datumRodjenja),
                pol: radnik.pol,
                sektor: radnik.sektor
            };
        } else {
            return prevState;
        }
    }

    static getDatumRodjenja = (datum: string) => {
        let date = datum.split('T');
        let split = date[0].split('-');
        return new Date(Number(split[0]),Number(split[1]) - 1, Number(split[2]));
    }

    handleDateChange = (e: any) => {
        this.setState({ datumRodjenja: e });
    }

    handleChange = (e: any) => {
        this.setState({ [e.target.name]: e.target.value } as any);
    }

    dateToYMD(date: Date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    onAdd = async (e: any) => {
        e.preventDefault();
        const { imePrezime, datumRodjenja, pol, sektor } = this.state;
        if (imePrezime !== '' && datumRodjenja !== null && sektor != 0) {
            await this.props.onAdd(new Radnik(0,imePrezime, this.dateToYMD((datumRodjenja as Date)), pol, Number(sektor) ));
        }
    }

    onRemove = async (e: any) => {
        e.preventDefault();
        await this.props.onRemove();
    }

    onUpdate = async (e: any) => {
        e.preventDefault();
        const { imePrezime, datumRodjenja, pol, sektor } = this.state;
        if (imePrezime !== '' && datumRodjenja !== null && sektor != 0) {
            await this.props.onUpdate(new Radnik(this.props.selectedRow!,imePrezime, this.dateToYMD((datumRodjenja as Date)), pol, Number(sektor) ));
        }
    }

    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Ime i prezime</label>
                        <input type="text" className="form-control" name="imePrezime" value={this.state.imePrezime} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <label className="col-form-label">Datum rodjenja</label>
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
                        <select className="custom-select form-control" name="pol" value={this.state.pol} onChange={this.handleChange}>
                            <option value="M">Muski</option>
                            <option value="Z">Zenski</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="col-form-label">Sektor</label>
                        <select className="custom-select form-control" name="sektor" value={this.state.sektor} onChange={this.handleChange}>
                            <option value="0">Izaberite sektor...</option>
                            {this.props.sektori.map(sektor => <option key={sektor.id} value={sektor.id}>{sektor.naziv}</option>)}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4">
                        <button id="btn-add" className="btn btn-primary" onClick={this.onAdd}><i className="fa fa-plus"></i> Dodaj</button>
                    </div>
                    <div className="col-md-4">
                        <button id="btn-update" className="btn btn-success " disabled={this.props.selectedRow === null} onClick={this.onUpdate}><i className="fa fa-pencil"></i> Izmeni</button>
                    </div>
                    <div className="col-md-4">
                        <button id="btn-delete" className="btn btn-danger" disabled={this.props.selectedRow === null} onClick={this.onRemove}><i className="fa fa-times"></i> Obrisi</button>
                    </div>

                </div>
            </form>
        );
    }
}

export default ZaposleniForma;