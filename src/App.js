import React, { Component } from 'react';
import './App.css';
import ContentLoader from 'react-content-loader';

const API = 'https://api.github.com/search/users?q=';
const DEFAULT_QUERY = 'stephen';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + DEFAULT_QUERY)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => this.setState({ items: data.items, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleClick(e) {
    e.preventDefault()
    let username = this.refs.search.getDOMNode().value
    this.props.fetch(API + username)
    this.refs.search.getDOMNode().value = ''
  }

  

  render() {

    const { items, isLoading, error } = this.state;

    if (error) {
      return <p className="text-center">{error.message}</p>;
    }

    if (isLoading) {
      return (
        <div className="container">
          <ContentLoader type="facebook" />
        </div>
      );
    }

    return (
      <div className="container-fluid">

      {/*Header Sections Starts Here*/}
        <header className="conatainer-fluid headercontent">
          <h1 className="text-center text-white">
            Welcome To Git Search User
          </h1>
        </header>

      {/* Search Content Starts here*/}
        <div className="container">
          <form onSubmit={this.handleClick.bind(this)} >
            <div className="input-group">
              <input type="search" className="form-control" placeholder="Search" ref="username"/>
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

      {/*Searched Items Dispalys Below*/}
        <div className="container">
          <div className="table-responsive">
          <table className="table">
          <thead>
            <tr>
              <th>Avatar Pic</th>
              <th>UserName</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
          {items.map(items =>
            <tr key={items.id}>
              <td>
                <a href={items.html_url}>
                  <image  src={items.avatar_url} className="img-responsive img-circle" width={50} height={50}/>
                </a>
              </td>
              <td>
                <a href={items.html_url}>{items.login}</a>
              </td>
              <td>
                <a href={items.followers_url}>{items.followers_url}</a>
              </td>
            </tr>
          )}
          </tbody>
          </table>
         </div>
        </div>

      </div>
    );
  }
}

export default App;
