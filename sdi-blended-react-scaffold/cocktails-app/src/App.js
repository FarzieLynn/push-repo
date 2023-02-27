import React, { Component } from "react";
import DrinkList from "./Components/DrinkList";
import SearchBar from "./Components/Search";
// import Drinks from "./Drinks";
// import Favorites from "./Favorites";
// import Search from "./Search";

let url = `http://localhost:3001/`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkList: ["a", "b"],
      searchTerm: "",
      favorites: [],
      searchResults: [],
    };

    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  componentDidMount() {
    fetch(url)
      .then((res) => res.json())
      .then((drinkData) => {
        this.setState({ drinkList: drinkData.drinks });
      });
  }

  addFavorite(drinkId) {
    let { favorites } = this.state;
    if (!favorites.includes(drinkId)) {
      this.setState({ favorites: [...favorites, drinkId] });
    }
  }

  removeFavorite(drinkId) {
    let { favorites } = this.state;
    let newFavorites = favorites.filter((id) => id !== drinkId);
    this.setState({ favorites: newFavorites });
  }

  handleSearch() {
    let { searchTerm } = this.state;
    fetch(`${url}search/${searchTerm}`)
      .then((res) => res.json())
      .then((drinkData) => {
        this.setState({ searchResults: drinkData.drinks });
      });
  }
  handleSearchChange(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    let { drinkList, favorites, searchResults } = this.state;
    let { addFavorite, removeFavorite, handleSearch, handleSearchChange } =
      this;

    return (
      <div className="App">
        <header className="App-header">
          <SearchBar
            handleSearch={handleSearch}
            handleSearchChange={handleSearchChange}
          />
          SEARCH RESULTS:
          <DrinkList
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favoriteList={favorites}
            list={searchResults}
          />
          FULL DRINK LIST:
          <DrinkList
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favoriteList={favorites}
            list={drinkList}
          />
        </header>
      </div>
    );
  }
}
