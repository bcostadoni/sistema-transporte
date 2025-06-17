import "./assets/global.css"
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateEstacionPage } from "./pages/CreateEstacionPage";
import { CreateProviderPage } from "./pages/CreateProviderPage";
import { CreateRecargaPage } from "./pages/CreateRecargaPage";
import { CreateUsernPage } from "./pages/CreateUserPage";
import { CreateViajePage } from "./pages/CreateViajePage";
import { ListEstacionPage } from "./pages/ListEstacionPage";
import { ListProviderPage } from "./pages/ListProviderPage";
import { ListRecargaPage } from "./pages/ListRecargaPage";
import { ListUserPage } from "./pages/ListUserPage";
import { ListViajePage } from "./pages/ListViajePage";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";



const GlobalStyle = createGlobalStyle`
*{

}
`;

export const App = () => {
  return (
    
        <Routes>
          <Route path="/" element={<DashboardPage/>} />
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/create/estacion" element={<CreateEstacionPage/>} />
          <Route path="/create/provider" element={<CreateProviderPage/>} />
          <Route path="/create/recarga" element={<CreateRecargaPage/>} />
          <Route path="/create/user" element={<CreateUsernPage/>} />
          <Route path="/create/viaje" element={<CreateViajePage/>} />
          <Route path="/list/estacion" element={<ListEstacionPage/>} />
          <Route path="/list/provider" element={<ListProviderPage/>} />
          <Route path="/list/recarga" element={<ListRecargaPage/>} />
          <Route path="/list/user" element={<ListUserPage/>} />
          <Route path="/list/viaje" element={<ListViajePage/>} />
        </Routes>
    
  );
};