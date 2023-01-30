// import React, { useState, useEffect } from "react";
// import { Button, Form, Input } from "antd";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { LOCAL_BASE_URL } from "../api/LocalApi";
// import { Layout } from "antd";
// const { Header } = Layout;

// // const url = process.env.REACT_APP_SERVER_URI;
// function Add_settingdata(props) {
//   useEffect(() => {
//     document.title = "add settings";
//   });

//   const [option, setOption] = useState([]);
//   const [percentage, setPercentage] = useState([]);
//   const navigate = useNavigate();
//   const authToken = localStorage.getItem("token");

//   const setting_nsedata = async () => {
//     try {
//       const article = {
//         option: option,
//         percentage: percentage,
//       };

//       await axios({
//         method: "post",
//         url: LOCAL_BASE_URL + "/setting_nse",
//         mode: "cors",
//         data: article,
//         headers: {
//           authorization: "Token  " + authToken,
//         },
//       }).then((response) => {
//         console.log(response.data);
//         navigate("/admin/settings");
//       });
//     } catch (err) {
//       // here we are receiving validation errors
//       console.log("Err == ", err.response);
//       // console.log(err.response.data.errors);
//     }
//   };

//   const changeName = (event) => {
//     setOption(event.target.value);
//   };

//   const changeCity = (event) => {
//     setPercentage(event.target.value);
//   };

//   // const setting_updatensedata = async () => {
//   //     try {

//   //         const article = {
//   //             'option': option, 'percentage': percentage
//   //         };

//   //         await axios({
//   //             method: 'put',
//   //             url: "http://127.0.0.1:8000/setting_nse",
//   //             mode: 'cors',
//   //             data: article,
//   //             headers: {
//   //                 'authorization': 'Token  ' + authToken
//   //             }

//   //         }).then(response => {
//   //             console.log(response.data);
//   //             navigate('/admin/setting_nse')

//   //         })

//   //     } catch (err) {
//   //         // here we are receiving validation errors
//   //         console.log("Err == ", err.response);
//   //         // console.log(err.response.data.errors);
//   //     }
//   // };

//   return (
//     <>
//       <Layout>
//         <Header className='header'>
//           <div className='logo' />
//         </Header>

//         <Layout>
//           <Sidebar />
//           <Form>
//             <Form.Item label='Option' style={{ margin: 10, padding: 10 }}>
//               <Input
//                 value={option}
//                 onChange={changeName}
//                 placeholder='Option'
//               />
//             </Form.Item>
//             <Form.Item style={{ margin: 10, padding: 10 }} label='percentage:'>
//               <Input
//                 value={percentage}
//                 onChange={changeCity}
//                 placeholder='percentage'
//               />
//             </Form.Item>
//             <Form.Item>
//               <Button onClick={setting_nsedata} type='primary'>
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Layout>
//       </Layout>
//     </>
//   );
// }

// export default Add_settingdata;
