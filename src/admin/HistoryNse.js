import React from "react";
import { Layout, Table, Tag, Breadcrumb, Input } from "antd";
import NseService from "../services/NseService";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import Sidebar from "./Sidebar";
import { Component } from 'react'
import { nse_api } from "../api/LocalApi";

import { DatePicker, Space } from 'antd';
import axios from "axios";
const { Header } = Layout;
const { Content } = Layout;
const { Search } = Input;

const HistoryData = () => {
  const [dateseach, setDateseach] = useState([]);

  const onChange = async (date, dateString) => {
    // if (!date) {
    //   await axios.get(nse_api).then((response) => {
    //     let a = response.data.data
    //     a.map((ab)=>{
    //       // let b =ab.buy_time
    //       let datea = moment(ab.buy_time).format("D/MM/YYYY");
    //       console.log(datea);
    //       setDateseach(datea)
    //     })
    //   })
    //   // console.log(datea);
    // }
    let datea = date.format("DD/MM/YYYY");
    setDateseach(datea)
    console.log(datea);
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
      title: "Exit Price",
      dataIndex: "exit_price",
      key: "exit_price",
      render: (text, record) => {
        return <Tag color={text !== null ? "error" : ""}>{text}</Tag>;
      },
    },
    {
      title: "Buy Time",
      dataIndex: "buy_time",
      key: "buy_time",




      sorter: (a, b) => moment(a.buy_time).unix() - moment(b.buy_time).unix(),

      render: (text, record) => {
        return moment(text).format("DD/MM/YYYY HH:mm:ss");
      },

    },
    {
      title: "Sell Time",
      dataIndex: "sell_buy_time",
      key: "sell_buy_time",

      sorter: (a, b) => moment(a.sell_buy_time).unix() - moment(b.sell_buy_time).unix(),
      render: (text, record) => {
        return moment(text).format("DD/MM/YYYY HH:mm:ss");
      },

    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (text, record) => {
    //     return <Tag color={text === "BUY" ? "success" : "warning"}>{text}</Tag>;
    //   },
    // },
    // {
    //   title: "Percentage",
    //   dataIndex: "percentage",
    //   key: "percentage",
    //   render: (text, record) => {
    //     return text.profit_percentage;
    //   },
    // },
    {
      title: "Option",
      dataIndex: "percentage",
      key: "percentage",
      render: (text, record) => {
        return text.option;
      },
      filters: [
        {
          text: "BANKNIFTY CE",
          value: "BANKNIFTY CE"
        },
        {
          text: "NIFTY CE",
          value: "NIFTY CE"
        },
        {
          text: "NIFTY PE",
          value: "NIFTY PE"
        },
        {
          text: "BANKNIFTY PE",
          value: "BANKNIFTY PE"
        },
        {
          text: "STOCK CE",
          value: "STOCK CE"
        }
      ],
      onFilter: (value, record) => {
        // console.log(value);
        return record.percentage.option === value

      },
    },
    // {
    //   title: "Call",
    //   dataIndex: "call_put",
    //   key: "call_put",

    //   filters: [

    //     {
    //       text: "CALL",
    //       value: "CALL"
    //     },
    //     {
    //       text: "PUT",
    //       value: "PUT"
    //     }
    //   ],
    //   onFilter: (value, records) => {


    //     return records.call_put === value;
    //   },
    // },
    {
      title: "Stock_Name",
      dataIndex: "stock_name",
      key: "stock_name",
    },
    {
      title: "Final Status",
      dataIndex: "final_status",
      key: "final_status",
      filters: [
        {
          text: "PROFIT",
          value: "PROFIT"
        },
        {
          text: "LOSS",
          value: "LOSS"
        }
      ],
      onFilter: (value, record) => {
        console.log(value);
        return record.final_status === value

      },
      render: (text, record) => {
        return (
          <Tag color={text === "PROFIT" ? "success" : "error"}>{text}</Tag>
        );
      },

    },
  ];

  const [data, setData] = useState([]);
  // const [setting_data, setSetting_Data] = useState([])

  useEffect(() => {
    document.title = "History Data";

    loadNse();
    const interval = setInterval(() => {
      loadNse();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadNse = () => {
    NseService.getNse().then((response) => {
      // console.log("sss",response.data);
      let buyData = response.data.data.filter((item) => {
        return window.location.pathname === "/admin-history"
          ? item.status === "SELL"
          : item.status === "SELL";
      });
      setData(buyData);
    });
  };
  return (
    <>
      <Layout>
        <Header className='header'>
          <div className='logo' />
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
              <Breadcrumb.Item>History</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className='site-layout-background'
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {/* <Input.Search
              placeholder="search here.."
              style={{ marginBottom: 10 }}
              /> */}

              <Table
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={data}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10',"20",data.length]}}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default HistoryData;
