// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BANKNIFTY_API } from "../api/FetchApi";
// import { nse_api } from "../api/LocalApi";
// import NavbarMenu from "../components/Navbar";
// import { Table } from "react-bootstrap";
// import moment from "moment/moment";

// const BankNifty = () => {
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
//   // LOCAL URL

//   const [optionId, setOptionId] = useState(1);
//   const [percentage, setPercentage] = useState([]);
//   const [sellPrice, setSellPrice] = useState([]);
//   const [stopLoss, setStopLoss] = useState([]);
//   const [oneStock, setOneStock] = useState(true);
//   const [sellFunCall, setSellFunCall] = useState(false);
//   const [localDataId, setLocalDataId] = useState(false);
//   const [buyCondition, setBuyCondition] = useState(true);

//   useEffect(() => {
//     getLocalData();
//     getApiData();
//     let count = 0;
//     const interval = setInterval(() => {
//       count = count + 1;
//       console.log(
//         `<--------------------------------------Interval--(${count})--------------------------------------------->`
//       );
//       count === 26 && window.location.reload();

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
//         conditionFunction();
//       }
//     } else {
//     }
//   }, [cepeDiffrent, jugad]);

//   useEffect(() => {
//     if (bidPrice.length !== 0) {
//       postData();
//     } else {
//     }
//   }, [bidPrice]);

//   useEffect(() => {
//     if (sellFunCall === true) {
//       sellData();
//     }
//   }, [sellFunCall]);
//   // API DATA
//   async function getApiData() {
//     let FetchData = await axios
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
//     await fetch(nse_api)
//       .then((res) => res.json())
//       .then((json) => {
//         //  BUY CONDITION
//         if (json.data.length === 0) {
//           json.data = [{ percentage: { option: "" }, status: "" }];
//         }
//         for (var i of json.data) {
//           if (i.percentage.option === "BankNifty" && i.status === "BUY") {
//             setBuyCondition(false);
//             break;
//           } else {
//             setBuyCondition(true);
//           }
//         }

//         var date = moment();
//         var currentDate = date.format("D/MM/YYYY");
//         for (var i of json.data) {
//           // console.log(i.buy_time);
//           var Buy_Date = moment(i.buy_time).format("D/MM/YYYY");
//           // console.log(i.buy_time);
//           if (
//             Buy_Date === currentDate &&
//             i.buy_time !== undefined &&
//             i.percentage.option === "BankNifty"
//           ) {
//             setOneStock(false);
//             break;
//           } else {
//             setOneStock(true);
//           }
//         }

//         json.data.map((val) => {
//           setJugad(2 + 1);
//           // setBuyTime(val.buy_time);
//           // SELL CONDITION
//           if (val.percentage.option === "BankNifty") {
//             setPercentage(val.percentage.percentage);
//             setOptionId(val.percentage.id);
//             if (val.status === "BUY" && val.percentage.option === "BankNifty") {
//               let sell_Price = val.sell_price;
//               // (val.buy_price * val.percentage.percentage) / 100 +
//               // val.buy_price;

//               let stop_Loss = val.stop_loseprice;
//               // val.buy_price - (val.buy_price * val.percentage.percentage) / 100;
//               if (liveBidPrice.length !== 0) {
//                 console.log(
//                   "buy_price:",
//                   val.buy_price,
//                   "sell_Price:",
//                   sell_Price,
//                   "liveBidPrice:",
//                   liveBidPrice,
//                   "stop_Loss:",
//                   stop_Loss
//                 );
//                 if (sell_Price <= liveBidPrice) {
//                   setLocalDataId(val.id);
//                   setSellFunCall(true);
//                 }
//                 // if (stop_Loss >= liveBidPrice) {
//                 //   setLocalDataId(val.id);
//                 //   setSellFunCall(true);
//                 // }
//               }
//             }
//           }
//         });
//       })
//       .catch((e) => console.log(e));
//   };

//   const Buy_Price = [];
//   peMax.map((ab) => {
//     if (peMax !== ceMax && cepeDiffrent >= 50000 && pcrValue >= 0.9) {
//       let r = ab.strikePrice + 90;
//       if (50000 >= liveprice) {
//         let a = 0;
//         while (buyPrice.length === 0 && a === 0) {
//           Buy_Price.push(ab);
//           setBuyPrice([...buyPrice, ab]);
//           a = 1;
//         }
//       }
//     }
//     return ab;
//   });

