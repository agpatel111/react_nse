import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BankNifty from "./pages/BankNifty";
import Home from "./pages/Home";
import Nifty from "./pages/Nifty";
import Login from "./admin/Login";
import LiveNse from "./admin/LiveNse";
import HistoryData from "./admin/HistoryNse";
import PrivateRoutes from "./services/PrivateRoutes";
import SettingsNse from "./admin/SettingsNse";
import PcrValues from "./pages/PcrValues";
import Nsetable from "./nse/nsetable";
import PcrChart from "./pages/PcrChart";
import Item from "./nse/item";
import Model from "./pages/Model";

function App() {
  return (
    <div className='App'>
      <div>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/admin-live' element={<LiveNse />} />
              <Route path='/admin-history' element={<HistoryData />} />
              <Route path='/admin-settings' element={<SettingsNse />} />
            </Route>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/item' element={<Item />} />
            <Route path='/bank-nifty' element={<BankNifty />} />
            <Route path='/nifty-50' element={<Nifty />} />
            <Route path='/pcr' element={<PcrValues />} />
            <Route path='/demo' element={<Nsetable />} />
            <Route path='/pcrchart/:name' element={<PcrChart />} />
            {/* <Route path='/model' element={<Model />} /> */}
            
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
