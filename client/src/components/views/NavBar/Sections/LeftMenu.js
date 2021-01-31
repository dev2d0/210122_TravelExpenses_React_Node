import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { useSelector } from "react-redux";
import Bell from '../../../../assets/logo/bell.png';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user)
  return (
    <Menu mode={props.mode}>

      <Menu.Item key="home">
        <a href="/" style={{ color: '#000000' }} >
          <Icon type="home" style={{ fontSize: 30 }} className="menu_Left_Icon" />
        </a>
      </Menu.Item>

      <Menu.Item key="Follow">
        <a href="/following" style={{ color: '#000000' }} >
          <Icon type="usergroup-add" style={{ fontSize: 30 }} className="menu_Left_Icon" />
        </a>
      </Menu.Item>

      <Menu.Item key="scrap">
        <Badge count={user.userData && user.userData.scrap && user.userData.scrap.length}>
          <a href="/user/scrap" style={{ marginRight: -22, color: '#000000' }} >
            <Icon type="pushpin" style={{ fontSize: 30 }} className="menu_Left_Icon" />
          </a>
        </Badge>
      </Menu.Item>

    </Menu>
  )
}

export default LeftMenu