//   const conditionFunction = () => {
//     const Brid_price = [];
//     // console.log("local", localData?.percentage?.option);

//     if (jugad !== 10) {
//       // oneStock === false
//       //   ? console.log("YOU HAVE TRADE ONE STOCK TODAY")
//       //   : console.log("YOU CAN BUY");
//       if (oneStock === false && buyCondition === true) {
//         console.log("YOU HAVE TRADE ONE STOCK TODAY");
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

//         if (bidPrice.length !== 0) {
//           setBidPrice([]);
//         }
//         if (buyCondition === true) {
//           buyPrice.map((ab) => {
//             let bdprice = ab.CE.bidprice;
//             let stprice = ab.strikePrice;
//             setBidPrice(bdprice);
//             setStrikePrice(stprice);
//             Brid_price.push(ab.CE.bidprice);
//           });
//         }
//       }

//       // setStrikePrice(stprice);
//     }
//     // const Brid_price_profit = [];
//     Brid_price.map((ab, i) => {
//       let sell_price = (ab * percentage) / 100 + ab;
//       let stop_loss = ab - (ab * percentage) / 100;

//       let sell_price_float = sell_price.toFixed(1);
//       let stop_loss_float = stop_loss.toFixed(1);
//       setSellPrice(sell_price_float);
//       setStopLoss(stop_loss_float);
//       // postData();
//       // Brid_price_profit.push(r);
//     });
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
//       };

//       await axios({
//         method: "post",
//         url: nse_api,
//         mode: "cors",
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//       });
//     } catch (err) {
//       console.log("Error", err.response);
//     }
//   };

//   const sellData = async () => {
//     try {
//       const article = {
//         id: localDataId,
//         exit_price: liveBidPrice,
//         live_brid_price: liveBidPrice,
//         shell_strike_price: liveprice,
//         sell_buy_time: timestamp,
//       };

//       await axios({
//         method: "put",
//         url: nse_api,
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//         setSellFunCall(false);
//         setBidPrice([]);
//         setStrikePrice([]);
//         setLiveprice([]);
//         setLiveBidprice([]);
//         setSellPrice([]);
//         setStopLoss([]);
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

// export default BankNifty;

// 13 DEC

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BANKNIFTY_API } from "../api/FetchApi";
// import { nse_api } from "../api/LocalApi";
// import NavbarMenu from "../components/Navbar";
// import { Table } from "react-bootstrap";
// import moment from "moment/moment";

// const BankNifty = () => {
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
//   // LOCAL URL

//   const [optionId, setOptionId] = useState(1);
//   const [percentage, setPercentage] = useState([]);
//   const [sellPrice, setSellPrice] = useState([]);
//   const [stopLoss, setStopLoss] = useState([]);
//   const [oneStock, setOneStock] = useState(true);
//   const [sellFunCall, setSellFunCall] = useState(false);
//   const [localDataId, setLocalDataId] = useState(false);
//   const [buyCondition, setBuyCondition] = useState(true);
//   const [finalStatus, setFinalStatus] = useState("NA");

//   useEffect(() => {
//     getLocalData();
//     getApiData();
//     let count = 0;
//     const interval = setInterval(() => {
//       count = count + 1;
//       console.log(
//         `<--------------------------------------Interval--(${count})--------------------------------------------->`
//       );
//       count === 26 && window.location.reload();

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
//         conditionFunction();
//       }
//     } else {
//     }
//   }, [cepeDiffrent, jugad]);

//   useEffect(() => {
//     if (bidPrice.length !== 0) {
//       postData();
//     } else {
//     }
//   }, [bidPrice]);

//   useEffect(() => {
//     if (sellFunCall === true) {
//       sellData();
//     }
//   }, [sellFunCall]);
//   // API DATA
//   async function getApiData() {
//     let FetchData = await axios
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
//     await fetch(nse_api)
//       .then((res) => res.json())
//       .then((json) => {
//         //  BUY CONDITION
//         if (json.data.length === 0) {
//           json.data = [{ percentage: { option: "" }, status: "" }];
//         }
//         for (var i of json.data) {
//           if (i.percentage.option === "BankNifty" && i.status === "BUY") {
//             setBuyCondition(false);
//             break;
//           } else {
//             setBuyCondition(true);
//           }
//         }

