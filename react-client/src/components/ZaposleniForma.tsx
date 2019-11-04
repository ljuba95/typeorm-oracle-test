import React, { Component, useState, useEffect } from 'react';
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

function ZaposleniForma(props: Props) {

    let [imePrezime, setImePrezime] = useState<string>('');
    let [datumRodjenja, setDatumRodjenja] = useState<Date | null>(null);
    let [pol, setPol] = useState<string>('M');
    let [sektor, setSektor] = useState<number>(0);

    const getDatumRodjenja = (datum: string) => {
        let date = datum.split('T');
        let split = date[0].split('-');
        return new Date(Number(split[0]),Number(split[1]) - 1, Number(split[2]));
    }

    useEffect(() => {
        if(props.selectedRow != null){
            let radnik: Radnik = props.zaposleni.find((zap: Radnik) => zap.id === props.selectedRow)!;
            setImePrezime(radnik.imePrezime);
            setDatumRodjenja(getDatumRodjenja(radnik.datumRodjenja));
            setPol(radnik.pol);
            setSektor(radnik.sektor);
        }
    },[props.selectedRow])
    
    const dateToYMD = (date: Date) => {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    const onAdd = async (e: any) => {
        e.preventDefault();
        if (imePrezime !== '' && datumRodjenja !== null && sektor != 0) {
            await props.onAdd(new Radnik(0,imePrezime, dateToYMD((datumRodjenja! as Date)), pol, Number(sektor) ));
        }
    }

    const onRemove = async (e: any) => {
        e.preventDefault();
        await props.onRemove();
    }

    const onUpdate = async (e: any) => {
        e.preventDefault();
        if (imePrezime !== '' && datumRodjenja !== null && sektor != 0) {
            await props.onUpdate(new Radnik(props.selectedRow!,imePrezime, dateToYMD((datumRodjenja as Date)), pol, Number(sektor) ));
        }
    }

    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label className="col-form-label">Ime i prezime</label>
                    <input type="text" className="form-control" name="imePrezime" value={imePrezime} onChange={(e) => setImePrezime(e.target.value)} />
                </div>
                <div className="form-group col-md-3">
                    <label className="col-form-label">Datum rodjenja</label>
                    <DatePicker
                        className="form-control"
                        selected={datumRodjenja}
                        onChange={(e) => setDatumRodjenja(e)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="form-group col-md-2">
                    <label className="col-form-label">Pol</label>
                    <select className="custom-select form-control" name="pol" value={pol} onChange={(e) => setPol(e.target.value)}>
                        <option value="M">Muski</option>
                        <option value="Z">Zenski</option>
                    </select>
                </div>
                <div className="form-group col-md-3">
                    <label className="col-form-label">Sektor</label>
                    <select className="custom-select form-control" name="sektor" value={sektor} onChange={(e) => setSektor(Number(e.target.value))}>
                        <option value="0">Izaberite sektor...</option>
                        {props.sektori.map(sektor => <option key={sektor.id} value={sektor.id}>{sektor.naziv}</option>)}
                    </select>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4">
                    <button id="btn-add" className="btn btn-primary" onClick={onAdd}><i className="fa fa-plus"></i> Dodaj</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-update" className="btn btn-success " disabled={props.selectedRow === null} onClick={onUpdate}><i className="fa fa-pencil"></i> Izmeni</button>
                </div>
                <div className="col-md-4">
                    <button id="btn-delete" className="btn btn-danger" disabled={props.selectedRow === null} onClick={onRemove}><i className="fa fa-times"></i> Obrisi</button>
                </div>
            </div>
        </form>
    );
}

export default ZaposleniForma;