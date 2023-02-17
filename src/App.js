import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import NavbarComponent from "./components/navbar.component";
import FooterComponent from "./components/footer.component";
import HomePage from "./pages/home.page";
import SignInPage from "./pages/signin.page";
import SignUpPage from "./pages/signUp.page";
function App() {
  return (
    <div className="App">
      <Router>
        <header>
            <NavbarComponent/>
        </header>
        <Routes>

          <Route path="/" exact element={<HomePage/>}/>
          <Route path="/signIn" exact element={<SignInPage/>}/>
          <Route path="/signUp" exact element={<SignUpPage/>}/>

        </Routes>
          <footer>
              <FooterComponent/>
          </footer>
      </Router>

    </div>
  );
}

export default App;
