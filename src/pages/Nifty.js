import React, { useState, useEffect } from "react";
import axios from "axios";
import { NIFTY_API, PCR_STOCK_URL } from "../api/FetchApi";
import { nse_api } from "../api/LocalApi";
import {
  SETTINGS_API,
  SELECT_STOCK_NAME,
  SELECT_STOCK_NAME_PUT
} from "../api/LocalApi";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import NavbarMenu from "../components/Navbar";
import { Table } from "react-bootstrap";
import moment from "moment/moment";

const Nifty = () => {
  const [timestamp, setTimeStamp] = useState([]);
  const [liveprice, setLiveprice] = useState([]);
  const [graterThanLive, setGraterThan] = useState([]);
  const [lessThanLive, setLessThanLive] = useState([]);
  const [ceMax, setCEmax] = useState([]);
  const [peMax, setPEmax] = useState([]);
  const [liveBidPrice, setLiveBidprice] = useState([]);
  const [pcrValue, setPcrValue] = useState([]);
  const [cepeDiffrent, setCePeDiffrent] = useState([]);
  const [buyPrice, setBuyPrice] = useState([]);
  const [bidPrice, setBidPrice] = useState([]);
  const [strikePrice, setStrikePrice] = useState([]);
  const [jugad, setJugad] = useState(10);
  const [sellbidPrice, sellBidPrice] = useState([]);

  // LOCAL URL

  const [call, setCAll] = useState("");
  const [put, setPut] = useState("");
  const [basePlus, setBasePlus] = useState([]);

  const [callPcr, setCallPcr] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [optionId, setOptionId] = useState(1);
  const [profitPercentage, setProfitPercentage] = useState([]);
  const [lossPercentage, setLossPercentage] = useState([]);
  const [sellPrice, setSellPrice] = useState([]);
  const [stopLoss, setStopLoss] = useState([]);
  const [oneStock, setOneStock] = useState(true);
  const [sellFunCall, setSellFunCall] = useState(false);
  const [localDataId, setLocalDataId] = useState(false);
  const [buyCondition, setBuyCondition] = useState(true);
  const [finalStatus, setFinalStatus] = useState("NA");
  const [sl, setStoploss_call] = useState([]);
  const [sp, setSquareoff_call] = useState([]);

  // <----------------- put ----------------------------->
  const [buyputPrice, setBuyputPrice] = useState([]);
  const [buyConditionput, setBuyputCondition] = useState(true);
  const [bidPrice_put, setBidPrice_put] = useState([]);
  const [sellPrice_put, setSellPrice_put] = useState([]);
  const [stopLoss_put, setStopLoss_put] = useState([]);
  const [strikePrice_put, setStrikePrice_put] = useState([]);
  const [liveBidPrice_put, setLiveBidprice_put] = useState([]);
  const [sellbidPrice_put, setSellBidPrice_put] = useState([]);
  const [localDataId_put, setLocalDataId_put] = useState(false);
  const [sellFunPut, setSellFunPut] = useState(false);
  const [finalStatus_put, setFinalStatus_put] = useState("NA");
  const [liveprice_put, setLiveprice_put] = useState([]);
  const [oneStock_put, setOneStock_put] = useState(true);
  const [basePlus_put, setBasePlus_put] = useState([]);
  const [putPcr_put, setPutPcr_put] = useState([]);
  const [profitPercentage_put, setProfitPercentage_put] = useState([]);
  const [lossPercentage_put, setLossPercentage_put] = useState([]);
  const [optionId_put, setOptionId_put] = useState(1);
  const [sd, setStoploss_put] = useState([]);
  const [sw, setSquareoff_put] = useState([]);

  // <=================stock data ===========================>
  const [call_stock, setStockCall] = useState("");

  const [profitPercentage_stock, setProfitPercentage_stock] = useState([]);
  const [lossPercentage_stock, setLossPercentage_stock] = useState([]);
  const [optionId_stock, setOptionId_stock] = useState(1);
  const [buyConditionput_stock, setBuyputCondition_stock] = useState(true);

  const [filter_stock, setFilter_stock] = useState([]);
  const [sellbidPrice_s, setSellBidPrice_s] = useState([]);
  const [finalStatus_stock, setFinalStatus_stock] = useState("NA");
  const [localDataId_stock, setLocalDataId_stock] = useState(false);
  const [sellFun_stock, setSellFun_stock] = useState(false);
  const [stock_name_pcr, setStock_name_pcr] = useState([]);
  const [stock_name, setStock_name] = useState([]);
  const [stock_name_live, setStock_name_live] = useState([]);
  const [stock_name_filter_data, setStock_name_filter_data] = useState([]);
  const [stock_name_filter_data_up, setStock_name_filter_data_up] = useState(
    []
  );

  const [stock_name_buy_data, setStock_name_buy_data] = useState([]);
  const [stock_name_put_value, setStock_name_put_value] = useState([]);
  const [bidPrice_stock, setBidPrice_stock] = useState([]);
  const [sellPrice_stock, setSellPrice_stock] = useState([]);
  const [stopLoss_stock, setStopLoss_stock] = useState([]);
  const [strikePrice_stock, setStrikePrice_stock] = useState([]);
  const [sl_stock, setStoploss_stock] = useState([]);
  const [sp_stock, setSquareoff_stock] = useState([]);
  const [timestamp_stock, setTimeStamp_stock] = useState([]);
  const [Pcr_stock, setPcr_stock] = useState([]);
  const [fruit, setFruit] = useState([]);

  // <=================stock data_PE===========================>
  const [call_stock_PE, setStockCall_PE] = useState("");

  const [profitPercentage_stock_PE, setProfitPercentage_stock_PE] = useState(
    []
  );
  const [lossPercentage_stock_PE, setLossPercentage_stock_PE] = useState([]);
  const [optionId_stock_PE, setOptionId_stock_PE] = useState(1);
  const [buyConditionput_stock_PE, setBuyputCondition_stock_PE] =
    useState(true);

  const [filter_stock_PE, setFilter_stock_PE] = useState([]);
  const [sellbidPrice_s_PE, setSellBidPrice_s_PE] = useState([]);
  const [finalStatus_stock_PE, setFinalStatus_stock_PE] = useState("NA");
  const [localDataId_stock_PE, setLocalDataId_stock_PE] = useState(false);
  const [sellFun_stock_PE, setSellFun_stock_PE] = useState(false);
  const [stock_name_pcr_PE, setStock_name_pcr_PE] = useState([]);
  const [stock_name_PE, setStock_name_PE] = useState([]);
  const [stock_name_live_PE, setStock_name_live_PE] = useState([]);
  const [stock_name_filter_data_PE, setStock_name_filter_data_PE] = useState(
    []
  );
  const [stock_name_filter_data_up_PE, setStock_name_filter_data_up_PE] =
    useState([]);

  const [stock_name_buy_data_PE, setStock_name_buy_data_PE] = useState([]);
  const [stock_name_put_value_PE, setStock_name_put_value_PE] = useState([]);
  const [bidPrice_stock_PE, setBidPrice_stock_PE] = useState([]);
  const [sellPrice_stock_PE, setSellPrice_stock_PE] = useState([]);
  const [stopLoss_stock_PE, setStopLoss_stock_PE] = useState([]);
  const [strikePrice_stock_PE, setStrikePrice_stock_PE] = useState([]);
  const [sl_stock_PE, setStoploss_stock_PE] = useState([]);
  const [sp_stock_PE, setSquareoff_stock_PE] = useState([]);
  const [timestamp_stock_PE, setTimeStamp_stock_PE] = useState([]);
  const [Pcr_stock_PE, setPcr_stock_PE] = useState([]);
  const [fruit_PE, setFruit_PE] = useState([]);

  useEffect(() => {
    document.title = "Nifty";
    getLocalData();
    getApiData();
    // stock_buy();
    stock_data_name();
    stock_data_name_PE();
    let count = 0;
    const interval = setInterval(() => {
      count = count + 1;
      console.log(
        `<--------------------------------------Interval--(${count})--------------------------------------------->`
      );
      count === 31 && window.location.reload();
      // console.log("buyPrice", buyPrice);
      // stock_buy();
      stock_data_name();
      stock_data_name_PE();

      getLocalData();
      // getLocalData_stock();
      getApiData();
      conditionFunction();

      conditionFunction_stock_data();
      conditionFunction_stock_data_PE();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  // console.log("stock_name_buy_data",stock_name_buy_data);

  useEffect(() => {
    mainBuyConditionFun_stock();
    mainBuyConditionFun_stock_PE();
  }, [stock_name_filter_data, stock_name_filter_data_PE]);
  useEffect(() => {
    if (jugad !== 10) {
      mainBuyConditionFun_stock();
      mainBuyConditionFun_stock_PE();
      conditionFunction_stock_data();
      conditionFunction_stock_data_PE();

    } else {
    }
  }, [jugad, stock_name_buy_data ,stock_name_filter_data_PE]);

  useEffect(() => {
    if (cepeDiffrent.length !== 0) {
      getLocalData();
      if (jugad !== 10) {
        mainBuyConditionFun();
        mainBuyConditionFunput();
        conditionFunction();
      }
    } else {
    }
  }, [cepeDiffrent, jugad, buyPrice]);

  useEffect(() => {
    if (bidPrice.length !== 0) {
      postData();
    } else {
    }
  }, [bidPrice]);

  useEffect(() => {
    if (bidPrice_put.length !== 0) {
      postData_put();
    } else {
    }
  }, [bidPrice_put]);

  useEffect(() => {
    if (sellFunCall === true) {
      sellData();
    }
  }, [sellFunCall]);

  useEffect(() => {
    if (sellFunPut === true) {
      sellData_put();
    }
  }, [sellFunPut]);

  useEffect(() => {
    if (bidPrice_stock.length !== 0) {
      post_stock_data();
    } else {
    }
  }, [bidPrice_stock]);

  useEffect(() => {
    if (sellFun_stock === true) {
      sellData_stock();
    }
  }, [sellFun_stock]);

  useEffect(() => {
    if (bidPrice_stock_PE.length !== 0) {
      post_stock_data_PE();
    } else {
    }
  }, [bidPrice_stock_PE]);

  useEffect(() => {
    if (sellFun_stock_PE === true) {
      sellData_stock_PE();
    }
  }, [sellFun_stock_PE]);




  // API DATA
  async function getApiData() {
    await axios
      .get(NIFTY_API)

      .then((json) => {
        let time_stamp = json.data.records.timestamp;
        setTimeStamp(time_stamp);
        // < ---------------- Liveprice -------------------------------->
        let liveprices = json.data.records.underlyingValue;
        setLiveprice(liveprices);
        setLiveprice_put(liveprices);
        // < ---------------- GraterThan -------------------------------->
        let up_price = json.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r >= liveprices;
        });
        setGraterThan(up_price);
        // < ---------------- LessThanLive -------------------------------->
        let down_price = json.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r <= liveprices;
        });
        setLessThanLive(down_price);
        // < ------------------------------------------------>
        let filterddata = json.data.filtered.data;
        setFilteredData(filterddata);
        // < ------------------------------------------------>
        let PE_CE_SUM = down_price.slice(-5).map((val) => {
          var ss = val.PE.openInterest + val.PE.changeinOpenInterest;
          return ss;
        });
        let compare = (a, b) => {
          return b - a;
        };
        const numAscending = PE_CE_SUM.sort(compare);
        const num = numAscending.slice(0, 1);
        // < ------------------------------------------------>
        let CE_PE_SUM = up_price.slice(0, 5).map((val) => {
          var ss = val.CE.openInterest + val.CE.changeinOpenInterest;
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
          let r = ab.PE.changeinOpenInterest + ab.PE.openInterest;
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
          let r = ab.CE.changeinOpenInterest + ab.CE.openInterest;
          if (r === num1[0]) {
            CE_present_price.push(ab);
            CE_present_price2.push(ab.strikePrice);
          }
          return ab;
        });
        setCEmax(CE_present_price);
        // < ----------------- Live BD Price ------------------------------->
        PE_present_price.map((ab) => {
          let BD = ab.CE.bidprice;
          setLiveBidprice(BD);
          return ab;
        });

        PE_present_price.map((ab) => {
          let BD = ab.PE.bidprice;
          setLiveBidprice_put(BD);
          return ab;
        });
        // < ----------------- PCR Value ------------------------------->
        const sum = json.data.filtered.CE.totOI;
        const sum2 = json.data.filtered.PE.totOI;
        const PCR = sum2 / sum;
        setPcrValue(PCR);
        // < ----------------- CE PE Diffrent ------------------------------->
        const CE_PE_Diffrent = [];
        PE_present_price.map((ab) => {
          let a =
            ab.PE.openInterest +
            ab.PE.changeinOpenInterest -
            (ab.CE.openInterest + ab.CE.changeinOpenInterest);
          let s = a;
          CE_PE_Diffrent.push(a);
          return ab;
        });
        setCePeDiffrent(CE_PE_Diffrent);
        // < ------------------------------------------------>
      })
      .catch((e) => console.log(e));
  }

  const getLocalData = async () => {
    fetch(SETTINGS_API)
      .then((response) => response.json())
      .then((data) => {
        data.data.map((val) => {
          if (val.option === "NIFTY CE") {
            setCallPcr(val.set_pcr);
            setBasePlus(val.baseprice_plus);
            setProfitPercentage(val.profit_percentage);
            setLossPercentage(val.loss_percentage);
            setOptionId(val.id);
            return val;
          }
        });
        data.data.map((val) => {
          // console.log(val.option);
          if (val.option === "NIFTY PE") {
            setPutPcr_put(val.set_pcr);
            setBasePlus_put(val.baseprice_plus);
            setProfitPercentage_put(val.profit_percentage);
            setLossPercentage_put(val.loss_percentage);
            setOptionId_put(val.id);
            return val;
          }
        });
        data.data.map((val) => {
          // console.log(val.option);
          if (val.option === "STOCK CE") {
            setPcr_stock(val.set_pcr);
            setProfitPercentage_stock(val.profit_percentage);
            setLossPercentage_stock(val.loss_percentage);
            setOptionId_stock(val.id);
            return val;
          }
        });
        data.data.map((val) => {
          // console.log(val.option);
          if (val.option === "STOCK PE") {
            setPcr_stock_PE(val.set_pcr);
            setProfitPercentage_stock_PE(val.profit_percentage);
            setLossPercentage_stock_PE(val.loss_percentage);
            setOptionId_stock_PE(val.id);
            return val;
          }
        });
      });

    await fetch(nse_api)
      .then((res) => res.json())
      .then((json) => {
        // setLocalData(json);
        //  BUY CONDITION
        if (json.data.length === 0) {
          json.data = [{ percentage: { option: "" }, status: "" }];
        }
        for (var i of json.data) {
          // console.log('demo',i);
          if (
            i.percentage.option === "NIFTY CE" &&
            i.status === "BUY" &&
            i.call_put === "CALL"
          ) {
            setBuyCondition(false);
            break;
          } else {
            setBuyCondition(true);
          }
        }
        for (var i of json.data) {
          // console.log(i.percentage);
          if (
            i.percentage.option === "NIFTY PE" &&
            i.status === "BUY" &&
            i.call_put === "PUT"
          ) {
            setBuyputCondition(false);
            break;
          } else {
            setBuyputCondition(true);
          }
        }
        for (var i of json.data) {
          // console.log(i.percentage);
          if (
            i.percentage.option === "STOCK CE" &&
            i.status === "BUY" &&
            i.call_put === "CALL"
          ) {
            setBuyputCondition_stock(false);
            break;
          } else {
            setBuyputCondition_stock(true);
          }
        }
        for (var i of json.data) {
          // console.log(i.percentage);
          if (
            i.percentage.option === "STOCK PE" &&
            i.status === "BUY" &&
            i.call_put === "CALL"
          ) {
            setBuyputCondition_stock_PE(false);
            break;
          } else {
            setBuyputCondition_stock_PE(true);
          }
        }

        var date = moment();
        var currentDate = date.format("D/MM/YYYY");
        let profit = 0;
        let loss = 0;
        for (var j of json.data) {
          var Buy_Date = moment(j.buy_time).format("D/MM/YYYY");
          if (Buy_Date === currentDate && j.percentage.option === "NIFTY CE") {
            if (j.final_status === "PROFIT") {
              profit = profit + 1;
            } else if (j.final_status === "LOSS") {
              loss = loss + 1;
            }
          }
        }
        if (profit > loss) {
          setOneStock(false);
        } else {
          setOneStock(true);
        }
        // <<<<<<<<<<--------------------------put------------------------->

        var date = moment();
        var currentDate = date.format("D/MM/YYYY");
        let profit1 = 0;
        let loss1 = 0;
        for (var j of json.data) {
          var Buy_Date = moment(j.buy_time).format("D/MM/YYYY");
          if (Buy_Date === currentDate && j.percentage.option === "NIFTY PE") {
            if (j.final_status === "PROFIT") {
              profit1 = profit1 + 1;
            } else if (j.final_status === "LOSS") {
              loss1 = loss1 + 1;
            }
          }
        }
        if (profit1 > loss1) {
          setOneStock_put(false);
        } else {
          setOneStock_put(true);
        }

        json.data.map((val) => {
          setJugad(2 + 1);
          // console.log(val);
          // SELL CONDITION
          if (
            val.status === "BUY" &&
            val.percentage.option === "NIFTY CE" &&
            val.call_put === "CALL"
          ) {
            let sell_Price = // val.sell_price;
              (val.buy_price * val.percentage.profit_percentage) / 100 +
              val.buy_price;

            let stop_Loss = // val.stop_loseprice;
              val.buy_price -
              (val.buy_price * val.percentage.loss_percentage) / 100;

            // if (buyBidPrice.length !== 0) {
            if (filteredData.length !== 0) {
              let BuyLivePrice = [];
              let strikePrice = val.base_strike_price;
              filteredData.map((value) => {
                if (value.strikePrice === strikePrice) {
                  if (val.call_put === "CALL") {
                    let buuybidprice = value.CE.bidprice;
                    BuyLivePrice.push(buuybidprice);
                    sellBidPrice(buuybidprice);
                  }
                }
              });

              if (val.admin_call === true) {
                val.buy_price < BuyLivePrice
                  ? setFinalStatus("PROFIT")
                  : setFinalStatus("LOSS");

                setLocalDataId(val.id);
                setSellFunCall(true);
              }

              console.log(
                "buy_price:",
                val.buy_price,
                "sell_Price:",
                sell_Price,
                "liveBidPrice:",
                BuyLivePrice,
                "stop_Loss:",
                stop_Loss
              );
              if (sell_Price <= BuyLivePrice) {
                setFinalStatus("PROFIT");
                setLocalDataId(val.id);
                setSellFunCall(true);
              }
              if (stop_Loss >= BuyLivePrice) {
                setFinalStatus("LOSS");
                setLocalDataId(val.id);
                setSellFunCall(true);
              }
            }
            // }
          }

          if (
            val.status === "BUY" &&
            val.percentage.option === "NIFTY PE" &&
            val.call_put === "PUT"
          ) {
            let sell_Price = // val.sell_price;
              (val.buy_price * val.percentage.profit_percentage) / 100 +
              val.buy_price;
            // console.log(sell_Price);
            let stop_Loss = // val.stop_loseprice;
              val.buy_price -
              (val.buy_price * val.percentage.loss_percentage) / 100;

            // if (buyBidPrice.length !== 0) {
            if (filteredData.length !== 0) {
              let BuyLivePrice_put = [];
              let strikePrice = val.base_strike_price;
              filteredData.map((value) => {
                if (value.strikePrice === strikePrice) {
                  if (val.call_put === "PUT") {
                    let buuybidprice_put = value.PE.bidprice;
                    BuyLivePrice_put.push(buuybidprice_put);
                    setSellBidPrice_put(buuybidprice_put);
                  }
                }
              });

              if (val.admin_call === true) {
                val.buy_price < BuyLivePrice_put
                  ? setFinalStatus_put("PROFIT")
                  : setFinalStatus_put("LOSS");
                setLocalDataId_put(val.id);
                setSellFunPut(true);
              }

              console.log(
                "buy_price:",
                val.buy_price,
                "sell_Price:",
                sell_Price,
                "liveBidPrice:",
                BuyLivePrice_put,
                "stop_Loss:",
                stop_Loss
              );
              if (sell_Price <= BuyLivePrice_put) {
                setFinalStatus_put("PROFIT");
                setLocalDataId_put(val.id);
                setSellFunPut(true);
              }
              if (stop_Loss >= BuyLivePrice_put) {
                setFinalStatus_put("LOSS");
                setLocalDataId_put(val.id);
                setSellFunPut(true);
              }
            }
            // }
          }
          if (
            val.status === "BUY" &&
            val.percentage.option === "STOCK CE" &&
            val.call_put === "CALL"
          ) {
            let sell_Price = // val.sell_price;
              (val.buy_price * val.percentage.profit_percentage) / 100 +
              val.buy_price;

            let stop_Loss = // val.stop_loseprice;
              val.buy_price -
              (val.buy_price * val.percentage.loss_percentage) / 100;

            // if (buyBidPrice.length !== 0) {
            if (filter_stock.length !== 0) {
              let BuyLivePrice = [];
              let strikePrice = val.base_strike_price;
              filter_stock.map((value) => {
                if (value.strikePrice === strikePrice) {
                  if (val.call_put === "CALL") {
                    let buuybidprice = value.CE.bidprice;
                    BuyLivePrice.push(buuybidprice);
                    setSellBidPrice_s(buuybidprice);
                  }
                }
              });

              if (val.admin_call === true) {
                val.buy_price < BuyLivePrice
                  ? setFinalStatus_stock("PROFIT")
                  : setFinalStatus_stock("LOSS");

                setLocalDataId_stock(val.id);
                setSellFun_stock(true);
              }

              console.log(
                "buy_price:",
                val.buy_price,
                "sell_Price:",
                sell_Price,
                "liveBidPrice:",
                BuyLivePrice,
                "stop_Loss:",
                stop_Loss
              );
              if (sell_Price <= BuyLivePrice) {
                setFinalStatus_stock("PROFIT");
                setLocalDataId_stock(val.id);
                setSellFun_stock(true);
              }
              if (stop_Loss >= BuyLivePrice) {
                setFinalStatus_stock("LOSS");
                setLocalDataId_stock(val.id);
                setSellFun_stock(true);
              }
            }
            // }
          }

          if (
            val.status === "BUY" &&
            val.percentage.option === "STOCK PE" &&
            val.call_put === "CALL"
          ) {
            let sell_Price = // val.sell_price;
              (val.buy_price * val.percentage.profit_percentage) / 100 +
              val.buy_price;

            let stop_Loss = // val.stop_loseprice;
              val.buy_price -
              (val.buy_price * val.percentage.loss_percentage) / 100;

            // if (buyBidPrice.length !== 0) {
            if (filter_stock_PE.length !== 0) {
              let BuyLivePrice = [];
              let strikePrice = val.base_strike_price;
              filter_stock_PE.map((value) => {
                if (value.strikePrice === strikePrice) {
                  if (val.call_put === "CALL") {
                    let buuybidprice = value.CE.bidprice;
                    BuyLivePrice.push(buuybidprice);
                    setSellBidPrice_s_PE(buuybidprice);
                  }
                }
              });

              if (val.admin_call === true) {
                val.buy_price < BuyLivePrice
                  ? setFinalStatus_stock_PE("PROFIT")
                  : setFinalStatus_stock_PE("LOSS");

                setLocalDataId_stock_PE(val.id);
                setSellFun_stock_PE(true);
              }

              console.log(
                "buy_price:",
                val.buy_price,
                "sell_Price:",
                sell_Price,
                "liveBidPrice:",
                BuyLivePrice,
                "stop_Loss:",
                stop_Loss
              );
              if (sell_Price <= BuyLivePrice) {
                setFinalStatus_stock_PE("PROFIT");
                setLocalDataId_stock_PE(val.id);
                setSellFun_stock_PE(true);
              }
              if (stop_Loss >= BuyLivePrice) {
                setFinalStatus_stock_PE("LOSS");
                setLocalDataId_stock_PE(val.id);
                setSellFun_stock_PE(true);
              }
            }
            // }
          }
        });
      })
      .catch((e) => console.log(e));
  };

  const mainBuyConditionFun = () => {
    if (oneStock === true && buyCondition === true) {
      const Buy_Price = [];
      // buyPrice
      peMax.map((ab) => {
        if (peMax !== ceMax && cepeDiffrent >= 50000) {
          if (pcrValue >= callPcr) {
            let basePricePlus = ab.strikePrice + basePlus;
            let base_a = basePricePlus - 10;

            if (base_a <= liveprice && liveprice <= basePricePlus) {
              let a = 0;
              while (buyPrice.length === 0 && a === 0) {
                Buy_Price.push(ab);
                setBuyPrice([...buyPrice, ab]);
                setCAll("CALL");
                a = 1;
              }
            }
          }
        }
        return ab;
      });
    }
  };

  const mainBuyConditionFunput = () => {
    if (oneStock_put === true && buyConditionput === true) {
      peMax.map((ab) => {
        if (peMax !== ceMax && cepeDiffrent >= 50000) {
          if (pcrValue <= putPcr_put) {
            let basePricePlus = ab.strikePrice + basePlus_put;
            let base_a = basePricePlus - 10;

            if (base_a <= liveprice_put && liveprice_put <= basePricePlus) {
              let a = 0;
              while (buyputPrice.length === 0 && a === 0) {
                setBuyputPrice([...buyputPrice, ab]);
                setPut("PUT");
                a = 1;
              }
            }
          }
        }
        return ab;
      });
    }
  };

  const conditionFunction = () => {
    // console.log("local", localData?.percentage?.option);

    if (jugad !== 10) {
      if (oneStock === false && buyCondition === true) {
        console.log("YOU HAVE MAKE PROFIT TODAY IN NIFTY CE");
        setOneStock(true);
      } else {
        buyCondition === true
          ? console.log(
              "YOU CAN BUYYYY",
              "cepeDiffrent:",
              cepeDiffrent,
              "pcrValue:",
              pcrValue,
              "buyPrice:",
              buyPrice
            )
          : console.log("Cannot BUY You Have Stock in DB");

        if (buyPrice.length !== 0) {
          if (buyCondition === true) {
            buyPrice.map((ab) => {
              if (call === "CALL") {
                let bdprice = ab.CE.bidprice;
                setBidPrice(bdprice);
                let squareoff = (bdprice * profitPercentage) / 100;
                let stoploss = (bdprice * lossPercentage) / 100;
                let sell_price = (bdprice * profitPercentage) / 100 + bdprice;
                let stop_loss = bdprice - (bdprice * lossPercentage) / 100;
                let sell_price_float = sell_price.toFixed(1);
                let stop_loss_float = stop_loss.toFixed(1);
                setSquareoff_call(squareoff);
                setStoploss_call(stoploss);
                setSellPrice(sell_price_float);
                setStopLoss(stop_loss_float);
              }
              let stprice = ab.strikePrice;
              setStrikePrice(stprice);
            });
          }
        }
      }
    }

    if (jugad !== 10) {
      if (oneStock_put === false && buyConditionput === true) {
        console.log("YOU HAVE MAKE PROFIT TODAY IN  PE");
        setOneStock_put(true);
      } else {
        buyConditionput === true
          ? console.log(
              "YOU CAN BUYYYY",
              "cepeDiffrent:",
              cepeDiffrent,
              "pcrValue:",
              pcrValue,
              "buyPrice:",
              buyPrice
            )
          : console.log("Cannot BUY You Have Stock in DB");

        if (buyputPrice.length !== 0) {
          if (buyConditionput === true) {
            buyputPrice.map((ab) => {
              if (put === "PUT") {
                let bdprice = ab.PE.bidprice;
                setBidPrice_put(bdprice);
                let squareoff = (bdprice * profitPercentage) / 100;
                let stoploss = (bdprice * lossPercentage) / 100;
                let sell_price =
                  (bdprice * profitPercentage_put) / 100 + bdprice;
                let stop_loss = bdprice - (bdprice * lossPercentage_put) / 100;
                let sell_price_float = sell_price.toFixed(1);
                let stop_loss_float = stop_loss.toFixed(1);
                // console.log("losss_put-",stop_loss_float);
                setSquareoff_put(squareoff);
                setStoploss_put(stoploss);
                setSellPrice_put(sell_price_float);
                setStopLoss_put(stop_loss_float);
              }
              let stprice = ab.strikePrice;
              setStrikePrice_put(stprice);
            });
          }
        }
      }
    }
  };

  const postData = async () => {
    try {
      const article = {
        buy_price: bidPrice,
        base_strike_price: strikePrice,
        live_Strike_price: liveprice,
        live_brid_price: liveBidPrice,
        sell_price: sellPrice,
        stop_loseprice: stopLoss,
        percentage: optionId,
        call_put: call,
        squareoff: sp,
        stoploss: sl,
        buy_pcr:pcrValue,
      };

      await axios({
        method: "post",
        url: nse_api,
        mode: "cors",
        data: article,
      }).then((response) => {
        console.log(response.data);
        setCAll("");
      });
    } catch (err) {
      console.log("Error", err.response);
    }
  };

  const postData_put = async () => {
    try {
      const article = {
        buy_price: bidPrice_put,
        base_strike_price: strikePrice_put,
        live_Strike_price: liveprice_put,
        live_brid_price: liveBidPrice_put,
        sell_price: sellPrice_put,
        stop_loseprice: stopLoss_put,
        percentage: optionId_put,
        call_put: put,
        buy_pcr:pcrValue,
        squareoff: sw,
        stoploss: sd,
      };

      await axios({
        method: "post",
        url: nse_api,
        mode: "cors",
        data: article,
      }).then((response) => {
        console.log(response.data);
        setPut("");
      });
    } catch (err) {
      console.log("Error", err.response);
    }
  };

  const sellData = async () => {
    try {
      const article = {
        id: localDataId,
        exit_price: sellbidPrice,
        live_brid_price: sellbidPrice,
        shell_strike_price: liveprice,
        sell_buy_time: timestamp,
        final_status: finalStatus,
        sell_pcr:pcrValue,

        admin_call: true,
        admin_call: true,
      };

      await axios({
        method: "put",
        url: nse_api,
        data: article,
      }).then((response) => {
        console.log(response.data);
        setSellFunCall(false);
        setBuyPrice([]);
        setBidPrice([]);
        setStrikePrice([]);
        setLiveprice([]);
        setLiveBidprice([]);
        setSellPrice([]);
        setStopLoss([]);
        setStoploss_call([]);
        setSquareoff_call([]);
        setFinalStatus("NA");
      });
    } catch (err) {
      console.log("Error ", err.response);
    }
  };

  const sellData_put = async () => {
    try {
      // console.log(localDataId_put);
      const article = {
        id: localDataId_put,
        exit_price: sellbidPrice_put,
        live_brid_price: sellbidPrice_put,
        shell_strike_price: liveprice_put,
        sell_buy_time: timestamp,
        final_status: finalStatus_put,
        sell_pcr : pcrValue,
        admin_call: true,
        admin_call: true,
      };

      await axios({
        method: "put",
        url: nse_api,
        data: article,
      }).then((response) => {
        console.log(response.data);
        setSellFunPut(false);
        setBuyputPrice([]);
        setBidPrice_put([]);
        setStrikePrice_put([]);
        setLiveprice_put([]);
        setLiveBidprice_put([]);
        setSellPrice_put([]);
        setStopLoss_put([]);
        setSquareoff_put([]);
        setStoploss_put([]);
        setFinalStatus_put("NA");
      });
    } catch (err) {
      console.log("Error ", err.response);
    }
  };

  const stock_data_name = async () => {
    await axios.get(SELECT_STOCK_NAME).then((responsesss) => {
      let d = responsesss.data.data[0].name;
      setFruit(d);
      console.log(d);
      axios.get(PCR_STOCK_URL + d).then((response) => {
        let d = response.data.filtered.data;
        console.log(response.data);
        let q = response.data.records.timestamp;

        setTimeStamp_stock(q);
        setFilter_stock(d);

        let liveprices = response.data.records.underlyingValue;
        setStock_name_live(liveprices);

        let up_price = response.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r >= liveprices;
        });
        let up_last_price_stock = up_price.slice(0, 1);
        setStock_name_filter_data_up(up_last_price_stock);

        let down_price = response.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r <= liveprices;
        });

        let last_price_stock = down_price.slice(-1);
        setStock_name_filter_data(last_price_stock);

        last_price_stock.map((data) => {
          let a = data.PE.openInterest + data.PE.changeinOpenInterest;
          let b = data.CE.openInterest + data.CE.changeinOpenInterest;
          let d = a - b;
          setStock_name_put_value(d);
        });
        const sum = response.data.filtered.CE.totOI;
        const sum2 = response.data.filtered.PE.totOI;
        const PCR = sum2 / sum;
        setStock_name_pcr(PCR);
      });
    });
    // }
  };

  // <<<<<-----------------------------buy stock data --------------------------->>>>>>>>>>>>>>>>>>
  const mainBuyConditionFun_stock = () => {
    stock_name_filter_data.map((ab) => {
      console.log("STOCK_CE",buyConditionput_stock);
      if (buyConditionput_stock === true) {
        console.log("STOCK_CE",stock_name_pcr);
        if (Pcr_stock < stock_name_pcr) {
          let diffrent_data =
            (stock_name_filter_data_up[0].CE.strikePrice +
              stock_name_filter_data[0].CE.strikePrice) /
            2;
          let d_d = (diffrent_data - ab.strikePrice) / 2 + ab.strikePrice;
          console.log("STOCK_CE",d_d, diffrent_data, stock_name_live);
          // if ( 1 === 1) {
          if (d_d <= stock_name_live && stock_name_live <= diffrent_data) {
            let a = 0;
            while (stock_name_buy_data.length === 0 && a === 0) {
              setStock_name_buy_data([...stock_name_buy_data, ab]);
              setStockCall("CALL");
              a = 1;
            }
          }
        }
      }
    });
  };

  const conditionFunction_stock_data = () => {
    if (jugad !== 10) {
      if (buyConditionput_stock === true) {
        buyConditionput_stock === true
          ? console.log("YOU CAN BUYYYY")
          : console.log("Cannot BUY You Have Stock in DB");
        if (stock_name_buy_data.length !== 0) {
          if (buyConditionput_stock === true) {
            stock_name_buy_data.map((ab) => {
              if (call_stock === "CALL") {
                let bdprice = ab.CE.bidprice;
                setBidPrice_stock(bdprice);
                let squareoff = (bdprice * profitPercentage_stock) / 100;
                let stoploss = (bdprice * lossPercentage_stock) / 100;
                let sell_price =
                  (bdprice * profitPercentage_stock) / 100 + bdprice;
                let stop_loss =
                  bdprice - (bdprice * lossPercentage_stock) / 100;
                let sell_price_float = sell_price.toFixed(1);
                let stop_loss_float = stop_loss.toFixed(1);
                setSquareoff_stock(squareoff);
                setStoploss_stock(stoploss);
                setSellPrice_stock(sell_price_float);
                setStopLoss_stock(stop_loss_float);
              }
              let stprice = ab.strikePrice;
              setStrikePrice_stock(stprice);
            });
          }
        }
      }
    }
  };

  const post_stock_data = async () => {
    try {
      const article = {
        buy_price: bidPrice_stock,
        base_strike_price: strikePrice_stock,
        live_Strike_price: stock_name_live,
        live_brid_price: bidPrice_stock,
        sell_price: sellPrice_stock,
        stop_loseprice: stopLoss_stock,
        percentage: optionId_stock,
        call_put: call_stock,
        squareoff: sp_stock,
        stoploss: sl_stock,
        stock_name: fruit,
        buy_pcr:stock_name_pcr,

      };
      console.log("article", article);
      await axios({
        method: "post",
        url: nse_api,
        mode: "cors",
        data: article,
      }).then((response) => {
        console.log(response.data);
        setStockCall("");
      });
    } catch (err) {
      console.log("Error", err.response);
    }
  };
  const sellData_stock = async () => {
    try {
      const article = {
        id: localDataId_stock,
        exit_price: sellbidPrice_s,
        live_brid_price: sellbidPrice_s,
        shell_strike_price: stock_name_live,
        sell_buy_time: timestamp_stock,
        final_status: finalStatus_stock,
        sell_pcr:stock_name_pcr,

        admin_call: true,
        admin_call: true,
      };
      await axios({
        method: "put",
        url: nse_api,
        data: article,
      }).then((response) => {
        console.log(response.data);
        setSellFun_stock(false);
        setStock_name_buy_data([]);
        setBidPrice_stock([]);
        setStrikePrice_stock([]);
        setStock_name_live([]);
        setSellPrice_stock([]);
        setStoploss_stock([]);
        setStoploss_stock([]);
        setSquareoff_stock([]);
        setFinalStatus_stock("NA");
        stock_name([]);
        setFruit([]);
      });
    } catch (err) {
      console.log("Error ", err.response);
    }
  };

  const stock_data_name_PE = async () => {
    await axios.get(SELECT_STOCK_NAME_PUT).then((responsesss) => {
      let d = responsesss.data.data[0].name;
      setFruit_PE(d);
      console.log(d);
      axios.get(PCR_STOCK_URL + d).then((response) => {
        let d = response.data.filtered.data;
        console.log(response.data);
        let q = response.data.records.timestamp;

        setTimeStamp_stock_PE(q);
        setFilter_stock_PE(d);

        let liveprices = response.data.records.underlyingValue;
        setStock_name_live_PE(liveprices);

        let up_price = response.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r >= liveprices;
        });
        let up_last_price_stock = up_price.slice(0, 1);
        setStock_name_filter_data_up_PE(up_last_price_stock);

        let down_price = response.data.filtered.data.filter((val) => {
          let r = val.strikePrice;
          return r <= liveprices;
        });

        let last_price_stock = down_price.slice(-1);
        setStock_name_filter_data_PE(last_price_stock);

        last_price_stock.map((data) => {
          let a = data.PE.openInterest + data.PE.changeinOpenInterest;
          let b = data.CE.openInterest + data.CE.changeinOpenInterest;
          let d = a - b;
          setStock_name_put_value_PE(d);
        });
        const sum = response.data.filtered.CE.totOI;
        const sum2 = response.data.filtered.PE.totOI;
        const PCR = sum2 / sum;
        setStock_name_pcr_PE(PCR);
      });
    });
    // }
  };

  // <<<<<-----------------------------buy stock data --------------------------->>>>>>>>>>>>>>>>>>
  const mainBuyConditionFun_stock_PE = () => {
    stock_name_filter_data_PE.map((ab) => {
      console.log("STOCK_PE  ----",buyConditionput_stock_PE);
      if (buyConditionput_stock_PE === true) {
        console.log("STOCK_PE ----",stock_name_pcr_PE);
        if (Pcr_stock_PE < stock_name_pcr_PE) {
          let diffrent_data =
            (stock_name_filter_data_up_PE[0].PE.strikePrice +
              stock_name_filter_data_PE[0].PE.strikePrice) /
            2;
          let d_d = (diffrent_data - ab.strikePrice) / 2 + diffrent_data;
          console.log("STOCK_PE ----",d_d, stock_name_live_PE);
      
          // console.log(stock_name_live_PE >= diffrent_data);
          // if ( 1 === 1) {
          if (
            d_d <= stock_name_live
            
          ) {
            let a = 0;
            while (stock_name_buy_data_PE.length === 0 && a === 0) {
              setStock_name_buy_data_PE([...stock_name_buy_data_PE, ab]);
              setStockCall_PE("CALL");
              a = 1;
            }
          }
        }
      }
    });
  };

  const conditionFunction_stock_data_PE = () => {
    if (jugad !== 10) {
      if (buyConditionput_stock_PE === true) {
        buyConditionput_stock_PE === true
          ? console.log("YOU CAN BUYYYY")
          : console.log("Cannot BUY You Have Stock in DB");
        if (stock_name_buy_data_PE.length !== 0) {
          if (buyConditionput_stock_PE === true) {
            stock_name_buy_data_PE.map((ab) => {
              if (call_stock_PE === "CALL") {
                let bdprice = ab.CE.bidprice;
                setBidPrice_stock_PE(bdprice);
                let squareoff = (bdprice * profitPercentage_stock_PE) / 100;
                let stoploss = (bdprice * lossPercentage_stock_PE) / 100;
                let sell_price =
                  (bdprice * profitPercentage_stock_PE) / 100 + bdprice;
                let stop_loss =
                  bdprice - (bdprice * lossPercentage_stock_PE) / 100;
                let sell_price_float = sell_price.toFixed(1);
                let stop_loss_float = stop_loss.toFixed(1);
                setSquareoff_stock_PE(squareoff);
                setStoploss_stock_PE(stoploss);
                setSellPrice_stock_PE(sell_price_float);
                setStopLoss_stock_PE(stop_loss_float);
              }
              let stprice = ab.strikePrice;
              setStrikePrice_stock_PE(stprice);
            });
          }
        }
      }
    }
  };

  const post_stock_data_PE = async () => {
    try {
      const article = {
        buy_price: bidPrice_stock_PE,
        base_strike_price: strikePrice_stock_PE,
        live_Strike_price: stock_name_live_PE,
        live_brid_price: bidPrice_stock_PE,
        sell_price: sellPrice_stock_PE,
        stop_loseprice: stopLoss_stock_PE,
        percentage: optionId_stock_PE,
        call_put: call_stock_PE,
        squareoff: sp_stock_PE,
        stoploss: sl_stock_PE,
        stock_name: fruit_PE,
        buy_pcr:stock_name_pcr_PE,

      };
      console.log("article", article);
      await axios({
        method: "post",
        url: nse_api,
        mode: "cors",
        data: article,
      }).then((response) => {
        console.log(response.data);
        setStockCall_PE("");
      });
    } catch (err) {
      console.log("Error", err.response);
    }
  };
  const sellData_stock_PE = async () => {
    try {
      const article = {
        id: localDataId_stock_PE,
        exit_price: sellbidPrice_s_PE,
        live_brid_price: sellbidPrice_s_PE,
        shell_strike_price: stock_name_live_PE,
        sell_buy_time: timestamp_stock_PE,
        final_status: finalStatus_stock_PE,
        sell_pcr:stock_name_pcr_PE,

        admin_call: true,
        admin_call: true,
      };
      await axios({
        method: "put",
        url: nse_api,
        data: article,
      }).then((response) => {
        console.log(response.data);
        setSellFun_stock_PE(false);
        setStock_name_buy_data_PE([]);
        setBidPrice_stock_PE([]);
        setStrikePrice_stock_PE([]);
        setStock_name_live_PE([]);
        setSellPrice_stock_PE([]);
        setStoploss_stock_PE([]);
        setStoploss_stock_PE([]);
        setSquareoff_stock_PE([]);
        setFinalStatus_stock_PE("NA");
        stock_name_PE([]);
        setFruit_PE([]);
      });
    } catch (err) {
      console.log("Error ", err.response);
    }
  };

  return (
    <>
      <NavbarMenu />
      <div className="container">
        <div className="container">
          <div className="col-md-7 mb-1 d-inline p-2 bg-success text-white float-left  ">
            Underlying Index:
            <span id="equity_underlyingVal" className="bold ">
              <b>NIFTY {liveprice} </b>
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
      <div id="chartContainer">
        <Table className="mt-3" id="chartContainer">
          <thead>
            <tr
              style={{
                backgroundColor: "	#ffbf00",
              }}
            >
              <th width="8%" title="Open Interest in contracts"></th>
              <th width="25%" title="Open Interest in contracts">
                PE
              </th>
              <th width="30%" title="Strike Price">
                Strike Price
              </th>
              <th width="25%" title="Open Interest in contracts">
                CE
              </th>
            </tr>
          </thead>
          <tbody>
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
                    {data.PE.openInterest + data.PE.changeinOpenInterest}
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
                    {data.CE.openInterest + data.CE.changeinOpenInterest} (
                    {data.PE.changeinOpenInterest < 0
                      ? data.PE.changeinOpenInterest
                      : null}
                    )
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
                    {data.PE.changeinOpenInterest + data.PE.openInterest} (
                    {data.PE.changeinOpenInterest < 0
                      ? data.PE.changeinOpenInterest
                      : null}
                    )
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
    </>
  );
};

export default Nifty;