//         var date = moment();
//         var currentDate = date.format("D/MM/YYYY");
//         let profit = 0;
//         let loss = 0;
//         for (var i of json.data) {
//           var Buy_Date = moment(i.buy_time).format("D/MM/YYYY");
//           if (Buy_Date === currentDate) {
//             if (i.final_status === "PROFIT") {
//               profit = profit + 1;
//             } else if (i.final_status === "LOSS") {
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
//         //   i.percentage.option === "BankNifty"
//         // ) {
//         //   setOneStock(false);
//         //   break;
//         // } else {
//         //   setOneStock(true);
//         // }

//         json.data.map((val) => {
//           setJugad(2 + 1);
//           // setBuyTime(val.buy_time);
//           // SELL CONDITION
//           if (val.percentage.option === "BankNifty") {
//             setPercentage(val.percentage.percentage);
//             setOptionId(val.percentage.id);
//             if (val.status === "BUY" && val.percentage.option === "BankNifty") {
//               let sell_Price = val.sell_price;
//               // (val.buy_price * val.percentage.percentage) / 100 +
//               // val.buy_price;

//               let stop_Loss = val.stop_loseprice;
//               // val.buy_price - (val.buy_price * val.percentage.percentage) / 100;
//               if (liveBidPrice.length !== 0) {
//                 console.log(
//                   "buy_price:",
//                   val.buy_price,
//                   "sell_Price:",
//                   sell_Price,
//                   "liveBidPrice:",
//                   liveBidPrice,
//                   "stop_Loss:",
//                   stop_Loss
//                 );
//                 if (sell_Price <= liveBidPrice) {
//                   setFinalStatus("PROFIT");
//                   setLocalDataId(val.id);
//                   setSellFunCall(true);
//                 }
//                 if (stop_Loss >= liveBidPrice) {
//                   setFinalStatus("LOSS");
//                   setLocalDataId(val.id);
//                   setSellFunCall(true);
//                 }
//               }
//             }
//           }
//         });
//       })
//       .catch((e) => console.log(e));
//   };

//   const Buy_Price = [];
//   peMax.map((ab) => {
//     if (peMax !== ceMax && cepeDiffrent >= 50000 && pcrValue >= 0.9) {
//       let r = ab.strikePrice + 90;
//       if (50000 >= liveprice) {
//         let a = 0;
//         while (buyPrice.length === 0 && a === 0) {
//           Buy_Price.push(ab);
//           setBuyPrice([...buyPrice, ab]);
//           a = 1;
//         }
//       }
//     }
//     return ab;
//   });

//   const conditionFunction = () => {
//     // console.log("local", localData?.percentage?.option);

//     if (jugad !== 10) {
//       // oneStock === false
//       //   ? console.log("YOU HAVE TRADE ONE STOCK TODAY")
//       //   : console.log("YOU CAN BUY");
//       if (oneStock === false && buyCondition === true) {
//         console.log("YOU HAVE MAKE PROFIT TODAY");
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

//         if (bidPrice.length !== 0) {
//           setBidPrice([]);
//         }
//         if (buyCondition === true) {
//           buyPrice.map((ab) => {
//             let bdprice = ab.CE.bidprice;
//             let stprice = ab.strikePrice;
//             setBidPrice(bdprice);
//             setStrikePrice(stprice);

//             // let sell_price = (bdprice * percentage) / 100 + bdprice;
//             // let stop_loss = bdprice - (bdprice * percentage) / 100;
//             // // let sell_price_float = sell_price.toFixed(1);
//             // // let stop_loss_float = stop_loss.toFixed(1);
//             // console.log("chec");
//             // setSellPrice(sell_price);
//             // setStopLoss(stop_loss);
//           });
//         }
//       }
//       // setStrikePrice(stprice);
//     }
//   };

//   const postData = async () => {
//     try {
//       let sell_price = (bidPrice * percentage) / 100 + bidPrice;
//       let stop_loss = bidPrice - (bidPrice * percentage) / 100;
//       const article = {
//         buy_price: bidPrice,
//         base_strike_price: strikePrice,
//         live_Strike_price: liveprice,
//         live_brid_price: liveBidPrice,
//         sell_price: sell_price,
//         stop_loseprice: stop_loss,
//         percentage: optionId,
//       };

