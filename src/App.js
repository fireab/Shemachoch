import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/Profile/Profil";
import Update from "./pages/update/Update";
import Oproduct from "./pages/product/Oproduct";

function App() {
  

  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext)
   //Protect Routers
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  ///////

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users"> 
              <Route
                index
                element={
                  <RequireAuth>
                    <List input="users" />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" add="users"/>
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <List input="products" />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Update inputs={productInputs} title="Edit Product" add="products"/>
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={productInputs} title="Add New Product" add="products" />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="orders">
              <Route
                index
                element={
                  <RequireAuth>
                    <List input="orders" />
                  </RequireAuth>
                }
              />
              <Route
                path=":oproductId"
                element={
                  <RequireAuth>
                    <Oproduct />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="/profile" 
            element={
              <RequireAuth> 
                <Profile/>
              </RequireAuth>
            }/>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
