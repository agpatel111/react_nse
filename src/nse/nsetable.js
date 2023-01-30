// ""import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BANKNIFTY_API } from "../api/FetchApi";
// import { nse_api } from "../api/LocalApi";
// import { SETTINGS_API } from "../api/LocalApi";
// import NavbarMenu from "../components/Navbar";
// import { Table } from "react-bootstrap";
// import moment from "moment/moment";

// const Nsetable = () => {
//   const [timestamp, setTimeStamp] = useState([]);
//   const [liveprice, setLiveprice] = useState([]);
//   const [graterThanLive, setGraterThan] = useState([]);
//   const [lessThanLive, setLessThanLive] = useState([]);
//   const [ceMax, setCEmax] = useState([]);
//   const [peMax, setPEmax] = useState([]);
//   const [liveBidPrice, setLiveBidprice] = useState([]);
//   const [pcrValue, setPcrValue] = useState([]);
//   const [cepeDiffrent, setCePeDiffrent] = useState([]);
//   const [buyPrice, setBuyPrice] = useState([]);
//   const [bidPrice, setBidPrice] = useState([]);
//   const [strikePrice, setStrikePrice] = useState([]);
//   const [jugad, setJugad] = useState(10);
//   const [sellbidPrice, sellBidPrice] = useState([]);

//   // LOCAL URL

//   const [call, setCAll] = useState("");
//   const [basePlus, setBasePlus] = useState([]);
//   const [putPcr, setPutPcr] = useState([]);
//   const [callPcr, setCallPcr] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [optionId, setOptionId] = useState(1);
//   const [profitPercentage, setProfitPercentage] = useState([]);
//   const [lossPercentage, setLossPercentage] = useState([]);
//   const [sellPrice, setSellPrice] = useState([]);
//   const [stopLoss, setStopLoss] = useState([]);
//   const [oneStock, setOneStock] = useState(true);
//   const [sellFunCall, setSellFunCall] = useState(false);
//   const [localDataId, setLocalDataId] = useState(false);
//   const [buyCondition, setBuyCondition] = useState(true);
//   const [finalStatus, setFinalStatus] = useState("NA");

//   useEffect(() => {
//     document.title = "BankNifty";
//     getLocalData();
//     getApiData();
//     let count = 0;
//     const interval = setInterval(() => {
//       count = count + 1;
//       console.log(
//         `<--------------------------------------Interval--(${count})--------------------------------------------->`
//       );
//       count === 31 && window.location.reload();
//       // console.log("buyPrice", buyPrice);

