import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user)
  return (
    <Menu mode={props.mode}>

      <Menu.Item key="home">
        <span>
          <a href="/" className="head-example" style={{ marginRight: -22, color: '#000000' }}>
            <Icon type="home" style={{ fontSize: 30, marginBottom: 18 }} />
          </a>
        </span>
      </Menu.Item>

      <Menu.Item key="Follow">
        <span>
          <a href="/following" className="head-example" style={{ marginRight: -22, color: '#000000' }}>
            <Icon type="usergroup-add" style={{ fontSize: 30, marginBottom: 18 }} />
          </a>
        </span>
      </Menu.Item>

      <Menu.Item key="Follo">
        <a>Follow</a>
      </Menu.Item>

      <Menu.Item key="scrap" style={{ paddingBottom: 3 }}>
        <Badge count={user.userData && user.userData.scrap && user.userData.scrap.length}>
          <a href="/user/scrap" className="head-example" style={{ marginRight: -22, color: '#000000' }} >
            <Icon type="pushpin" style={{ fontSize: 30, marginBottom: 3 }} />
          </a>
        </Badge>
      </Menu.Item>


    </Menu>
  )
}

export default LeftMenu