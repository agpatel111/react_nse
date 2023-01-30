// import React, { useEffect, useState } from "react";
// // import { FormControl } from "react-bootstrap";

// import NavbarMenu from '../components/Navbar'

// import Table from 'react-bootstrap/Table';
// import Switch from "react-bootstrap/esm/Switch";
// const axios = require('axios').default;

// function Banknifty() {
//     const [data, setData] = useState([]);
//     const [isloading, setLoading] = useState(true);
//     const [getdata, setGetdata] = useState([]);
//     const [livegreterthan, setLivegreterthan] = useState([]);
//     const [livelessthan, setLiveLessthan] = useState([]);
//     const [pemax, setPemax] = useState([]);
//     const [cemax, setCemax] = useState([]);
//     const [liveprices, setLiveprice] = useState([]);
//     const [pcr, setPcr] = useState([]);
//     const [pcr_value, setPcrvaule] = useState([]);

//     const [diffrent, setDiffrent] = useState([]);

//     const [buyyyyyyy, setBuy_price] = useState([])

//     const [pe, setPE] = useState([])
//     const [ce, setCe] = useState([])
//     const [bid_price, setBid_price] = useState([]);
//     const [strike_price, setStrike_price] = useState([]);

//     const [livebridprice, setLivebdp] = useState([])

//     // console.log('buy>>>>>>>>>>',buy);
//     useEffect(() => {

//         fetchData()
//         const interval = setInterval(() => {
//             console.log('This will run every second!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//             fetchData()
//         }, 10000);
//         return () => clearInterval(interval);

//     }, []);

//     useEffect(() => {

//       nsedata()

//     }, [bid_price]);

//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
//     async function fetchData() {
//         await axios.get("https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY", proxyurl, {
//             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//             'Accept-Encoding': 'gzip, deflate, br',
//             'Connection': 'keep-alive',
//             'Cookie': 'AKA_A2=A; ak_bmsc=2C30C88FD1C6BEED087CCD02E7643772~000000000000000000000000000000~YAAQPvASAr+cI2F6AQAAk6+tdQxncocfEFby+qeRnNu3MgRblj1MWVtVy+W1Stx/CNaRaf9PhfVoT568zV8qztByVrxV+WfdrCN2nXU0nToPdEoaZFeZ7irUu8aSUXcln/sou0taKkr1gjmS3f6faZs+Rv8LA32eUAtlTD+GgYL0OKTJ44qVVinDxeeaVOiLxzQaiv0YjRCLcovFhO7jVBCJhNeXzgOeUYCLjkOg+2DEnRaF1Cd85f83pkjjieOFpjvywz20ImVWy1fr+S2nEDqmcgKZdhjHPfJ76+Z3bvVB/Kyv2dH7J8BMjlVf7kxyGbmot54yxchJNEMs0A/QTkeow2Xa54IcGZo/RUxGRu90SFu6VpfcxLaVOdN9EbvhcNs//OPA1jhDm9Nf4A==; bm_sv=BB4B29FC4D88791AABD65B43FACB0AF7~ObLG1UzBN4vOInl5m0vWqjOpZUXtLDHJDxr92uXdHHp5bjKjrEMMJcJRzS5VY5lkIs3N7JH+gZtoTnYIWKFqPZFhFC8Oo+sjmZLrin4taKkPfpvp7RdbqySQh6BLQwbWg3UgQJUQN29H0q9MJN6FuaW2b2i13zn5CmZUSDSpJVo=',
//             'Host': 'www.nseindia.com',
//             'Sec-Fetch-Dest': 'document',
//             'Sec-Fetch-Mode': 'navigate',
//             'Sec-Fetch-Site': 'none',
//             'Sec-Fetch-User': '?1',
//             'TE': 'trailers',
//             'Upgrade-Insecure-Requests': '1',
//             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
//             'Access-Control-Allow-Headers': '*'
//         })

//             // await axios.get("http://127.0.0.1:8000/nse/")
//             .then((json) => {

//                 // console.log("buy>>>>>.",buy.lenth);
//                 // console.log('json', json.data)

//                 setData(json.data.records.index)
//                 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< All DATA SAVE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//                 let raa = json.data.records.timestamp

