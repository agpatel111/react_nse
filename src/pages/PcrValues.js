import React from "react";
import NavbarMenu from "../components/Navbar";
import moment from "moment/moment";
import { PCR_VALUE_API, SELECT_STOCK_NAME } from "../api/LocalApi";
import { PCR_STOCK_URL } from "../api/FetchApi";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Tag } from "antd";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Model from "./Model";

function PcrValues() {
  const [getdata, setGet_data] = useState([]);
  const [stock_name, setStock_name] = useState([]);
  const [fruit, setFruit] = useState([]);
  const [liveprice, setLiveprice] = useState([]);

  const [search_data, setSearch_data] = useState([]);
  const [ismodel, setIsmodel] = useState(false);
  
  const { Search } = Input;

  const navigate = useNavigate();
  useEffect(() => {
    fatchdata();

    get_d_data();
    stock_data();
  }, [fruit]);
  

 

  const get_d_data = async () => {
    await axios.get(PCR_VALUE_API).then((responses) => {
      //   let a = responses.data.data;
      setStock_name(responses.data.data);
    });
  };
  let handleFruitChange = (e) => {
    setFruit(e.target.value);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  let myWindow;
  const openInNewTab = async (url) => {
    myWindow = window.open(url, "name", "width=500,height=250");
    closeWin();
  };

  async function closeWin() {
    await sleep(2000);
    myWindow.close();
  }

  const fatchdata = async () => {
    await axios.get(PCR_STOCK_URL + `${fruit}`).then((response) => {
      if (fruit.length === 0) {
      } else {
        let sum = response.data.filtered.CE.totOI;
        let sum2 = response.data.filtered.PE.totOI;
        let pcR = sum2 / sum;
        let PCR = pcR.toFixed(2);
        // <<<<<<<<<<< base price and r price >>>>>

        let liveprices = response.data.records.underlyingValue;
        setLiveprice(liveprices);

        // < ---------------- LessThanLive -------------------------------->
        let down_price = response.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r <= liveprices;
        });


        // < ---------------- GraterThan -------------------------------->
        let up_price = response.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r >= liveprices;
        });
       
        // < ------------------------------------------------>
        let P_E_MAX = [];
        let PE_CE_SUM = down_price.slice(-5).map((val) => {
          var ss = val?.PE?.openInterest + val?.PE?.changeinOpenInterest;

          return ss;
        });
        let compare = (a, b) => {
          return b - a;
        };
        const numAscending = PE_CE_SUM.sort(compare);
        const num = numAscending.slice(0, 1);

        // < ------------------------------------------------>
        let C_E_MAX = [];
        let CE_PE_SUM = up_price.slice(0, 5).map((val) => {
          var ss = val?.CE?.openInterest + val?.CE?.changeinOpenInterest;

          return ss;
        });
        let compare1 = (a, b) => {
          return b - a;
        };
        const numAscending1 = CE_PE_SUM.sort(compare1);
        const num1 = numAscending1.slice(0, 1);

        let d = num - num1;

        if (d > 0) {
         
          try {
            const article = {
              pcr: PCR,
              name: `${fruit}`,

              PE_CE_diffrent: true,
            };
            // console.log(article);

            axios({
              method: "put",
              url: PCR_VALUE_API,
              // mode: "cors",
              data: article,
            }).then((response) => {
              // console.log(response.data);
              stock_data();
             
            });
          } catch (err) {
            console.log("Error", err.response);
          }
        } else {
          try {
            const article = {
              pcr: PCR,
              name: `${fruit}`,
              PE_CE_diffrent: false,
            };
            // console.log(article);

            axios({
              method: "put",
              url: PCR_VALUE_API,
              // mode: "cors",
              data: article,
            }).then((response) => {
              console.log(response.data);
              stock_data();
          
            });
          } catch (err) {
            console.log("Error", err.response);
          }
        }
      }
    });
  };

  
  
  // const pcr_stocke = async () => {
  //     try {
  //         const article = {
  //             "name": save_pcr
  //         };

  //         console.log(article);
  //         axios({
  //             method: "post",
  //             url: PCR_VALUE_API,
  //             // mode: "cors",
  //             data: article,
  //         }).then((response) => {
  //             console.log(response.data);
  //             stock_data()
  //         });

  //     } catch (err) {
  //         console.log("Error", err.response);
  //     }
  // }

  const stock_data = async () => {
    await axios.get(PCR_VALUE_API).then((responses) => {
      let a = responses.data.data;
      setGet_data(a);
    });
  };

  const getChartHandler = (val) => {

    navigate("/pcrchart/" + val);
  };

  const modelFun = (name) => { 
    console.log('modelfun', name);
   
  }

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

      sorter: (a, b) => a.pcr - b.pcr,
      render: (text, record) => {
        // console.log(record);

        return (
          <Tag color={record.PE_CE_diffrent === true ? "success" : ""}>
            {text}
          </Tag>
        );
      },
    },
    {
      dataIndex: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (text, record) => {
        return moment(text).format("DD/MM/YYYY HH:mm:ss");
      },

    },
    {
      title: "Action",
      render: (_, record) =>
        getdata.length >= 1 ? (
          <>
            {/* <Button
              onClick={() => {
                
                getChartHandler(record.name);
                // openInNewTab(PCR_STOCK_URL + record.name);
              }}
            >
              Get Chart
            </Button> */}
            <Button
              onClick={() => { 
                console.log(record.name);
                setFruit(record.name)
                showModal()
                openInNewTab(PCR_STOCK_URL + record.name);

                setIsmodel(true)
                }}
              style={{ margin: "15px" }}
            >
              Get Chart
            </Button>
            <Button
              onClick={() => setFruit(record.name)}
              style={{ margin: "15px" }}
            >
              Update
            </Button>
            
          </>
        ) : null,
    },
  ];
  //   const onChange = (sorter) => {};
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <NavbarMenu />
      

    <Model 
      showModal = { showModal }
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      namess ={fruit}

    />
      {/* { ismodel  && <Model namee={'LT'} setIsModal = 'true' />} */}
      
      <FormControl style={{ width: "150px" }}>
        <InputLabel id="demo-simple-select-label">Stock Name</InputLabel>
        <Select
          value={fruit ?? ""}
          style={{ marginBottom: "15px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Stock"
          onChange={handleFruitChange}
        >
          {stock_name.map((fruit, i) => (
            <MenuItem key={i} value={fruit.name}>
              {fruit.name}
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
        {/* <Input.Search
          placeholder="search here.."
          style={{ marginBottom: 10 }}
          onSearch={(value) => {
            setSearch_data(value)
          }}
        /> */}

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
}
export default PcrValues;
