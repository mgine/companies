import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Companies from "./pages/companies/Companies";
import CompanyCreate from "./pages/companies/CompanyCreate";
import CompanyEdit from "./pages/companies/CompanyEdit";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path={'/'} element={<Companies />}/>
                  <Route path={'/companies'} element={<Companies />}/>
                  <Route path={'/companies/create'} element={<CompanyCreate />}/>
                  <Route path={'/companies/:id/edit'} element={<CompanyEdit />}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
