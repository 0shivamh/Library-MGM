import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import NavbarComponent from "./components/navbar.component";
import FooterComponent from "./components/footer.component";
import HomePage from "./pages/home.page";
import SignInPage from "./pages/signin.page";
import SignUpPage from "./pages/signUp.page";
import NotFoundComponent from "./components/NotFound.component";
import NoAuth from "./noauth";
import Auth from "./auth";
import DashboardPage from "./pages/dashboard.page";
import AddBookPage from "./pages/addBook.page";
import ResetPswComponent from "./components/resetPsw.component";
import {useState} from "react";
function App() {
    const [authStatus,setAuthStatus]=useState()

    const auth=(authStatus)=>{
        setAuthStatus(authStatus)
    } // for navbar states

  return (
    <div className="App">
      <Router>
        <header>
            <NavbarComponent/>
        </header>
        <Routes>


            <Route path="/" exact element={<HomePage/>}/>

            <Route path="/" exact element={<NoAuth/>} >
                <Route path="signIn" exact element={<SignInPage auth={auth}/>}/>
                <Route path="signUp" exact element={<SignUpPage/>}/>
                <Route path="password-reset" exact element={<ResetPswComponent/>}/>
            </Route>

            {/*private routes*/}
            <Route path="/" exact element={<Auth/>} >
                <Route path="dashboard" exact element={<DashboardPage/>} />
                <Route path="dashboard/addBook" exact element={<AddBookPage/>} />
            </Route>

            <Route path="*"  element={<NotFoundComponent />} />

        </Routes>
          <footer>
              <FooterComponent/>
          </footer>
      </Router>

    </div>
  );
}

export default App;
