import React, { Component } from 'react';
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
class App extends Component<{}, State> {

  state = {
    zaposleni: [],
    sektori: [],
    selectedRow: null,
    error: ''
  }

  async getZaposleni() {
    try {
      this.setState({zaposleni: await getAllZaposleni()});
    } catch (e) {
      console.log(e);
    }
  }

  async getSektori() {
    try {
      this.setState({sektori: await getAllSektor()});
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    await this.getZaposleni();
    await this.getSektori();
  }

  setSelectedRow = (id: number|null) => this.setState({selectedRow: id});

  onAdd = async (zaposleni: Radnik) => {
    try {
      let res = await addZaposleni(zaposleni);
      if(res.error) this.setState({error: res.error});
      else this.setState({zaposleni: [...this.state.zaposleni, {...res, sektor: res.sektor.id}]});
    } catch(e) {
      this.setState({error: "Network error"});
    }
  }

  onRemove = async () => {
    try {
      const radnikId = this.state.selectedRow!;
      await removeZaposleni(radnikId);
      this.setState({
        zaposleni: this.state.zaposleni.filter((zap: Radnik) => zap.id !== radnikId),
        selectedRow: null
      });
    } catch(e) {
      this.setState({error: "Network error"});
    }
  }

  onUpdate = async (zaposleni: Radnik) => {
    try {
      let res = await updateZaposleni(zaposleni);
      if(res.error) this.setState({error: res.error});
      else this.setState({zaposleni: this.state.zaposleni.map((zap: Radnik) => zap.id === zaposleni.id ? zaposleni : zap)});
    } catch(e) {
      this.setState({error: "Network error"});
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <h1 className="display-4">Zaposleni</h1>
          <div className="row">
            {this.state.error && <h1>{this.state.error}</h1>}
            <ZaposleniTabela 
              zaposleni={this.state.zaposleni}
              sektori={this.state.sektori}
              selectedRow={this.state.selectedRow}
              setSelectedRow={this.setSelectedRow}
            />
          </div>
          <div className="row">
            <ZaposleniForma 
              sektori={this.state.sektori}
              zaposleni={this.state.zaposleni}
              selectedRow={this.state.selectedRow}
              onAdd={this.onAdd}
              onUpdate={this.onUpdate}
              onRemove={this.onRemove}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
