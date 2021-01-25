import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user)
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <span>
          <a href="/" className="head-example" style={{ marginRight: -22, color: '#000000' }}>
            <Icon type="home" style={{ fontSize: 30, marginBottom: 18 }} />
          </a>
        </span>
      </Menu.Item>
      <SubMenu title={<span>Blogs</span>}>
        <MenuItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>

      <Menu.Item key="scrap" style={{ paddingBottom: 3 }}>
        <Badge count={user.userData && user.userData.scrap.length}>
          <a href="/user/scrap" className="head-example" style={{ marginRight: -22, color: '#000000' }} >
            <Icon type="pushpin" style={{ fontSize: 30, marginBottom: 3 }} />
          </a>
        </Badge>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu