import './App.scss';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import { TeamPage } from './page/TeamPage';
import { MatchPage } from './page/MatchPage';
import { HomePage } from './page/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/team/:teamName/matches/:year">
        <MatchPage />
        </Route>
        <Route path="/team/:teamName">
        <TeamPage />
        </Route>
        <Route path="/">
        <HomePage />
        </Route>
       
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