//                 setGetdata(raa)

//                 // <<<<<<<<<<<<<<<<<< liveprice >>>>>>>>>>>>>>>>>>

//                 let liveprice = json.data.records.index.last
//                 setLiveprice(liveprice)

//                 // / <<<<<<<<<< data of live price greterthan >>>>>>>>>>>>>

//                 let up_price = json.data.filtered.data.filter((ab) => {

//                     let r = ab.strikePrice
//                     return r >= liveprice;
//                 })
//                 setLivegreterthan(up_price)
//                 // console.log("up_price>>>>>>", up_price);

//                 // <<<<<<<<<< data of live price lessthan >>>>>>>>>>>>>

//                 let down_price = json.data.filtered.data.filter((ab) => {

//                     let r = ab.strikePrice
//                     return r <= liveprice;
//                 })
//                 setLiveLessthan(down_price)
//                 // console.log("down_price>>>>>>", down_price);

//                 // <<<<<<<<<< DOWN PRICE (BASE PRICE) PE and CE op and change Op sum and find big value >>>>>>>>>>>>>

//                 let PE_CE_SUM = down_price.slice(-5).map((val) => {
//                     var ss = (val.PE.openInterest + val.PE.changeinOpenInterest)

//                     return ss;
//                 })
//                 let compare = (a, b) => {
//                     return b - a
//                 }
//                 const numAscending = PE_CE_SUM.sort(compare);
//                 const num = numAscending.slice(0, 1);
//                 // console.log("PE_CE_SUM>>>>>>>>>>>>>>>",numAscending);

//                 // console.log('liveprices',liveprices);

//                 // <<<<<<<<<< UP PRICE (SARATE PRICE) PE and CE op and change Op sum and find big value >>>>>>>>>>>>>

//                 let CE_PE_SUM = up_price.slice(0, 5).map((val) => {
//                     var ss = (val.CE.openInterest + val.CE.changeinOpenInterest)
//                     // console.log("Num>>>>>>>>>>>>>>>", ss);

//                     return ss;
//                 })
//                 let compare1 = (a, b) => {
//                     return b - a
//                 }
//                 const numAscending1 = CE_PE_SUM.sort(compare1);
//                 const num1 = numAscending1.slice(0, 1);
//                 // console.log("Num>>>>>>>>>>>>>>>",numAscending1);

//                 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PE IN MAXIMUM OI OF NSE DATA >>>>>>>>>>>>>>>>>
//                 const PE_present_price = []
//                 const PE_present_price2 = []

//                 setPE(PE_present_price2)
//                 // console.log(PE_present_price2)
//                 let PE_present_price1 = down_price.filter((ab) => {
//                     let r = ab.PE.changeinOpenInterest + ab.PE.openInterest

//                     if (r === num[0]) {
//                         PE_present_price.push(ab)
//                         PE_present_price2.push(ab.strikePrice)

//                         // console.log("d>>>>>>>>>>>>",ab);
//                     }

//                 })
//                 // console.log("PE_pregent_price",PE_present_price);
//                 setPemax(PE_present_price)

//                 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CE IN MAXIMUM OI OF NSE DATA >>>>>>>>>>>>>>>>>
//                 const CE_present_price = []
//                 const CE_present_price2 = []

//                 setCe(CE_present_price2)

//                 let CE_present_price1 = up_price.map((ab) => {
//                     let r = ab.CE.changeinOpenInterest + ab.CE.openInterest
//                     if (r === num1[0]) {
//                         // console.log(ab.strikePrice);
//                         CE_present_price.push(ab)
//                         CE_present_price2.push(ab.strikePrice)

//                     }
//                 })
//                 // console.log("CE_pregent_price", CE_present_price);
//                 setCemax(CE_present_price)

//                 // <.............................. LIVE BRIDPRICE .............>

//                 PE_present_price.map(ab => {

//                     let r = ab.CE.bidprice
//                     setLivebdp(r)
//                     console.log(r);

//                 })

//                 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PCR VALUE FIND >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//                 const sum = json.data.filtered.CE.totOI
//                 const sum2 = json.data.filtered.PE.totOI

//                 const PCR = sum2 / sum

