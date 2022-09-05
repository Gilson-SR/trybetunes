import React from 'react';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  state = {
    user: {},
    loading: false,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = () => {
    this.setState({ loading: true }, async () => {
      const request = await getUser();
      this.setState({ loading: false, user: request });
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">{user.name}</p>
        )}
      </header>
    );
  }
}