//       await axios({
//         method: "post",
//         url: nse_api,
//         mode: "cors",
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//       });
//     } catch (err) {
//       console.log("Error", err.response);
//     }
//   };

//   const sellData = async () => {
//     try {
//       const article = {
//         id: localDataId,
//         exit_price: liveBidPrice,
//         live_brid_price: liveBidPrice,
//         shell_strike_price: liveprice,
//         sell_buy_time: timestamp,
//         final_status: finalStatus,
//       };

//       await axios({
//         method: "put",
//         url: nse_api,
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//         setSellFunCall(false);
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

// export default BankNifty;

// FINAL 13TH-------------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BANKNIFTY_API } from "../api/FetchApi";
// import { nse_api } from "../api/LocalApi";
// import { SETTINGS_API } from "../api/LocalApi";
// import NavbarMenu from "../components/Navbar";
// import { Table } from "react-bootstrap";
// import moment from "moment/moment";

// const BankNifty = () => {
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
//   // LOCAL URL

//   const [optionId, setOptionId] = useState(1);
//   const [percentage, setPercentage] = useState([]);
//   const [sellPrice, setSellPrice] = useState([]);
//   const [stopLoss, setStopLoss] = useState([]);
//   const [oneStock, setOneStock] = useState(true);
//   const [sellFunCall, setSellFunCall] = useState(false);
//   const [localDataId, setLocalDataId] = useState(false);
//   const [buyCondition, setBuyCondition] = useState(true);
//   const [finalStatus, setFinalStatus] = useState("NA");

//   useEffect(() => {
//     getLocalData();
//     getApiData();
//     console.log("buyPrice", buyPrice);
//     let count = 0;
//     const interval = setInterval(() => {
//       count = count + 1;
//       console.log(
//         `<--------------------------------------Interval--(${count})--------------------------------------------->`
//       );
//       count === 26 && window.location.reload();
//       console.log("buyPrice", buyPrice);

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
//         conditionFunction();
//       }
//     } else {
//     }
//   }, [cepeDiffrent, jugad]);

//   useEffect(() => {
//     if (bidPrice.length !== 0) {
//       postData();
//     } else {
//     }
//   }, [bidPrice]);

//   useEffect(() => {
//     if (sellFunCall === true) {
//       sellData();
//     }
//   }, [sellFunCall]);
//   // API DATA
//   async function getApiData() {
//     let FetchData = await axios
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
//           if (val.option === "BankNifty") {
//             setPercentage(val.percentage);
//             setOptionId(val.id);
//           }
//         });
//       });

//     await fetch(nse_api)
//       .then((res) => res.json())
//       .then((json) => {
//         //  BUY CONDITION
//         if (json.data.length === 0) {
//           json.data = [{ percentage: { option: "" }, status: "" }];
//         }
//         for (var i of json.data) {
//           if (i.percentage.option === "BankNifty" && i.status === "BUY") {
//             setBuyCondition(false);
//             break;
//           } else {
//             setBuyCondition(true);
//           }
//         }

//         var date = moment();
//         var currentDate = date.format("D/MM/YYYY");
//         let profit = 0;
//         let loss = 0;
//         for (var i of json.data) {
//           var Buy_Date = moment(i.buy_time).format("D/MM/YYYY");
//           if (Buy_Date === currentDate) {
//             if (i.final_status === "PROFIT") {
//               profit = profit + 1;
//             } else if (i.final_status === "LOSS") {
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
//         //   i.percentage.option === "BankNifty"
//         // ) {
//         //   setOneStock(false);
//         //   break;
//         // } else {
//         //   setOneStock(true);
//         // }

//         json.data.map((val) => {
//           setJugad(2 + 1);
//           // SELL CONDITION
//           if (val.status === "BUY" && val.percentage.option === "BankNifty") {
//             let sell_Price = val.sell_price;
//             // (val.buy_price * val.percentage.percentage) / 100 +
//             // val.buy_price;

