import NseService from "../services/NseService";
import { LOCAL_BASE_URL, live_put } from "../api/LocalApi";

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Layout,
  Table,
  Typography,
  Breadcrumb,
  Button,
} from "antd";
import Sidebar from "./Sidebar";
import { Content, Header } from "antd/es/layout/layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const SettingsNse = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    data_balck();
    document.title = "Settings";
    loadNse_setting();
  }, []);

  const loadNse_setting = () => {
    let nseData = [];
    NseService.setting_get().then((response) => {
      response.data.data.filter((item) => {
        nseData.push({
          key: item.id,
          id: `${item.id}`,
          option: `${item.option}`,
          profit_percentage: `${item.profit_percentage}`,
          loss_percentage: `${item.loss_percentage}`,
          // call_pcr: `${item.call_pcr}`,
          set_pcr: `${item.set_pcr}`,
          baseprice_plus: `${item.baseprice_plus}`,
          quantity_bn: `${item.quantity_bn}`
        });
        return window.location.pathname === "/admin-settings";
      });
      setData(nseData);
    });
  };

  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      option: record.option,
      profit_percentage: record.profit_percentage,
      loss_percentage: record.loss_percentage,
      // call_pcr: record.call_pcr,
      set_pcr: record.set_pcr,
      baseprice_plus: record.baseprice_plus,
      quantity_bn:record.quantity_bn,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const data_balck = async () => {
    await axios({
      method: "get",
      url: live_put,
    }).then((response) => {
      console.log(response.data.data[0].set);
      let d = response.data.data[0].set;
      if (d === 1) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  };

  const [active, setActive] = useState();

  const live_smartapi = async () => {
    await axios({
      method: "get",
      url: live_put,
    }).then((response) => {
      console.log(response.data.data[0].set);
      let d = response.data.data[0].set;

      if (d !== 0) {
        let article = {
          id: 1,
          set: 0,
        };
        axios({
          method: "put",
          url: live_put,
          data: article,
        }).then((response) => {
          console.log(response.data);
          setActive(false);
        });
      } else {
        setActive(true);
        let article = {
          id: 1,

          set: 1,
        };
        axios({
          method: "put",
          url: live_put,
          data: article,
        }).then((response) => {
          console.log(response.data);
        });
      }
    });
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
        // -------------------SUBMIT DATA-----------------------
        // const authToken = localStorage.getItem("token");
        try {
          const article = {
            profit_percentage: row.profit_percentage,
            loss_percentage: row.loss_percentage,
            // call_pcr: row.call_pcr,
            set_pcr: row.set_pcr,
            baseprice_plus: row.baseprice_plus,
            quantity_bn: row.quantity_bn,
          };

          await axios({
            method: "put",
            url: LOCAL_BASE_URL + `/patch_stock/` + id,
            data: article,

            // headers: {
            //   authorization: "Token  " + authToken,
            // },
          }).then((response) => {
            // console.log(response.data);
          });
        } catch (err) {
          console.log("Error ", err.response);
        }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // const

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      //   width: "25%",
      //   editable: true,
    },
    {
      title: "Option",
      dataIndex: "option",
      width: "15%",
      //   editable: true,
    },
    {
      title: "Profit",
      dataIndex: "profit_percentage",
      width: "15%",
      editable: true,
    },
    {
      title: "Loss",
      dataIndex: "loss_percentage",
      width: "15%",
      editable: true,
    },
    // {
    //   title: "Call Pcr",
    //   dataIndex: "call_pcr",
    //   width: "20%",
    //   editable: true,
    // },
    {
      title: "Set Pcr",
      dataIndex: "set_pcr",
      width: "15%",
      editable: true,
    },
    {
      title: "Baseprice Plus",
      dataIndex: "baseprice_plus",
      width: "15%",
      editable: true,
    },
    {
      title: "Number of quantity",
      dataIndex: "quantity_bn",
      width: "15%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <br />
            <Typography.Link onClick={cancel}>Cancel</Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sidebar />
          <Layout
          // style={{
          //   padding: "0 0 24px",
          //   //   margin: "30px",
          // }}
          >
            <Breadcrumb style={{ margin: "16px 30px" }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Settings</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: "35px 30px",
                margin: 0,
                minHeight: 280,
              }}
            >
              <Button
                style={{
                  float: "left",
                  margin: "10px ",
                  backgroundColor: active === true ? "#72ED90 " : "white",
                }}
                onClick={live_smartapi}
              >
                Live{" "}
              </Button>
             
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  // bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                />
              </Form>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
export default SettingsNse;
