/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import Write from '../../../../assets/logo/write.png';
import Bell from '../../../../assets/logo/bell.png';
import Pop from './popper.js';

const SubMenu = Menu.SubMenu;

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {//로그인 안됐을 때
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="intro">
          <Pop className="menu__Heart" />
        </Menu.Item>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {//로그인 됐을 때
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/travel/upload">
            <img
              src={Write}
              className="menu__Icon"
              alt="Upload"
            /></a>
        </Menu.Item>

        <Menu.Item key="intro">
          <Pop className="menu__Heart" />
        </Menu.Item>

        <SubMenu title={
          <img
            src={Bell}
            className="menu__Bell"
            alt="FeedBack"
          />}>
          <Menu.Item key="setting:1"><a href="https://forms.gle/oKWCo7gKkoHLxNrLA" target="_blank">신고</a></Menu.Item>
          <Menu.Item key="setting:2"> <a href="https://forms.gle/7ksfRdzD9dGVUA5B7" target="_blank">피드백</a></Menu.Item>
        </SubMenu>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

