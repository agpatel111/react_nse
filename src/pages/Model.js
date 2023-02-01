import React, { useEffect, useState } from "react";
import { PCR_STOCK_URL } from "../api/FetchApi";
import axios from "axios";
import { PCR_VALUE_API } from "../api/LocalApi";
import { Modal } from "antd";
import { Button, CloseButton, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ButtonBase, IconButton } from "@material-ui/core";
import { HistoryOutlined } from "@ant-design/icons";

const Model = (props) => {
  let name = props.namess;
  const [d, setIsname] = useState([]);
  const [liveprice, setLiveprice] = useState([]);
  const [timestamp, setTimeStamp] = useState([]);
  const [pcrValue, setPcrValue] = useState([]);
  const [lessThanLive, setLessThanLive] = useState([]);
  const [graterThanLive, setGraterThan] = useState([]);
  const [ceMax, setCEmax] = useState([]);
  const [peMax, setPEmax] = useState([]);
  // let name = props.name
  localStorage.setItem("name", props.namess);

  useEffect(() => {
    setLiveprice([]);
    setTimeStamp([]);
    setPcrValue([]);
    setLessThanLive([]);
    setGraterThan([]);
    setCEmax([]);
    setPEmax([]);
    localStorage.removeItem("Name");
  }, [props.handleCancel, props.handleOk]);

  useEffect(() => {
    getApiData();

    const interval = setInterval(() => {
      getApiData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function getApiData() {
    let d = localStorage.getItem("name");
    if (d !== null) {
      await axios.get(PCR_STOCK_URL + d).then((json) => {
        let time_stamp = json.data.records.timestamp;

        setTimeStamp(time_stamp);

        let liveprices = json.data.records.underlyingValue;
        setLiveprice(liveprices);
        // < ----------------- PCR Value ------------------------------->
        const sum = json.data.filtered.CE.totOI;
        const sum2 = json.data.filtered.PE.totOI;
        const pcR = sum2 / sum;
        let PCR = pcR.toFixed(2);
        setPcrValue(PCR);
        // < ---------------- LessThanLive -------------------------------->
        let down_price = json.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r <= liveprices;
        });
        setLessThanLive(down_price);
        // < ---------------- GraterThan -------------------------------->
        let up_price = json.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r >= liveprices;
        });
        setGraterThan(up_price);
        // < ------------------------------------------------>
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
        let CE_PE_SUM = up_price.slice(0, 5).map((val) => {
          var ss = val?.CE?.openInterest + val?.CE?.changeinOpenInterest;
          return ss;
        });
        let compare1 = (a, b) => {
          return b - a;
        };
        const numAscending1 = CE_PE_SUM.sort(compare1);
        const num1 = numAscending1.slice(0, 1);
        // < ---------------- Pemax -------------------------------->
        const PE_present_price = [];
        const PE_present_price2 = [];
        down_price.filter((ab) => {
          let r = ab?.PE?.changeinOpenInterest + ab?.PE?.openInterest;
          if (r === num[0]) {
            PE_present_price.push(ab);
            PE_present_price2.push(ab.strikePrice);
          }
          return ab;
        });
        setPEmax(PE_present_price);
        // < ----------------- CEmax ------------------------------->
        const CE_present_price = [];
        const CE_present_price2 = [];
        up_price.map((ab) => {
          let r = ab?.CE?.changeinOpenInterest + ab?.CE?.openInterest;
          if (r === num1[0]) {
            CE_present_price.push(ab);
            CE_present_price2.push(ab.strikePrice);
          }
          return ab;
        });
        setCEmax(CE_present_price);

        let d = num - num1;
        console.log(d);

        if (d > 0) {
          try {
            const article = {
              pcr: PCR,
              name: localStorage.getItem("name"),
              PE_CE_diffrent: true,
            };
            console.log(article);

            axios({
              method: "put",
              url: PCR_VALUE_API,
              // mode: "cors",
              data: article,
            }).then((response) => {
              console.log(response.data);
            });
          } catch (err) {
            console.log("Error", err.response);
          }
        } else {
          try {
            const article = {
              pcr: PCR,
              name: localStorage.getItem("name"),
              PE_CE_diffrent: false,
            };
            console.log(article);

            axios({
              method: "put",
              url: PCR_VALUE_API,
              // mode: "cors",
              data: article,
            }).then((response) => {
              console.log(response.data);
            });
          } catch (err) {
            console.log("Error", err.response);
          }
        }
      });
    }
  }
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  //   console.log(setIsModal);
  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };
  //   const handleCancel = () => {
  //     setIsModa     lOpen(false);
  //   };
  return (
    <>
      <Link to="/pcr"></Link>
      <Modal
        width={1200}
        title="STOCK CHART"
        open={props.isModalOpen}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <div className="container">
          <div className="container">
            <div className="col-md-7 mb-1 d-inline p-2 bg-success text-white float-left  ">
              Underlying Index:
              <span id="equity_underlyingVal" className="bold ">
                <b>
                  {name} {liveprice}
                </b>
              </span>
              <span id="equity_timeStamp" className="asondate">
                As on {timestamp} IST
              </span>
            </div>
          </div>
          <div>
            <div className="d-inline p-2 bg-success text-white float-right">
              PCR = {Number(pcrValue).toFixed(2)}
            </div>
          </div>
        </div>
        <HistoryOutlined
          style={{ display: "flex", justifyContent: "left", margin: "25px" }}
          onClick={getApiData}
        />
        <div id="chartContainer">
          {/* <button>button</button> */}
          <Table className="mt-3" id="chartContainer">
            <thead>
              <tr
                style={{
                  backgroundColor: "	#ffbf00",
                }}
              >
                <th width="8%" title="Open Interest in contracts"></th>

                <th width="30%" title="Open Interest in contracts">
                  PE
                </th>

                <th width="35%" title="Strike Price">
                  Strike Price
                </th>

                <th width="40%" title="Open Interest in contracts">
                  CE
                </th>
              </tr>
            </thead>

            <tbody>
              {/* {peMax[0].openInterest} */}
              {lessThanLive.slice(-10).map((data, i) => {
                return (
                  <tr key={i}>
                    <td
                      style={{
                        backgroundColor: "#ECF0F1 ",
                      }}
                    >
                      {data.PE.openInterest +
                        data.PE.changeinOpenInterest -
                        (data.CE.openInterest + data.CE.changeinOpenInterest)}
                    </td>
                    <td
                      style={{
                        backgroundColor: peMax[0] === data ? "#ff1000" : null,
                      }}
                    >
                      {data?.PE?.openInterest + data?.PE?.changeinOpenInterest}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#66CDAA",
                      }}
                    >
                      <b>{data.strikePrice}</b>
                    </td>

                    <td
                      style={{
                        backgroundColor: "#33F9FF",
                      }}
                    >
                      {data?.CE?.openInterest + data?.CE?.changeinOpenInterest}
                    </td>
                  </tr>
                );
              })}

              {graterThanLive.slice(0, 10).map((data, i) => {
                return (
                  <tr key={i}>
                    <td
                      style={{
                        backgroundColor: "#ECF0F1 ",
                      }}
                    >
                      {+(data.PE.openInterest + data.PE.changeinOpenInterest) -
                        (data.CE.openInterest + data.CE.changeinOpenInterest)}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#33F9FF",
                      }}
                    >
                      {data.PE.changeinOpenInterest + data.PE.openInterest}
                    </td>

                    <td
                      style={{
                        backgroundColor: "#66CDAA",
                      }}
                    >
                      <b>{data.strikePrice}</b>
                    </td>

                    <td
                      style={{
                        backgroundColor: ceMax[0] === data ? "#ff1000" : null,
                      }}
                    >
                      {data.CE.openInterest + data.CE.changeinOpenInterest}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Modal>
    </>
  );
};

export default Model;
