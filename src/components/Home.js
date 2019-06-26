import React, { Component } from "react";
import api from "../Api";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      isLoandig: false
    };
  }
  componentDidMount() {
    this.setState({ isLoandig: true });
    api.loadGenres().then(res => {
      this.setState({
        isLoandig: false,
        genres: res.data
      });
    });
  }
  renderGenreLink(genre) {
    return (
      <span>
        &nbsp;<a href="">{genre}</a>&nbsp;
      </span>
    );
  }
  render() {
    return (
      <div>
        <section id="intro" className="intro-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>
                  <img src="images/logo.png" />
                </h1>
                <p>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          {this.state.isLoandig && <span>Aguarde, carregando...</span>}
          {!this.state.isLoandig && (
            <div>
              Ver séries do gênero:
              {this.state.genres.map(this.renderGenreLink)}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Home;
