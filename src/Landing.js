import React, { Component } from "react";
import axios from "axios";
import getKey from "./config/key";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  getResults(e) {
    e.preventDefault();
    const URL = getKey("URL");
    const token = getKey("Authorization");
    const params = {
      query: "tech"
    };
    axios
      .post(URL, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        }
      })
      .then(res => this.setState({ results: res.data.data }))
      .catch(err => console.log(err));
  }

  render() {
    let articles = this.state.results.slice();
    articles = articles.map(article => {
      return (
        <li className="articles" key={article.id}>
          <a href={article.url}>{article.title}</a>
        </li>
      );
    });
    return (
      <div>
        <button className="button" onClick={this.getResults.bind(this)}>
          Get News Articles
        </button>
        <ul className="article-container">{articles}</ul>
      </div>
    );
  }
}

export default Landing;
