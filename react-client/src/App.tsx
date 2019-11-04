import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { Radnik } from './model/Radnik';
import Header from './components/Header';
import ZaposleniTabela from './components/ZaposleniTabela';
import ZaposleniForma from './components/ZaposleniForma';
import { Sektor } from './model/Sketor';
import { getAllZaposleni, getAllSektor, addZaposleni, removeZaposleni, updateZaposleni } from './service/api';

interface State {
  zaposleni: Radnik[];
  sektori: Sektor[];
  selectedRow: number | null;
  error: string;
}

function App() {

  let [zaposleni, setZaposleni] = useState<Radnik[]>([]);
  let [sektori, setSektori] = useState([]);
  let [selectedRow, setSelectedRow] = useState<number | null>(null);
  let [error, setError] = useState('');

  const getZaposleni = async () => {
    try {
      setZaposleni(await getAllZaposleni());
    } catch (e) {
      console.log(e);
    }
  }

  const getSektori = async () => {
    try {
      setSektori(await getAllSektor());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async function() {
      await getZaposleni();
      await getSektori();
    })();
  },[]);


  // const setSelectedRow = (id: number|null) => this.setState({selectedRow: id});

  const onAdd = async (radnik: Radnik) => {
    try {
      let res = await addZaposleni(radnik);
      if(res.error) setError(res.error);
      else setZaposleni([...zaposleni, {...res, sektor: res.sektor.id}]);
    } catch(e) {
      setError("Network error");
    }
  }

  const onRemove = async () => {
    try {
      const radnikId = selectedRow!;
      await removeZaposleni(radnikId);
      setZaposleni(zaposleni.filter((zap: Radnik) => zap.id !== radnikId));
      setSelectedRow(null);
    } catch(e) {
      setError("Network error");
    }
  }

  const onUpdate = async (radnik: Radnik) => {
    try {
      let res = await updateZaposleni(radnik);
      if(res.error) setError(res.error);
      else setZaposleni(zaposleni.map((zap: Radnik) => zap.id === radnik.id ? radnik : zap));
    } catch(e) {
      setError("Network error");
    }
  }

    return (
      <>
        <Header />
        <div className="container">
          <h1 className="display-4">Zaposleni</h1>
          <div className="row">
            {error && <h1>{error}</h1>}
            <ZaposleniTabela 
              zaposleni={zaposleni}
              sektori={sektori}
              selectedRow={selectedRow}
              setSelectedRow={(id) => setSelectedRow(id)}
            />
          </div>
          <div className="row">
            <ZaposleniForma 
              sektori={sektori}
              zaposleni={zaposleni}
              selectedRow={selectedRow}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          </div>
        </div>
      </>
    );
}

export default App;
