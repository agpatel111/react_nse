// import React, { useEffect, useState } from "react";
// import { NIFTY_API } from "../api/FetchApi";
// import { nse_api } from "../api/LocalApi";
// import NavbarMenu from "../components/Navbar";

// import Table from "react-bootstrap/Table";

// const axios = require("axios").default;

// function Nse() {
//   const [getdata, setGetdata] = useState([]);
//   const [livegreterthan, setLivegreterthan] = useState([]);
//   const [livelessthan, setLiveLessthan] = useState([]);
//   const [pemax, setPemax] = useState([]);
//   const [cemax, setCemax] = useState([]);
//   const [liveprices, setLiveprice] = useState([]);
//   const [pcr, setPcr] = useState([]);

//   const [diffrent, setDiffrent] = useState([]);

//   const [buyyyyyyy, setBuy_price] = useState([]);

//   // const [pe, setPE] = useState([])
//   // const [ce, setCe] = useState([])
//   const [bid_price, setBid_price] = useState([]);
//   const [strike_price, setStrike_price] = useState([]);

//   const [livebridprice, setLivebdp] = useState([]);
//   const [p_data, setP_data] = useState([]);
//   const [s_data, setS_data] = useState([]);
//   const [buy_stutas, setBuy_stutas] = useState([]);
//   const [tablebridprice, setTablebridprice] = useState([]);
//   const [percentagesofbaseprice, setPercentagesofbaseprice] = useState([]);
//   const [stoplose, setStoplose] = useState([]);
//   const [abdata, setAbdata] = useState([]);
//   const [id, setid] = useState([]);
//   const [percentage, setPercentage] = useState([]);
//   const [setting_id, setSetting_id] = useState([]);

//   // console.log('buy>>>>>>>>>>',tablebridprice);
//   useEffect(() => {
//     fetchData();
//     gettabledata();
//     toplossgetdata();
//     const interval = setInterval(() => {
//       console.log(
//         "This will run every second!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
//       );
//       fetchData();
//       toplossgetdata();
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   // console.log('buy_stutas', buy_stutas);
//   useEffect(() => {
//     nsedata();
//   }, [bid_price]);

//   useEffect(() => {
//     shelldata();
//   }, [p_data]);

//   useEffect(() => {
//     shelldata();
//   }, [s_data]);

//   // const data_headers = {

//   //     headers: {
//   //         "access-control-allow-origin": "*",
//   //         "Content-type": "application/json; charset=UTF-8"
//   //     }
//   // }

//   async function fetchData() {
//     await axios
//       .get(NIFTY_API)

//       .then((json) => {
//         // console.log("buy>>>>>.",buy.lenth);
//         // console.log('json', json.data)

//         // setData(json.data.records.index)
//         // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< All DATA SAVE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//         let raa = json.data.records.timestamp;

//         setGetdata(raa);

//         // <<<<<<<<<<<<<<<<<< liveprice >>>>>>>>>>>>>>>>>>

//         let liveprice = json.data.records.underlyingValue;

//         setLiveprice(liveprice);

//         // / <<<<<<<<<< data of live price greterthan >>>>>>>>>>>>>

//         let up_price = json.data.filtered.data.filter((ab) => {
//           let r = ab.strikePrice;
//           return r >= liveprice;
//         });
//         setLivegreterthan(up_price);
//         // console.log("up_price>>>>>>", up_price);

//         // <<<<<<<<<< data of live price lessthan >>>>>>>>>>>>>

//         let down_price = json.data.filtered.data.filter((ab) => {
//           let r = ab.strikePrice;
//           return r <= liveprice;
//         });
//         setLiveLessthan(down_price);
//         // console.log("down_price>>>>>>", down_price);

//         // <<<<<<<<<< DOWN PRICE (BASE PRICE) PE and CE op and change Op sum and find big value >>>>>>>>>>>>>

//         let PE_CE_SUM = down_price.slice(-5).map((val) => {
//           var ss = val.PE.openInterest + val.PE.changeinOpenInterest;

//           return ss;
//         });
//         let compare = (a, b) => {
//           return b - a;
//         };
//         const numAscending = PE_CE_SUM.sort(compare);
//         const num = numAscending.slice(0, 1);
//         // console.log("PE_CE_SUM>>>>>>>>>>>>>>>",numAscending);

//         // console.log('liveprices',liveprices);

//         // <<<<<<<<<< UP PRICE (SARATE PRICE) PE and CE op and change Op sum and find big value >>>>>>>>>>>>>

//         let CE_PE_SUM = up_price.slice(0, 5).map((val) => {
//           var ss = val.CE.openInterest + val.CE.changeinOpenInterest;
//           // console.log("Num>>>>>>>>>>>>>>>", ss);

//           return ss;
//         });
//         let compare1 = (a, b) => {
//           return b - a;
//         };
//         const numAscending1 = CE_PE_SUM.sort(compare1);
//         const num1 = numAscending1.slice(0, 1);
//         // console.log("Num>>>>>>>>>>>>>>>",numAscending1);

//         // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PE IN MAXIMUM OI OF NSE DATA >>>>>>>>>>>>>>>>>
//         const PE_present_price = [];
//         const PE_present_price2 = [];

//         // setPE(PE_present_price2)
//         // console.log(PE_present_price2)
//         down_price.filter((ab) => {
//           let r = ab.PE.changeinOpenInterest + ab.PE.openInterest;

//           if (r === num[0]) {
//             PE_present_price.push(ab);
//             PE_present_price2.push(ab.strikePrice);

//             // console.log("d>>>>>>>>>>>>",ab);
//           }

//           return ab;
//         });
//         // console.log("PE_pregent_price",PE_present_price);
//         setPemax(PE_present_price);

//         // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CE IN MAXIMUM OI OF NSE DATA >>>>>>>>>>>>>>>>>
//         const CE_present_price = [];
//         const CE_present_price2 = [];

//         // setCe(CE_present_price2)

//         up_price.map((ab) => {
//           let r = ab.CE.changeinOpenInterest + ab.CE.openInterest;
//           if (r === num1[0]) {
//             // console.log(ab.strikePrice);
//             CE_present_price.push(ab);
//             CE_present_price2.push(ab.strikePrice);
//           }
//           return ab;
//         });
//         // console.log("CE_pregent_price", CE_present_price);
//         setCemax(CE_present_price);

//         // <.............................. LIVE BRIDPRICE .............>

//         PE_present_price.map((ab) => {
//           let r = ab.CE.bidprice;
//           // console.log("r>>>>>>>>>>>>>",r);
//           setLivebdp(r);

//           // console.log(a);
//           return ab;
//         });

//         // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PCR VALUE FIND >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//         const sum = json.data.filtered.CE.totOI;
//         const sum2 = json.data.filtered.PE.totOI;

//         const PCR = sum2 / sum;

//         setPcr(PCR);
//         // <<<<<<<<<<<<<<<<<<<<<<< PE CE DIFFRINET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//         const CE_PE_Diffrent = [];
//         PE_present_price.map((ab) => {
//           let a =
//             ab.PE.openInterest +
//             ab.PE.changeinOpenInterest -
//             (ab.CE.openInterest + ab.CE.changeinOpenInterest);
//           let s = Math.abs(a);
//           // console.log("}}}}}}}}}]",s);
//           CE_PE_Diffrent.push(s);

//           return ab;
//         });
//         setDiffrent(CE_PE_Diffrent);

//         // abdata.map((ab)=>{
//         //     let tablebridprice = ab.buy_price
//         //     console.log(">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<",ab.percentage.percentage)

//         //     let profit = tablebridprice * 0.1 + tablebridprice
//         //     let loss =  tablebridprice - tablebridprice * 0.1
//         //     // console.log(livebridprice);
//         //     if (profit <= livebridprice) {

