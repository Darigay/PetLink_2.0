import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../../utils/queries";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import FriendList from "../FriendList";

const Sider = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const Sidebar = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const loggedIn = Auth.loggedIn();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 25,
          top: 110,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <FriendList
          username={userData.me.username}
          friendCount={userData.me.friendCount}
          friends={userData.me.friends}
        />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
