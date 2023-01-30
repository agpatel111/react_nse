import React from "react";
import { Layout, Table, Tag, Breadcrumb, Button } from "antd";
import NseService from "../services/NseService";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import axios from "axios";
import { nse_api } from "../api/LocalApi";
import Sidebar from "./Sidebar";

const { Header } = Layout;
const { Content } = Layout;

const LiveNse = () => {
  const getLocalData = async (record) => {
    try {
      const article = {
        id: record.id,
        admin_call: true,
      };

      await axios({
        method: "put",
        url: nse_api,
        data: article,
      }).then((response) => {
        // console.log(response.data);
      });
    } catch (err) {
      console.log("Error ", err.response);
    }
  };

  const columns = [
    {
      title: "Id",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Base Strike Price",
      dataIndex: "base_strike_price",
      key: "base_strike_price",
    },
    {
      title: "Live Strike Price",
      dataIndex: "live_Strike_price",
      key: "live_Strike_price",
    },
    {
      title: "Buy Price",
      dataIndex: "buy_price",
      key: "buy_price",
      render: (text, record) => {
        return <Tag color={"processing"}>{text}</Tag>;
      },
    },
    {
      title: "Sell Price",
      dataIndex: "sell_price",
      key: "sell_price",
    },
    {
      title: "Stop Loseprice",
      dataIndex: "stop_loseprice",
      key: "stop_loseprice",
    },
    {
      title: "Live Brid Price",
      dataIndex: "live_brid_price",
      key: "live_brid_price",
    },
    {
      title: "Buy Time",
      dataIndex: "buy_time",
      key: "buy_time",
      render: (text, record) => {
        return moment(text).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return <Tag color={text === "BUY" ? "success" : "warning"}>{text}</Tag>;
      },
    },
    {
      title: "Profit %",
      dataIndex: "percentage",
      key: "percentage",
      render: (text, record) => {
        return text.profit_percentage;
      },
    },
    {
      title: "Loss %",
      dataIndex: "percentage",
      key: "percentage",
      render: (text, record) => {
        return text.loss_percentage;
      },
    },
    {
      title: "Option",
      dataIndex: "percentage",
      key: "percentage",
      render: (text, record) => {
        return text.option;
      },
    },
    {
      title: "Call",
      dataIndex: "call_put",
      key: "call_put",
    },
    {
      title: "Stock_Name",
      dataIndex: "stock_name",
      key: "stock_name",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <span>
            <Button
              type="primary"
              onClick={() => {
                getLocalData(record);
              }}
            >
              SELL
            </Button>
          </span>
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  // const [setting_data, setSetting_Data] = useState([])

  useEffect(() => {
    document.title = "Live Data";
    loadNse();
    const interval = setInterval(() => {
      loadNse();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadNse = () => {
    NseService.getNse().then((response) => {
      let buyData = response.data.data.filter((item) => {
        return window.location.pathname === "/admin-live"
          ? item.status === "BUY"
          : item.status === "SELL";
      });
      setData(buyData);
    });
  };
  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>

        <Layout>
          <Sidebar />

          <Layout
            style={{
              padding: "0 0 24px",
            }}
          >
            <Breadcrumb style={{ margin: "16px 30px" }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Live</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Table
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={data}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default LiveNse;