//                 setPcr(PCR)
//                 // <<<<<<<<<<<<<<<<<<<<<<< PE CE DIFFRINET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//                 const CE_PE_Diffrent = []
//                 let CE_PE_Diffrent1 = PE_present_price.map((ab) => {
//                     let a = (ab.PE.openInterest + ab.PE.changeinOpenInterest) - (ab.CE.openInterest + ab.CE.changeinOpenInterest)
//                     CE_PE_Diffrent.push(a)
//                 })
//                 setDiffrent(CE_PE_Diffrent)

//                 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< BUYING PRICE FIND >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//                 const BUY_PRICE = []
//                 // console.log();

//                 const xyz = []
//                 let BUY_PRICE1 = PE_present_price.map((ab) => {

//                     if (PE_present_price !== CE_present_price) {
//                         let r = ab.strikePrice + 90
//                         // console.log(r)
//                         if (44000 >= liveprice) {
//                             // console.log(buy.length === 0);
//                             // let a = 0;
//                             // while (
//                             //     BUY_PRICE.length === 0 && a ===0) {
//                             //     console.log("hello");

//                             //     a = 1;
//                             //     // BUY_PRICE.push(ab)
//                             //     // nsedata()

//                             // }
//                             // setLoading(false)
//                             // console.log(r >= liveprice);
//                         }

//                     }
//                 })
//                 // setBuy_price(BUY_PRICE)
//                 // console.log('qqqqqqqqqqqq', BUY_PRICE);

//                 var BUY_PRICE5 = PE_present_price.filter((ab) => {
//                     if (PE_present_price !== CE_present_price && CE_PE_Diffrent > 50000) {
//                         let r = ab.strikePrice + 90
//                         if (44000 >= liveprice) {
//                             BUY_PRICE.push(ab)

//                             // console.log("dddddddddddd",null === buy);
//                             // if( null === buy){
//                             // console.log("hello");
//                             // nsedata()
//                             // }

//                         }
//                         // return r >= liveprice;

//                     }

//                 })

//                 // console.log('buyyyyyyy',pemax);
//                 // const buyssss= []
//                 // console.log("buyssss",buyssss);
//                 // let BUY_PRICE7 = pemax.map((ab) => {
//                 //     if (pemax !== cemax && diffrent >= 50000 && pcr >= 0.7) {
//                 //         let r = ab.strikePrice + 90
//                 //         // console.log(r);
//                 //         if (44000 >= liveprices) {
//                 //             let a = 0;

//                 //             // console.log('buy.length', buy.length);
//                 //             while (buyyyyyyy.length === 0 && a === 0) {

//                 //                 console.log(ab);
//                 //                 console.log("helloooooo");
//                 //                 buyssss.push(ab)
//                 //                 setBuy_price([...buyyyyyyy, ab])

//                 //                 a = 1;
//                 //             }

//                 //         }
//                 //     }
//                 // })
//                 // PE_present_price.filter((ab) => {
//                 //             let r = ab.strikePrice + 90
//                 //             switch(ab){
//                 //                 case():

//                 //             }
//                 // })

//                 // if (PE_present_price2 !== CE_present_price2) {
//                 //     PE_present_price.filter((ab) => {
//                 //         let r = ab.strikePrice + 90
//                 //         if (r >= liveprice) {
//                 //         console.log('rrrrrrrrrrrr',r);
//                 //         BUY_PRICE.push(ab)

//                 //     }
//                 // })
//                 // nsedata()
//                 // }

//                 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PROFIT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//                 let Bridprice1 = BUY_PRICE.map((ab) => {
//                     let r = ab.CE.bidprice
//                     console.log("rrrrrrrrrrrrrrrrrrrrrrrr",r);
//                     return r;
//                 })
//                 // setBid_price(Bridprice1)

//                 let strike_price = BUY_PRICE.map((ab) => {
//                     let r = ab.CE.strikePrice
//                     return r;

//                 })

//                 // console.log("Bridprice1", strike_price);

//                 let Bridprice = PE_present_price.map((ab) => {
//                     let r = ab.CE.bidprice
//                     return r;
//                 })
//                 // console.log("Bridprice", Bridprice);

