import React from "react";
import {
  HistoryOutlined,
  StockOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

// const routes = [
//   {
//     path: "/admin/live-nse",
//   },
//   {
//     path: "/admin/history-nse",
//   },
//   {
//     path: "/admin/setting_nse",
//   },
// ];

// const menu = [
//   { key: 1, label: "Live", icon: <StockOutlined />, path: "/admin/live-nse" },
//   {
//     key: 2,
//     label: "History",
//     icon: <HistoryOutlined />,
//     path: "/admin/history-nse",
//   },
//   {
//     key: 3,
//     label: "Settings",
//     icon: <SettingOutlined />,
//     path: "/admin/setting_nse",
//   },
// ];

// const items = menu.map((item, index) => {
//   return {
//     key: index,
//     icon: item.icon,
//     label: item.label,
//     path: routes.path,
//   };
// });
// const navigate = useNavigate();

const Sidebar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <Sider
        width={200}
        className='site-layout-background'
        style={{
          height: "100%",
        }}
      >
        <Menu
          mode='inline'
          defaultSelectedKeys={["0"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "90vh",
            borderRight: 0,
          }}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            {
              //   key: 1,
              label: "Live",
              icon: <StockOutlined />,
              key: "/admin-live",
            },
            {
              //   key: 2,
              label: "History",
              icon: <HistoryOutlined />,
              key: "/admin-history",
            },
            {
              label: "Settings",
              icon: <SettingOutlined />,
              key: "/admin-settings",
            },
            {
              label: "Logout",
              icon: <LogoutOutlined />,
              key: "/",
              onClick: onLogout,
            },
          ]}
        ></Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
