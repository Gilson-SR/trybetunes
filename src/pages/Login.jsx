import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

export default class Login extends React.Component {
  state = {
    userName: '',
    loading: false,
    click: false,
  };

  handleClick = () => {
    const { userName } = this.state;
    this.setState({ click: true });
    this.setState({ loading: true }, async () => {
      await createUser({ name: userName });
      this.setState({ loading: false });
    });
  };

  render() {
    const { userName, loading, click } = this.state;
    const minimumCharacters = 3;
    return (
      <div data-testid="page-login">
        <label htmlFor="loginName">
          Login:
          <input
            type="text"
            name="user"
            id="loginName"
            data-testid="login-name-input"
            onChange={ ({ target: { value } }) => this.setState({ userName: value }) }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-button"
          onClick={ this.handleClick }
          disabled={ userName.length < minimumCharacters }
        >
          Entrar
        </button>
        {loading === true && (<Loading />)}
        {(!loading && click) && (<Redirect to="/search" />)}
      </div>
    );
  }
}