//             let stop_Loss = val.stop_loseprice;
//             // val.buy_price - (val.buy_price * val.percentage.percentage) / 100;
//             if (liveBidPrice.length !== 0) {
//               console.log(
//                 "buy_price:",
//                 val.buy_price,
//                 "sell_Price:",
//                 sell_Price,
//                 "liveBidPrice:",
//                 liveBidPrice,
//                 "stop_Loss:",
//                 stop_Loss
//               );
//               if (sell_Price <= liveBidPrice) {
//                 setFinalStatus("PROFIT");
//                 setLocalDataId(val.id);
//                 setSellFunCall(true);
//               }
//               if (stop_Loss >= liveBidPrice) {
//                 setFinalStatus("LOSS");
//                 setLocalDataId(val.id);
//                 setSellFunCall(true);
//               }
//             }
//           }
//         });
//       })
//       .catch((e) => console.log(e));
//   };

//   const Buy_Price = [];
//   peMax.map((ab) => {
//     if (peMax !== ceMax && cepeDiffrent >= 50000 && pcrValue >= 0.9) {
//       let r = ab.strikePrice + 90;
//       if (50000 >= liveprice) {
//         let a = 0;
//         while (buyPrice.length === 0 && a === 0) {
//           Buy_Price.push(ab);
//           setBuyPrice([...buyPrice, ab]);
//           a = 1;
//         }
//       }
//     }
//     return ab;
//   });

//   const conditionFunction = () => {
//     // console.log("local", localData?.percentage?.option);

//     if (jugad !== 10) {
//       // oneStock === false
//       //   ? console.log("YOU HAVE TRADE ONE STOCK TODAY")
//       //   : console.log("YOU CAN BUY");
//       if (oneStock === false && buyCondition === true) {
//         console.log("YOU HAVE MAKE PROFIT TODAY");
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

//         if (bidPrice.length !== 0) {
//           setBidPrice([]);
//         }
//         if (buyCondition === true) {
//           buyPrice.map((ab) => {
//             let bdprice = ab.CE.bidprice;
//             let stprice = ab.strikePrice;
//             setBidPrice(bdprice);
//             setStrikePrice(stprice);

//             let sell_price = (bdprice * percentage) / 100 + bdprice;
//             let stop_loss = bdprice - (bdprice * percentage) / 100;
//             let sell_price_float = sell_price.toFixed(1);
//             let stop_loss_float = stop_loss.toFixed(1);
//             setSellPrice(sell_price_float);
//             setStopLoss(stop_loss_float);
//           });
//         }
//       }
//       // setStrikePrice(stprice);
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
//       };

//       await axios({
//         method: "post",
//         url: nse_api,
//         mode: "cors",
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//       });
//     } catch (err) {
//       console.log("Error", err.response);
//     }
//   };

//   const sellData = async () => {
//     try {
//       const article = {
//         id: localDataId,
//         exit_price: liveBidPrice,
//         live_brid_price: liveBidPrice,
//         shell_strike_price: liveprice,
//         sell_buy_time: timestamp,
//         final_status: finalStatus,
//       };

//       await axios({
//         method: "put",
//         url: nse_api,
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//         setSellFunCall(false);
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

// export default BankNifty;

// 14Th BackUp----------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { NIFTY_API } from "../api/FetchApi";
// import axios from "axios";
// import { nse_api } from "../api/LocalApi";
// import { SETTINGS_API } from "../api/LocalApi";
// import NavbarMenu from "../components/Navbar";
// import { Table } from "react-bootstrap";
// import moment from "moment/moment";

// const Nifty = () => {
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
//   // LOCAL URL
//   const [optionId, setOptionId] = useState(2);
//   const [percentage, setPercentage] = useState([]);
//   const [sellPrice, setSellPrice] = useState([]);
//   const [stopLoss, setStopLoss] = useState([]);
//   const [sellFunCall, setSellFunCall] = useState(false);
//   const [localDataId, setLocalDataId] = useState(false);
//   const [buyCondition, setBuyCondition] = useState(true);
//   const [oneStock, setOneStock] = useState(true);
//   const [finalStatus, setFinalStatus] = useState("NA");

//   useEffect(() => {
//     getLocalData();
//     getApiData();
//     let count = 0;
//     const interval = setInterval(() => {
//       count = count + 1;
//       console.log(
//         `<--------------------------------------Interval--(${count})--------------------------------------------->`
//       );
//       count === 26 && window.location.reload();
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
//         conditionFunction();
//       }
//     } else {
//     }
//   }, [cepeDiffrent, jugad]);