//       getLocalData();
//       getApiData();
//       conditionFunction();
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (cepeDiffrent.length !== 0) {
//       getLocalData();
//       if (jugad !== 10) {
//         mainBuyConditionFun();
//         conditionFunction();
//       }
//     } else {
//     }
//   }, [cepeDiffrent, jugad, buyPrice]);

//   useEffect(() => {
//     if (bidPrice.length !== 0) {
//       //   postData();
//     } else {
//     }
//   }, [bidPrice]);

//   useEffect(() => {
//     if (sellFunCall === true) {
//       //   sellData();
//     }
//   }, [sellFunCall]);
//   // API DATA
//   async function getApiData() {
//     await axios
//       .get(BANKNIFTY_API)

//       .then((json) => {
//         let time_stamp = json.data.records.timestamp;
//         setTimeStamp(time_stamp);
//         // < ---------------- Liveprice -------------------------------->
//         let liveprices = json.data.records.index.last;
//         setLiveprice(liveprices);
//         // < ---------------- GraterThan -------------------------------->
//         let up_price = json.data.filtered.data.filter((val) => {
//           let r = val.strikePrice;
//           return r >= liveprices;
//         });
//         setGraterThan(up_price);
//         // < ---------------- LessThanLive -------------------------------->
//         let down_price = json.data.filtered.data.filter((val) => {
//           let r = val.strikePrice;
//           return r <= liveprices;
//         });
//         setLessThanLive(down_price);
//         // < ------------------------------------------------>
//         let filterddata = json.data.filtered.data;
//         setFilteredData(filterddata);
//         // < ------------------------------------------------>
//         let PE_CE_SUM = down_price.slice(-5).map((val) => {
//           var ss = val.PE.openInterest + val.PE.changeinOpenInterest;
//           return ss;
//         });
//         let compare = (a, b) => {
//           return b - a;
//         };
//         const numAscending = PE_CE_SUM.sort(compare);
//         const num = numAscending.slice(0, 1);
//         // < ------------------------------------------------>
//         let CE_PE_SUM = up_price.slice(0, 5).map((val) => {
//           var ss = val.CE.openInterest + val.CE.changeinOpenInterest;
//           return ss;
//         });
//         let compare1 = (a, b) => {
//           return b - a;
//         };
//         const numAscending1 = CE_PE_SUM.sort(compare1);
//         const num1 = numAscending1.slice(0, 1);
//         // < ---------------- Pemax -------------------------------->
//         const PE_present_price = [];
//         const PE_present_price2 = [];
//         down_price.filter((ab) => {
//           let r = ab.PE.changeinOpenInterest + ab.PE.openInterest;
//           if (r === num[0]) {
//             PE_present_price.push(ab);
//             PE_present_price2.push(ab.strikePrice);
//           }
//           return ab;
//         });
//         setPEmax(PE_present_price);
//         // < ----------------- CEmax ------------------------------->
//         const CE_present_price = [];
//         const CE_present_price2 = [];
//         up_price.map((ab) => {
//           let r = ab.CE.changeinOpenInterest + ab.CE.openInterest;
//           if (r === num1[0]) {
//             CE_present_price.push(ab);
//             CE_present_price2.push(ab.strikePrice);
//           }
//           return ab;
//         });
//         setCEmax(CE_present_price);
//         // < ----------------- Live BD Price ------------------------------->
//         PE_present_price.map((ab) => {
//           let BD = ab.CE.bidprice;
//           setLiveBidprice(BD);
//           return ab;
//         });
//         // < ----------------- PCR Value ------------------------------->
//         const sum = json.data.filtered.CE.totOI;
//         const sum2 = json.data.filtered.PE.totOI;
//         const PCR = sum2 / sum;
//         setPcrValue(PCR);
//         // < ----------------- CE PE Diffrent ------------------------------->
//         const CE_PE_Diffrent = [];
//         PE_present_price.map((ab) => {
//           let a =
//             ab.PE.openInterest +
//             ab.PE.changeinOpenInterest -
//             (ab.CE.openInterest + ab.CE.changeinOpenInterest);
//           let s = Math.abs(a);
//           CE_PE_Diffrent.push(s);
//           return ab;
//         });
//         setCePeDiffrent(CE_PE_Diffrent);
//         // < ------------------------------------------------>
//       })
//       .catch((e) => console.log(e));
//   }

//   const getLocalData = async () => {
//     fetch(SETTINGS_API)
//       .then((response) => response.json())
//       .then((data) => {
//         data.data.map((val) => {
//           if (val.option === "BANKNIFTY") {
//             setCallPcr(val.call_pcr);
//             setPutPcr(val.put_pcr);
//             setBasePlus(val.baseprice_plus);
//             setProfitPercentage(val.profit_percentage);
//             setLossPercentage(val.loss_percentage);
//             setOptionId(val.id);
//             return val;
//           }
//         });
//       });

//     await fetch(nse_api)
//       .then((res) => res.json())
//       .then((json) => {
//         // setLocalData(json);
//         //  BUY CONDITION
//         if (json.data.length === 0) {
//           json.data = [{ percentage: { option: "BANKNIFTY" }, status: "" }];
//         }
//         for (var i of json.data) {
//           if (i.percentage.option !== "BANKNIFTY") {
//             i.percentage.option = "BANKNIFTY";
//             if (
//               i.percentage.option === "BANKNIFTY" &&
//               i.status !== "BUY" &&
//               i.call_put !== "CALL"
//             ) {
//               console.log("yes you can buy in call");
//               setBuyCondition(true);
//               break;
//             } else {
//               setBuyCondition(false);
//             }
//           }
//         }

//         var date = moment();
//         var currentDate = date.format("D/MM/YYYY");
//         let profit = 0;
//         let loss = 0;
//         for (var j of json.data) {
//           var Buy_Date = moment(j.buy_time).format("D/MM/YYYY");
//           if (Buy_Date === currentDate && j.percentage.option === "BANKNIFTY") {
//             if (j.final_status === "PROFIT") {
//               profit = profit + 1;
//             } else if (j.final_status === "LOSS") {
//               loss = loss + 1;
//             }
//           }
//         }
//         if (profit > loss) {
//           setOneStock(false);
//         } else {
//           setOneStock(true);
//         }
//         // if (
//         //   Buy_Date === currentDate &&
//         //   i.buy_time !== undefined &&
//         //   i.percentage.option === "BANKNIFTY"
//         // ) {
//         //   setOneStock(false);
//         //   break;
//         // } else {
//         //   setOneStock(true);
//         // }

//         json.data.map((val) => {
//           setJugad(2 + 1);

//           // SELL CONDITION
//           if (val.status === "BUY" && val.percentage.option === "BANKNIFTY") {
//             let sell_Price = // val.sell_price;
//               (val.buy_price * val.percentage.profit_percentage) / 100 +
//               val.buy_price;

//             let stop_Loss = // val.stop_loseprice;
//               val.buy_price -
//               (val.buy_price * val.percentage.loss_percentage) / 100;

//             // if (buyBidPrice.length !== 0) {
//             if (filteredData.length !== 0) {
//               let BuyLivePrice = [];
//               let strikePrice = val.base_strike_price;
//               filteredData.map((value) => {
//                 if (value.strikePrice === strikePrice) {
//                   if (val.call_put === "CALL") {
//                     let buuybidprice = value.CE.bidprice;
//                     BuyLivePrice.push(buuybidprice);
//                     sellBidPrice(buuybidprice);
//                   } else if (val.call_put === "PUT") {
//                     let buuybidprice = value.PE.bidprice;
//                     BuyLivePrice.push(buuybidprice);
//                     sellBidPrice(buuybidprice);
//                   }
//                 }
//               });

//               if (val.admin_call === true) {
//                 val.buy_price < BuyLivePrice
//                   ? setFinalStatus("PROFIT")
//                   : setFinalStatus("LOSS");
//                 setLocalDataId(val.id);
//                 setSellFunCall(true);
//               }

//               console.log(
//                 "buy_price:",
//                 val.buy_price,
//                 "sell_Price:",
//                 sell_Price,
//                 "liveBidPrice:",
//                 BuyLivePrice,
//                 "stop_Loss:",
//                 stop_Loss
//               );
//               if (sell_Price <= BuyLivePrice) {
//                 setFinalStatus("PROFIT");
//                 setLocalDataId(val.id);
//                 setSellFunCall(true);
//               }
//               if (stop_Loss >= BuyLivePrice) {
//                 setFinalStatus("LOSS");
//                 setLocalDataId(val.id);
//                 setSellFunCall(true);
//               }
//             }
//             // }
//           }
//         });
//       })
//       .catch((e) => console.log(e));
//   };

//   const mainBuyConditionFun = () => {
//     if (oneStock === true && buyCondition === true) {
//       const Buy_Price = [];
//       peMax.map((ab) => {
//         if (peMax !== ceMax && cepeDiffrent >= 50000) {
//           if (pcrValue >= callPcr) {
//             let basePricePlus = ab.strikePrice + basePlus;
//             if (basePricePlus >= liveprice) {
//               let a = 0;
//               while (buyPrice.length === 0 && a === 0) {
//                 Buy_Price.push(ab);
//                 setBuyPrice([...buyPrice, ab]);
//                 setCAll("CALL");
//                 a = 1;
//               }
//             }
//           } else if (pcrValue < putPcr) {
//             let basePricePlus = ab.strikePrice + basePlus;
//             if (basePricePlus >= liveprice) {
//               let a = 0;
//               while (buyPrice.length === 0 && a === 0) {
//                 Buy_Price.push(ab);
//                 setBuyPrice([...buyPrice, ab]);
//                 setCAll("PUT");
//                 a = 1;
//               }
//             }
//           }
//         }
//         return ab;
//       });
//     }
//   };

//   const conditionFunction = () => {
//     // console.log("local", localData?.percentage?.option);

//     if (jugad !== 10) {
//       if (oneStock === false && buyCondition === true) {
//         console.log("YOU HAVE MAKE PROFIT TODAY IN BANKNIFTY");
//         setOneStock(true);
//       } else {
//         buyCondition === true
//           ? console.log(
//               "YOU CAN BUYYYY",
//               "cepeDiffrent:",
//               cepeDiffrent,
//               "pcrValue:",
//               pcrValue,
//               "buyPrice:",
//               buyPrice
//             )
//           : console.log("Cannot BUY You Have Stock in DB");
//         if (buyPrice.length !== 0) {
//           if (buyCondition === true) {
//             buyPrice.map((ab) => {
//               if (call === "CALL") {
//                 let bdprice = ab.CE.bidprice;
//                 setBidPrice(bdprice);
//                 let sell_price = (bdprice * profitPercentage) / 100 + bdprice;
//                 let stop_loss = bdprice - (bdprice * lossPercentage) / 100;
//                 let sell_price_float = sell_price.toFixed(1);
//                 let stop_loss_float = stop_loss.toFixed(1);
//                 setSellPrice(sell_price_float);
//                 setStopLoss(stop_loss_float);
//               } else if (call === "PUT") {
//                 let bdprice = ab.PE.bidprice;
//                 setBidPrice(bdprice);
//                 let sell_price = (bdprice * profitPercentage) / 100 + bdprice;
//                 let stop_loss = bdprice - (bdprice * lossPercentage) / 100;
//                 let sell_price_float = sell_price.toFixed(1);
//                 let stop_loss_float = stop_loss.toFixed(1);
//                 setSellPrice(sell_price_float);
//                 setStopLoss(stop_loss_float);
//               }
//               let stprice = ab.strikePrice;
//               setStrikePrice(stprice);
//             });
//           }
//         }
//       }
//     }
//   };

//   const postData = async () => {
//     try {
//       const article = {
//         buy_price: bidPrice,
//         base_strike_price: strikePrice,
//         live_Strike_price: liveprice,
//         live_brid_price: liveBidPrice,
//         sell_price: sellPrice,
//         stop_loseprice: stopLoss,
//         percentage: optionId,
//         call_put: call,
//       };

//       await axios({
//         method: "post",
//         url: nse_api,
//         mode: "cors",
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//         setCAll("");
//       });
//     } catch (err) {
//       console.log("Error", err.response);
//     }
//   };

//   const sellData = async () => {
//     try {
//       const article = {
//         id: localDataId,
//         exit_price: sellbidPrice,
//         live_brid_price: sellbidPrice,
//         shell_strike_price: liveprice,
//         sell_buy_time: timestamp,
//         final_status: finalStatus,
//         admin_call: true,
//         admin_call: true,
//       };

//       await axios({
//         method: "put",
//         url: nse_api,
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//         setSellFunCall(false);
//         setBuyPrice([]);
//         setBidPrice([]);
//         setStrikePrice([]);
//         setLiveprice([]);
//         setLiveBidprice([]);
//         setSellPrice([]);
//         setStopLoss([]);
//         setFinalStatus("NA");
//       });
//     } catch (err) {
//       console.log("Error ", err.response);
//     }
//   };

//   return (
//     <>
//       <NavbarMenu />

//       <div className='container'>
//         <div className='container'>
//           <div className='col-md-7 mb-1 d-inline p-2 bg-success text-white float-left  '>
//             Underlying Index:
//             <span id='equity_underlyingVal' className='bold '>
//               <b>BANKNIFTY {liveprice} </b>
//             </span>
//             <span id='equity_timeStamp' className='asondate'>
//               As on {timestamp} IST
//             </span>
//           </div>
//         </div>
//         <div>
//           <div className='d-inline p-2 bg-success text-white float-right'>
//             PCR = {Number(pcrValue).toFixed(2)}
//           </div>
//         </div>
//       </div>

//       <div id='chartContainer'>
//         <Table className='mt-3' id='chartContainer'>
//           <thead>
//             <tr
//               style={{
//                 backgroundColor: "	#ffbf00",
//               }}
//             >
//               <th width='30%' title='Open Interest in contracts'>
//                 PE
//               </th>

//               <th width='40%' title='Strike Price'>
//                 Strike Price
//               </th>

//               <th width='40%' title='Open Interest in contracts'>
//                 CE
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {lessThanLive.slice(-10).map((data, i) => {
//               return (
//                 <tr key={i}>
//                   <td
//                     style={{
//                       backgroundColor: peMax[0] === data ? "#ff1000" : null,
//                     }}
//                   >
//                     {data.PE.openInterest + data.PE.changeinOpenInterest}
//                   </td>
//                   <td
//                     style={{
//                       backgroundColor: "#66CDAA",
//                     }}
//                   >
//                     <b>{data.strikePrice}</b>
//                   </td>

//                   <td
//                     style={{
//                       backgroundColor: "#33F9FF",
//                     }}
//                   >
//                     {data.CE.openInterest + data.CE.changeinOpenInterest}
//                   </td>
//                 </tr>
//               );
//             })}

//             {graterThanLive.slice(0, 10).map((data, i) => {
//               return (
//                 <tr key={i}>
//                   <td
//                     style={{
//                       backgroundColor: "#33F9FF",
//                     }}
//                   >
//                     {data.PE.changeinOpenInterest + data.PE.openInterest}
//                   </td>

//                   <td
//                     style={{
//                       backgroundColor: "#66CDAA",
//                     }}
//                   >
//                     <b>{data.strikePrice}</b>
//                   </td>

//                   <td
//                     style={{
//                       backgroundColor: ceMax[0] === data ? "#ff1000" : null,
//                     }}
//                   >
//                     {data.CE.openInterest + data.CE.changeinOpenInterest}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>

//       {/* <div>Countdown: {counter}</div> */}
//       {/* <div>
//         <div class='alert alert-warning'>
//           <div class='container'>
//             <button
//               type='button'
//               class='close'
//               data-dismiss='alert'
//               aria-label='Close'
//             >
//             </button>
//             <b>You Can Not Buy</b>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default Nsetable;
// ""