//                 let Bridpriceprofit = BUY_PRICE.map((ab, i) => {
//                     let q = ab.CE.bidprice * 10 / 100
//                     return q;
//                 })

//                 // console.log("Bridpriceproficte", Bridpriceprofit);

//                 let totalsum = Bridprice1[0] + Bridpriceprofit[0];
//                 // console.log("totalsum>>>>>>>>>>>>>>>", totalsum);

//                 if (totalsum === Bridprice) {
//                     let x = BUY_PRICE.pop()
//                     return x;
//                 }

//                 // console.log("POP", BUY_PRICE);

//                 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< STOP LOSS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//                 // let STOP_LOSS = PE_pregent_price.filter((ab) => {
//                 //     if (PE_pregent_price !== CE_pregent_price && CE_PE_Diffrent >= 50000 && PCR >= 1) {
//                 //         let r = ab.strikePrice + 10
//                 //         // console.log(r);
//                 //
//                 //         return r;
//                 //     }

//                 //     if (STOP_LOSS = liveprice) {
//                 //         let x = BUY_PRICE.pop()
//                 //         return x;
//                 //     }
//                 // })
//                 // console.log("a>>>>>>>>>>>>>>>>>>>", BUY_PRICE);

//             })
//             .catch(err => {
//                 console.log(err)
//             })

//     }

//     // console.log("BUY_PRICE1>>>>>>>>>>>>", BUY_PRICE1);

//     // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< post >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>........

//     const nsedata = async () => {
//         try {
//             console.log("bid_price",bid_price);
//             console.log("strike_price",strike_price);
//             const article = { 'bid_price': bid_price ,'strike_price': strike_price,'live_price': liveprices,'pcr_value': pcr
//          };
//         //  console.log("article",article);
//             let formField = new FormData()
//             formField.append('bid_price', bid_price)
//             formField.append('strike_price', strike_price)

//             formField.append('live_price', liveprices)
//             formField.append('pcr_value', pcr)

//             // console.log("formField", bid_price);

//             await axios({
//                 method: 'post',
//                 url: 'http://127.0.0.1:8000/nse/',
//                 data: article,

//             }).then(response => {
//                 console.log(response.data);

//             })
//         } catch (err) {
//             // here we are receiving validation errors
//             console.log("Err == ", err.response);
//             // console.log(err.response.data.errors);
//         }
//     }

//     const buys = []

//     let BUY_PRICE = pemax.map((ab) => {
//         if (pemax !== cemax && diffrent >= 50000 && pcr >= 0.7) {
//             let r = ab.strikePrice + 90
//             // console.log(r);
//             if (44000 >= liveprices) {
//                 let a = 0;

//                 // console.log('buy.length', buy.length);
//                 while (buyyyyyyy.length === 0 && a === 0) {

//                     console.log(ab);
//                     buys.push(ab)
//                     setBuy_price([...buyyyyyyy, ab])

//                     a = 1;
//                 }

//             }
//         }
//     })

//     // console.log("buy",buys);

//     const Brid_price = []
//     // console.log(buys);
//     let Bridprice1 = buys.map((ab) => {
//         let r = ab.CE.bidprice

//         let a = ab.strikePrice
//         setBid_price(r)
//         setStrike_price(a)
//         Brid_price.push(r)

//     })

//     // console.log("bid_price",bid_price);
//     const Brid_price_profit = []
//     let Bridpriceprofit = Brid_price.map((ab, i) => {
//         let q = ab * 10 / 100 + ab
//         let r = q.toFixed(1)
//         console.log(r);
//         Brid_price_profit.push(r)
//     })

//     // buys.map((ab,i)=>{

//     if (Brid_price_profit >= livebridprice) {
//         buys.pop()
//     }
//     // })

//     return (
//         <>
//             <NavbarMenu />

//             <div className="container">

//                 <div className="container">
//                     <div className="col-md-7 mb-1 d-inline p-2 bg-success text-white float-left  ">
//                         Underlying Index: <span id="equity_underlyingVal" className="bold "><b>BANKNIFTY {liveprices} </b></span>
//                         <span id="equity_timeStamp" className="asondate"> As on {getdata}  IST </span>