//         //         setP_data("hello")

//         //     }if (loss >= livebridprice) {

//         //         setS_data("HELL")

//         //     }
//         // })
//       })

//       .catch((err) => {
//         console.log(err);
//       });

//     // let fix_bridprice = tablebridprice
//     // console.log("hellooooo",tablebridprice);
//   }

//   // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< post >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>........
//   const nsedata = async () => {
//     try {
//       console.log("bid_price", bid_price);
//       console.log("strike_price", strike_price);

//       const article = {
//         buy_price: bid_price,
//         base_strike_price: strike_price,
//         live_Strike_price: liveprices,
//         live_brid_price: livebridprice,
//         sell_price: percentagesofbaseprice,
//         stop_loseprice: stoplose,
//         percentage: 2,
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
//       // here we are receiving validation errors
//       console.log("Err == ", err.response);
//       // console.log(err.response.data.errors);
//     }
//   };

//   const shelldata = async () => {
//     try {
//       const article = {
//         id: id,
//         exit_price: livebridprice,
//         shell_strike_price: liveprices,
//         sell_buy_time: getdata,
//       };

//       // console.log("patch_data----------------", article);
//       await axios({
//         method: "put",
//         url: nse_api,
//         data: article,
//       }).then((response) => {
//         console.log(response.data);
//       });
//     } catch (err) {
//       console.log("Err == ", err.response);
//     }
//   };
//   const toplossgetdata = async () => {
//     axios.get(nse_api).then((response) => {
//       let r = response.data.data;
//       r.map((ab) => {
//         let d = ab.percentage.option;
//         setSetting_id(d);
//         // console.log(ab.percentage.percentage);
//         let n =
//           (ab.live_brid_price * ab.percentage.percentage) / 100 +
//           ab.live_brid_price;

//         let s =
//           ab.live_brid_price -
//           (ab.live_brid_price * ab.percentage.percentage) / 100;
//         console.log(n, s);

//         if (buy_stutas === "BUY" && ab.percentage.option === "NIFTY") {
//           if (n <= livebridprice) {
//             let c = "ab";

//             setP_data(c);
//           }
//           if (s >= livebridprice) {
//             let s = "ab";

//             setS_data(s);
//           }
//         }
//       });
//     });
//   };

//   const gettabledata = async () => {
//     axios.get(nse_api).then((response) => {
//       let r = response.data.data;
//       setAbdata(r);
//       // console.log("R++++++++++++++++++", r);
//       r.map((ab, i) => {
//         let p = ab;
//         let f = ab.percentage;
//         let a = ab.id;
//         let c = ab.status;
//         let g = ab.live_brid_price;
//         // console.log("id>>>>>>>>>>>>>>>>>", g);
//         setPercentage(f);
//         setTablebridprice(g);
//         setBuy_stutas(c);
//         setid(a);

//         // let n = ab.live_brid_price * 10 / 100 + ab.live_brid_price

//         // let s = ab.live_brid_price - ab.live_brid_price * 10 / 100
//         // console.log(n, s);
//         // // console.log("TRUE AND FALSE",r);
//         // if (c === "BUY") {
//         //     if (n <= livebridprice) {
//         //         let c = "ab"

//         //         // setP_data(c)
//         //     }
//         //     if (s >= livebridprice) {
//         //         let s = "ab"

//         //         // setS_data(s)
//         //     }
//         // }
//       });
//     });
//   };

//   const buys = [];
//   pemax.map((ab) => {
//     if (pemax !== cemax && diffrent >= 50000 && pcr >= 0.9) {
//       let r = ab.strikePrice + 20;
//       // console.log(r);
//       // console.log(20000 >= liveprices);

//       if (20000 >= liveprices) {
//         let a = 0;

