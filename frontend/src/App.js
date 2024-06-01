import Register from './pages/register'
import MoviePage from './pages/moviepage'
import Login from './pages/login'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
    return (
        <div className = "App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Register/>
                    </Route>
                    <Route exact path="/register">
                        <Register/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/home">
                        <MoviePage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