//   useEffect(() => {
//     if (bidPrice.length !== 0) {
//       postData();
//     } else {
//     }
//   }, [bidPrice]);

//   useEffect(() => {
//     if (sellFunCall === true) {
//       sellData();
//     }
//   }, [sellFunCall]);

//   async function getApiData() {
//     let FetchData = await axios
//       .get(NIFTY_API)

//       .then((json) => {
//         let time_stamp = json.data.records.timestamp;
//         setTimeStamp(time_stamp);
//         // < ---------------- Liveprice -------------------------------->
//         let liveprices = json.data.records.underlyingValue;
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
//           if (val.option === "Nifty") {
//             setPercentage(val.percentage);
//             setOptionId(val.id);
//           }
//         });
//       });

//     await fetch(nse_api)
//       .then((res) => res.json())
//       .then((json) => {
//         if (json.data.length === 0) {
//           json.data = [{ percentage: { option: "Nifty" }, status: "" }];
//         }
//         for (var i of json.data) {
//           if (i.percentage.option === "Nifty" && i.status === "BUY") {
//             setBuyCondition(false);
//             break;
//           } else {
//             setBuyCondition(true);
//           }
//         }

//         var date = moment();
//         var currentDate = date.format("D/MM/YYYY");
//         let profit = 0;
//         let loss = 0;
//         for (var i of json.data) {
//           var Buy_Date = moment(i.buy_time).format("D/MM/YYYY");
//           if (Buy_Date === currentDate && i.percentage.option === "Nifty") {
//             if (i.final_status === "PROFIT") {
//               profit = profit + 1;
//             } else if (i.final_status === "LOSS") {
//               loss = loss + 1;
//             }
//           }
//         }
//         if (profit > loss) {
//           setOneStock(false);
//         } else {
//           setOneStock(true);
//         }

//         json.data.map((val) => {
//           setJugad(2 + 1);
//           // SELL
//           if (val.status === "BUY" && val.percentage.option === "Nifty") {
//             let sell_Price = val.sell_price;
//             // (val.buy_price * val.percentage.percentage) / 100 +
//             // val.buy_price;

//             let stop_Loss = val.stop_loseprice;
//             // val.buy_price -
//             // (val.buy_price * val.percentage.percentage) / 100;

//             if (liveBidPrice.length !== 0) {
//               console.log(
//                 "buy_price:",
//                 val.buy_price,
//                 "sell_Price:",
//                 sell_Price,
//                 "liveBidPrice:",
//                 liveBidPrice,
//                 "stop_Loss:",
//                 stop_Loss
//               );
//               if (sell_Price <= liveBidPrice) {
//                 setFinalStatus("PROFIT");
//                 setLocalDataId(val.id);
//                 setSellFunCall(true);
//               }
//               if (stop_Loss >= liveBidPrice) {
//                 setFinalStatus("LOSS");
//                 setLocalDataId(val.id);
//                 setSellFunCall(true);
//               }
//             }
//           }
//         });
//         // setBuyStatus(BuyStatusArr);
//       })
//       .catch((e) => console.log(e));
//   };

//   const Buy_Price = [];
//   peMax.map((ab) => {
//     if (peMax !== ceMax && cepeDiffrent >= 50000 && pcrValue >= 0.7) {
//       let r = ab.strikePrice + 20;
//       // console.log('r:',r,'liveprice:', liveprice);
//       if (50000 >= liveprice) {
//         let a = 0;
//         while (buyPrice.length === 0 && a === 0) {
//           Buy_Price.push(ab);
//           setBuyPrice([...buyPrice, ab]);
//           a = 1;
//         }
//       }
//     }
//     return ab;
//   });

//   const conditionFunction = () => {
//     // console.log("local", localData?.percentage?.option);
//     if (jugad !== 10) {
//       if (oneStock === false && buyCondition === true) {
//         console.log("YOU HAVE MAKE PROFIT TODAY");
//       } else {
//         buyCondition === true
//           ? console.log(
//               "YOU CAN BUYYYY",
//               "cepeDiffrent:",
//               cepeDiffrent,
//               "pcrValue:",
//               pcrValue
//             )
//           : console.log("Cannot BUY You Have Stock in DB");
//         if (bidPrice.length !== 0) {
//           setBidPrice([]);
//         }
//         if (buyCondition === true) {
//           buyPrice.map((ab) => {
//             let bdprice = ab.CE.bidprice;
//             let stprice = ab.strikePrice;
//             setBidPrice(bdprice);
//             setStrikePrice(stprice);

