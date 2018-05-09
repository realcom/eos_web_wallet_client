import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout, Select, message } from 'antd';

const { Header, Footer } = Layout;
const { Option } = Select;


const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="nav right-menus">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>
      </ul>
    );
  }
  return null;
};

const LoggedInView = (props) => {
  if (props.currentUser) {
    return (
      <ul className="nav right-menus">


        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.account}`}
            className="nav-link"
          >
            Welcome {props.currentUser.account}!
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};

@inject('userStore', 'commonStore')
@observer
class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
    this.selectServer = React.createRef();
  }
  handleChangeServer = (e) => {
    if (e === 'public') {
      message.error('Not yet implemented');
    }
  };


  render() {
    return (
      <Header className="header">
        <div className="logo">
          <Link to="/">
            <img
              src={require('./../assets/images/eos-logo.png')}
              alt="eos-logo"
            />
          </Link>
        </div>
        <div className="right-menu">
          <LoggedOutView currentUser={this.props.userStore.currentUser} />
          <LoggedInView currentUser={this.props.userStore.currentUser} />
          <Select
            className="select-server"
            defaultValue="gxc"
            style={{ width: 120 }}
            value="gxc"
            onChange={this.handleChangeServer}
          >
            <Option value="gxc">Decipher Testnet</Option>
            <Option value="public" onClick={this.showNowYet}>Public Testnet</Option>
          </Select>
        </div>
      </Header>
    );
  }
}

class CustomFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        EOS Web Wallet ©2018 Created by Decipher x GXC
      </Footer>
    );
  }
}

export {
  CustomHeader,
  CustomFooter,
};

