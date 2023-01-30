// import { Form, Input, Button } from "antd";
// import Sidebar from "./Sidebar";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Layout } from "antd";
// import { LOCAL_BASE_URL } from "../api/LocalApi";

// const { Header } = Layout;
// // const url = process.env.REACT_APP_SERVER_URI;

// function UpdateSettingdata(props) {
//   // const [option, setOption] = useState([]);
//   const [percentage, setPercentage] = useState([]);
//   const [id, setId] = useState([]);
//   const { empid } = useParams();
//   const navigate = useNavigate();
//   const authToken = localStorage.getItem("token");

//   useEffect(() => {
//     axios({
//       method: "get",
//       url: LOCAL_BASE_URL + "/get_setting_data/" + empid,

//       headers: {
//         authorization: "Token  " + authToken,
//       },
//     }).then((response) => {
//       console.log(response.data.option);
//       setId(response.data.id);
//       // setOption(response.data.option);
//       setPercentage(response.data.percentage);
//     });
//   }, []);

//   const setting_updatensedata = async () => {
//     try {
//       const article = {
//         // option: option,
//         percentage: percentage,
//       };

//       await axios({
//         method: "put",
//         url: LOCAL_BASE_URL + `/patch_stock/` + id,

//         data: article,
//         headers: {
//           authorization: "Token  " + authToken,
//         },
//       }).then((response) => {
//         console.log(response.data);
//         navigate("/admin/settings");
//       });
//     } catch (err) {
//       console.log("Error ", err.response);
//     }
//   };

//   // const changeName = (event) => {
//   //   setOption(event.target.value);
//   // };

//   const changeCity = (event) => {
//     setPercentage(event.target.value);
//   };

//   return (
//     <>
//       <Layout>
//         <Header className='header'>
//           <div className='logo' />
//         </Header>

//         <Layout>
//           <Sidebar />
//           <Form>
//             {/* <Form.Item label='Option' style={{ margin: 10, padding: 10 }}>
//               <Input
//                 value={option}
//                 onChange={changeName}
//                 placeholder='Option'
//               />
//             </Form.Item> */}
//             <Form.Item style={{ margin: 10, padding: 10 }} label='percentage:'>
//               <Input
//                 value={percentage}
//                 onChange={changeCity}
//                 placeholder='percentage'
//               />
//             </Form.Item>
//             <Form.Item>
//               <Button onClick={setting_updatensedata} type='primary'>
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Layout>
//       </Layout>
//     </>
//   );
// }

// export default UpdateSettingdata;
