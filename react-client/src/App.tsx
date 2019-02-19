import React, { Component } from 'react';
import './App.css';
import { Radnik } from './model/Radnik';
import Header from './components/Header';
import ZaposleniTabela from './components/ZaposleniTabela';
import ZaposleniForma from './components/ZaposleniForma';
import { Sektor } from './model/Sketor';

interface State {
  zaposleni: Radnik[];
  sektori: Sektor[];
}
class App extends Component<{}, State> {

  state = {
    zaposleni: [],
    sektori: []
  }

  async getZaposleni() {
    try {
      let res = await fetch("http://localhost:3000/radnik");
      this.setState({ zaposleni: await res.json() })
    } catch (e) {
      console.log(e);
    }
  }

  async getSektori() {
    try {
      let res = await fetch("http://localhost:3000/sektor");
      this.setState({ sektori: await res.json() })
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    await this.getZaposleni();
    await this.getSektori();
  }

  render() {
    return (
      <>
        <Header />
        <div className="container">
          <h1 className="display-4">Zaposleni</h1>
          <div className="row">
            <ZaposleniTabela zaposleni={this.state.zaposleni} />
          </div>
          <div className="row">
            <ZaposleniForma sektori={this.state.sektori}/>
          </div>
        </div>
      </>
    );
  }
}

export default App;
