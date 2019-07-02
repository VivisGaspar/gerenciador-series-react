import React, { Component } from "react";
import api from "../Api";
import { Redirect } from "react-router-dom";

const stateuses = {
  warched: "Assistido",
  watching: "Assistindo",
  toWatch: "Assistir"
};

class EditSeries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      isLoandig: false,
      redirect: false,
      series: {}
    };
    this.saveSeries = this.saveSeries.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoandig: true });
    api.loadSeriesById(this.props.match.params.id).then(res => {
      this.setState({ series: res.data });
      this.refs.name.value = this.state.series.name;
      this.refs.genre.value = this.state.series.genre;
      this.refs.comments.value = this.state.series.comments;
      this.refs.status.value = this.state.series.status;
    });

    api.loadGenres().then(res => {
      this.setState({
        isLoandig: false,
        genres: res.data
      });
    });
  }

  saveSeries() {
    const newSeries = {
      id: this.props.match.params.id,
      name: this.refs.name.value,
      status: this.refs.status.value,
      genre: this.refs.genre.value,
      comments: this.refs.comments.value
    };
    api.updateSeries(newSeries).then(res => {
      this.setState({
        redirect: "/series/" + this.refs.genre.value
      });
    });
  }

  render() {
    return (
      <section className="intro-section">
        {this.state.redirect && <Redirect to={this.state.redirect} />}
        <h1>Editar série</h1>
        {/* <p>{JSON.stringify(this.state)}</p> */}
        <form>
          Nome:
          <input type="text" ref="name" className="form-control" />
          <br />
          Status:
          <select ref="status">
            {Object.keys(stateuses).map(Key => (
              <option key={Key} value={Key}>
                {stateuses[Key]}
              </option>
            ))}
          </select>
          <br />
          Genêro:
          <select ref="genre">
            {this.state.genres.map(Key => (
              <option key={Key} value={Key}>
                {Key}
              </option>
            ))}
          </select>
          <br />
          Comentário:
          <textarea ref="comments" className="form-control" />
          <br />
          <button type="button" onClick={this.saveSeries}>
            Salvar
          </button>
        </form>
      </section>
    );
  }
}

export default EditSeries;