//                     </div>
//                 </div>
//                 <div>
//                     {/* toFixed(2) */}
//                     <div className="d-inline p-2 bg-success text-white float-right">PCR = {Number(pcr).toFixed(2)}</div>

//                 </div>

//             </div>
//             <div id="chartContainer">
//                 <Table className="mt-3" id="chartContainer">
//                     <thead>
//                         <tr style={{
//                             backgroundColor: '	#ffbf00'
//                         }}>
//                             <th width="30%" title="Open Interest in contracts">PE</th>

//                             <th width="40%" title="Strike Price">Strike Price</th>

//                             <th width="40%" title="Open Interest in contracts">CE</th>
//                         </tr>
//                     </thead>

//                     <tbody>

//                         {/* <<<<<<<<<<<<<<<<<<< down price  >>>>>>>>>>>>>>>>>>>> */}
//                         {

//                             livelessthan.slice(-10).map((data, i) => {
//                                 return (
//                                     <tr >

//                                         <td style={{
//                                             backgroundColor: pemax[0] === data ? '#ff1000' : null

//                                         }}>{data.PE.openInterest + data.PE.changeinOpenInterest}</td>
//                                         <td style={{
//                                             backgroundColor: '#66CDAA'

//                                         }}  ><b>{data.strikePrice}</b></td>

//                                         <td style={{
//                                             backgroundColor: '#33F9FF'

//                                         }}>{data.CE.openInterest + data.CE.changeinOpenInterest}</td>
//                                     </tr>
//                                 )

//                             })
//                         }
//                         {/* <<<<<<<<<<<<<<<<<<< up price  >>>>>>>>>>>>>>>>>>>> */}
//                         {

//                             livegreterthan.slice(0, 10).map((data, i) => {
//                                 return (

//                                     <tr >
//                                         <td style={{
//                                             backgroundColor: '#33F9FF'

//                                         }}>{data.PE.changeinOpenInterest + data.PE.openInterest}</td>

//                                         <td style={{
//                                             backgroundColor: '#66CDAA'

//                                         }}  ><b>{data.strikePrice}</b></td>

//                                         <td style={{
//                                             backgroundColor: cemax[0] === data ? '#ff1000' : null

//                                         }}>{data.CE.openInterest + data.CE.changeinOpenInterest}</td>

//                                     </tr>

//                                 );

//                             })
//                         }
//                     </tbody>
//                 </Table>
//             </div>

//         </>

//     )

// }
// export default Banknifty;

// import { useEffect } from "react";
// import React, { useEffect } from "react";

// const Demo = () => {
//   useEffect(() => {
//     // if (bidPrice.length !== 0) {
//     // getLocalData();
//     fetchData();
//     // } else {
//     // }
//   }, []);

//   // useEffect(() => {
//   //   getLocalData();
//   //   // getApiData();
//   //   const interval = setInterval(() => {
//   //     console.log(
//   //       "Interval----------------------------------------------------------------------------------->"
//   //     );
//   //     getLocalData();
//   //     //   getApiData();
//   //     //   conditionFunction();
//   //   }, 10000);
//   //   return () => clearInterval(interval);
//   // }, []);

//   // const getLocalData = async () => {
//   //   await fetch(
//   //     "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY"
//   //   )
//   //     .then((res) => res.json())
//   //     .then((json) => {
//   //       console.log(json);
//   //     })
//   //     .catch((e) => console.log(e));
//   // };

//   const fetchData = () => {
//     fetch(
//       "https://www.nseindia.com/api/option-chain-indices?symbol=BANKNIFTY"
//       // {
//       //   headers: {
//       //     Host: "www1.nseindia.com",
//       //     Referer: "https://www.nseindia.com/option-chain",
//       //     "X-Requested-With": "XMLHttpRequest",
//       //     "user-agent":
//       //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
//       //     Accept: "*/*",
//       //     "accept-encoding": "gzip, deflate, br",
//       //     "accept-language": "en-US,en;q=0.9,gu;q=0.8,ru;q=0.7",
//       //     "cache-control": "no-cache",
//       //     connection: "keep-alive",
//       //     "content-type": "application/json",
//       //   },
//       // }
//     )
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   };

//   return <div></div>;
// };

// export default Demo;
