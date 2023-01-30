import React from "react";
import NavbarMenu from "../components/Navbar";
import moment from "moment/moment";
import { PCR_VALUE_API, SELECT_STOCK_NAME ,SELECT_STOCK_NAME_PUT } from "../api/LocalApi";
import { PCR_STOCK_URL } from "../api/FetchApi";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Tag } from "antd";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [getdata, setGet_data] = useState([]);
  const [stock_name, setStock_name] = useState([]);
 

  const [search_data, setSearch_data] = useState([]);

  const [stock_name_colour_green, setStock_name_colour_green] = useState([]);
  const [stock_name_put, setStock_name_put] = useState([]);

  const [fruit_stock, setFruit_stock] = useState([]);
  const [fruit_stock_put, setFruit_stock_put] = useState([]);
  const { Search } = Input;

  useEffect(() => {
    stock_buy();
  }, [fruit_stock ,fruit_stock_put ]);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count = count + 1;
      count === 31 && window.location.reload();
      stock_buy();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getall_data();

  }, []);

  const getall_data =  () => {
     axios.get(SELECT_STOCK_NAME).then(async (response) => {
      let d = response.data.data;
      // console.log(d[0].name);
      setFruit_stock(d[0].name);
    });

    axios.get(SELECT_STOCK_NAME_PUT).then(async (response) => {
      let d = response.data.data;
    
      setFruit_stock_put(d[0].name);
    });
  };

  let handleFruitChange_stock = async (e) => {
    setFruit_stock(e.target.value);
    await axios.get(SELECT_STOCK_NAME).then(async (response) => {
      let d = response.data.data;

      if (d.length === 0) {
        try {
          const article = {
            name: e.target.value,
          };

          await axios({
            method: "post",
            url: SELECT_STOCK_NAME,
            mode: "cors",
            data: article,
          }).then((response) => {
            console.log(response.data);
          });
        } catch (err) {
          console.log("Error", err.response);
        }
      } else if (d.length === 1) {
        try {
          const article = {
            id: 1,
            name: e.target.value,
          };

          await axios({
            method: "put",
            url: SELECT_STOCK_NAME,
            mode: "cors",
            data: article,
          }).then((response) => {
            console.log(response.data);
          });
        } catch (err) {
          console.log("Error", err.response);
        }
      }
    });
  };

  let handleFruitChange_stock_put = async (e) => {
    setFruit_stock_put(e.target.value);
    await axios.get(SELECT_STOCK_NAME_PUT).then(async (response) => {
      let d = response.data.data;

      if (d.length === 0) {
        try {
          const article = {
            name: e.target.value,
          };

          await axios({
            method: "post",
            url: SELECT_STOCK_NAME_PUT,
            mode: "cors",
            data: article,
          }).then((response) => {
            console.log(response.data);
          });
        } catch (err) {
          console.log("Error", err.response);
        }
      } else if (d.length === 1) {
        try {
          const article = {
            id: 1,
            name: e.target.value,
          };

          await axios({
            method: "put",
            url: SELECT_STOCK_NAME_PUT,
            mode: "cors",
            data: article,
          }).then((response) => {
            console.log(response.data);
          });
        } catch (err) {
          console.log("Error", err.response);
        }
      }
    });
  };

  const stock_buy = async () => {
    await axios.get(PCR_VALUE_API).then(async (response) => {
      // console.log(response.data.data);
      let a = response.data.data;
      setStock_name(response.data.data);
      setGet_data(a);
      var date = moment();
      var currentDate = date.format("D/MM/YYYY");
      const values = Object.values(a);
      let data_green = [];
      let data_green_put = [];
      values.map((ab) => {
        var Buy_Date = moment(values.date).format("D/MM/YYYY");
        if (ab.PE_CE_diffrent === true && Buy_Date === currentDate) {
          let d = ab;
          data_green.push(ab);
        }
        if (ab.PE_CE_diffrent === false && Buy_Date === currentDate) {
          let d = ab;
          data_green_put.push(ab);
        }
      });
      let data_buy = data_green;
      setStock_name_colour_green(data_buy);
      setStock_name_put(data_green_put);
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      //   render: (text, record, index) => index + 1,
    },
    {
      title: "Stock Name",
      dataIndex: "name",

      filteredValue: [search_data],
      onFilter: (vaule, record) => {
        return String(record.name).toLowerCase().includes(vaule.toLowerCase());
      },
      sorter: (a, b) => a.pcr - b.pcr,
    },
    {
      title: "Pcr Value",
      dataIndex: "pcr",
      key: "pcr",

      
      sorter: (a, b) => a.pcr - b.pcr,
      render: (text, record) => {
        return (
          <Tag color={record.PE_CE_diffrent === true ? "success" : ""}>
            {text}
          </Tag>
        );
      },
      // filters: [
      //   {
      //     text: "true",
      //     value: "true"
      //   },
      //   {
      //     text: "false",
      //     value: "false"
      //   },
      // ],
      // // filteredValue : [true],
      // onFilter: (value, record) => {
            
      //   return record.PE_CE_diffrent === value 

      // },
    },
    {
      dataIndex: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (text, record) => {
        return moment(text).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];
  return (
    <>
      <NavbarMenu />
      <FormControl
        sx={{ m: 1, minWidth: 200 }}
        style={{ width: "250px", margin: "10px " }}
      >
        <InputLabel id="demo-simple-select-label">
          <h5>
            <b>Stock Buy Of Call</b>
          </h5>
        </InputLabel>
        <Select
          value={fruit_stock ?? ""}
          style={{ marginBottom: "15px" }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label="Stock"
          onChange={handleFruitChange_stock}
          autoWidth
        >
          {stock_name_colour_green.map((fruit_D, i) => (
            <MenuItem key={i} value={fruit_D.name}>
              {fruit_D.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 200 }}
        style={{ width: "250px", margin: "10px " }}
      >
        <InputLabel id="demo-simple-select-label">
          <h5>
            <b>Stock Buy Of Put</b>
          </h5>
        </InputLabel>
        <Select
          value={fruit_stock_put ?? ""}
          style={{ marginBottom: "15px" }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          label="Stock"
          onChange={handleFruitChange_stock_put}
          autoWidth
        >
          {stock_name_put.map((fruit_put, i) => (
            <MenuItem key={i} value={fruit_put.name}>
              {fruit_put.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="App">
        <Search
          style={{
            fontSize: 2,
            color: "#1890ff",
            width: 300,
            float: "right",
            marginBottom: 10,
          }}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            setSearch_data(value);
          }}
        />
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={getdata}
          //   onChange={onChange}
          pagination={{ pageSize: 500 }}
        />
      </div>
    </>
  );
};

export default Home;