//         // console.log('buy.length', buy.length);
//         while (buyyyyyyy.length === 0 && a === 0) {
//           // console.log(ab);
//           buys.push(ab);
//           setBuy_price([...buyyyyyyy, ab]);
//           a = 1;
//         }
//       }
//     }
//     return ab;
//   });

//   const Brid_price = [];

//   buys.map((ab) => {
//     let r = ab.CE.bidprice;
//     let a = ab.strikePrice;
//     console.log("percentage>>>>>>>>>>>", buy_stutas === "BUY");
//     if (buy_stutas === "BUY" && setting_id === "NIFTY") {
//       console.log("can not buy");
//     } else {
//       if (setting_id != "NIFTY" && buy_stutas !== "BUY") {
//         setBid_price(r);
//       }
//     }
//     // console.log("HEloo>>>>>>>", tablebridprice);

//     setStrike_price(a);
//     Brid_price.push(ab.CE.bidprice);
//   });

//   // <-------------------------------- sell and percentages -------------------------->

//   const Brid_price_profit = [];

//   Brid_price.map((ab, i) => {
//     let q = (ab * 10) / 100 + ab;
//     let d = ab - (ab * 10) / 100;
//     console.log("profit", q);
//     console.log("loss", d);

//     let r = q.toFixed(1);
//     let f = d.toFixed(1);

//     setPercentagesofbaseprice(r);
//     setStoplose(f);
//     // if (buy_stutas === "BUY" && percentage === 2) {
//     //     if (q <= livebridprice) {
//     //         let c = "ab"

//     //         setP_data(c)
//     //     }
//     //     if (d >= livebridprice) {
//     //         let s = "ab"

//     //         setS_data(s)
//     //     }
//     // }

//     // console.log("Brid_price",r);
//     Brid_price_profit.push(r);
//   });

//   // abdata.map((ab) => {
//   //     let d = ab.status
//   //     let q = ab.percentage
//   //     // console.log("Q-----------------",q);
//   //     let n = d * 10 / 100 + d

//   //     let s = d - d * 10 / 100

//   //     // if(q === 2){console.log("hello");}
//   //     // console.log(n, s);
//   //     // console.log("TRUE AND FALSE",q);
//   // if (d === "BUY" && q === 2) {
//   //     if (n <= livebridprice) {
//   //         let c = "ab"

//   //         setP_data(c)
//   //     }
//   //     if (s >= livebridprice) {
//   //         let s = "ab"

//   //         setS_data(s)
//   //     }
//   // }
//   // })

//   return (
//     <>
//       <NavbarMenu />

//       <div className='container'>
//         <div className='container'>
//           <div className='col-md-7 mb-1 d-inline p-2 bg-success text-white float-left  '>
//             Underlying Index:{" "}
//             <span id='equity_underlyingVal' className='bold '>
//               <b>BANKNIFTY {liveprices} </b>
//             </span>
//             <span id='equity_timeStamp' className='asondate'>
//               {" "}
//               As on {getdata} IST{" "}
//             </span>
//           </div>
//         </div>
//         <div>
//           {/* toFixed(2) */}
//           <div className='d-inline p-2 bg-success text-white float-right'>
//             PCR = {Number(pcr).toFixed(2)}
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
//             {/* <<<<<<<<<<<<<<<<<<< down price  >>>>>>>>>>>>>>>>>>>> */}
//             {livelessthan.slice(-10).map((data, i) => {
//               return (
//                 <tr>
//                   <td
//                     style={{
//                       backgroundColor: pemax[0] === data ? "#ff1000" : null,
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
//             {/* <<<<<<<<<<<<<<<<<<< up price  >>>>>>>>>>>>>>>>>>>> */}
//             {livegreterthan.slice(0, 10).map((data, i) => {
//               return (
//                 <tr>
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
//                       backgroundColor: cemax[0] === data ? "#ff1000" : null,
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
//     </>
//   );
// }
// export default Nse;