//             let sell_price = (bdprice * percentage) / 100 + bdprice;
//             let stop_loss = bdprice - (bdprice * percentage) / 100;
//             let sell_price_float = sell_price.toFixed(1);
//             let stop_loss_float = stop_loss.toFixed(1);
//             setSellPrice(sell_price_float);
//             setStopLoss(stop_loss_float);
//           });
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
//       };

//       await axios({
//         method: "post",
//         url: nse_api,
//         mode: "cors",
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//       });
//     } catch (err) {
//       console.log("Error", err.response);
//     }
//   };

//   const sellData = async () => {
//     try {
//       const article = {
//         id: localDataId,
//         exit_price: liveBidPrice,
//         live_brid_price: liveBidPrice,
//         shell_strike_price: liveprice,
//         sell_buy_time: timestamp,
//         final_status: finalStatus,
//       };

//       await axios({
//         method: "put",
//         url: nse_api,
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//         setSellFunCall(false);
//         setBidPrice([]);
//         setStrikePrice([]);
//         setLiveprice([]);
//         setLiveBidprice([]);
//         setSellPrice([]);
//         setStopLoss([]);
//       });
//     } catch (err) {
//       console.log("Error ", err.response);
//     }
//   };

//   return (
//     <div>
//       <>
//         <NavbarMenu />

//         <div className='container'>
//           <div className='container'>
//             <div className='col-md-7 mb-1 d-inline p-2 bg-success text-white float-left  '>
//               Underlying Index:
//               <span id='equity_underlyingVal' className='bold '>
//                 <b>BANKNIFTY {liveprice} </b>
//               </span>
//               <span id='equity_timeStamp' className='asondate'>
//                 As on {timestamp} IST
//               </span>
//             </div>
//           </div>
//           <div>
//             <div className='d-inline p-2 bg-success text-white float-right'>
//               PCR = {Number(pcrValue).toFixed(2)}
//             </div>
//           </div>
//         </div>
//         <div id='chartContainer'>
//           <Table className='mt-3' id='chartContainer'>
//             <thead>
//               <tr
//                 style={{
//                   backgroundColor: "	#ffbf00",
//                 }}
//               >
//                 <th width='30%' title='Open Interest in contracts'>
//                   PE
//                 </th>

//                 <th width='40%' title='Strike Price'>
//                   Strike Price
//                 </th>

//                 <th width='40%' title='Open Interest in contracts'>
//                   CE
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {lessThanLive.slice(-10).map((data, i) => {
//                 return (
//                   <tr key={i}>
//                     <td
//                       style={{
//                         backgroundColor: peMax[0] === data ? "#ff1000" : null,
//                       }}
//                     >
//                       {data.PE.openInterest + data.PE.changeinOpenInterest}
//                     </td>
//                     <td
//                       style={{
//                         backgroundColor: "#66CDAA",
//                       }}
//                     >
//                       <b>{data.strikePrice}</b>
//                     </td>

//                     <td
//                       style={{
//                         backgroundColor: "#33F9FF",
//                       }}
//                     >
//                       {data.CE.openInterest + data.CE.changeinOpenInterest}
//                     </td>
//                   </tr>
//                 );
//               })}

//               {graterThanLive.slice(0, 10).map((data, i) => {
//                 return (
//                   <tr key={i}>
//                     <td
//                       style={{
//                         backgroundColor: "#33F9FF",
//                       }}
//                     >
//                       {data.PE.changeinOpenInterest + data.PE.openInterest}
//                     </td>

//                     <td
//                       style={{
//                         backgroundColor: "#66CDAA",
//                       }}
//                     >
//                       <b>{data.strikePrice}</b>
//                     </td>

//                     <td
//                       style={{
//                         backgroundColor: ceMax[0] === data ? "#ff1000" : null,
//                       }}
//                     >
//                       {data.CE.openInterest + data.CE.changeinOpenInterest}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Nifty;
