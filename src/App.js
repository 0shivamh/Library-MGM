import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import NavbarComponent from "./components/navbar.component";
import FooterComponent from "./components/footer.component";
function App() {
  return (
    <div className="App">
      <Router>
        <header>
            <NavbarComponent/>
        </header>
        <Routes>

          {/*<Route path="/" exact element={}/>*/}
          {/*<Route path="/signin" exact element={}/>*/}
          {/*<Route path="/signin" exact element={}/>*/}

        </Routes>
          <footer>
              <FooterComponent/>
          </footer>
      </Router>

    </div>
  );
}

export default App;
