import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Screens/Auth/Login";
import { Users } from "../Screens/Users/users";
import UserDetails from "../Screens/Users/Details";

export default function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/profiles" exact component={Users} />
        <Route path="/user-details" exact component={UserDetails} />
      </Switch>
    </Router>
  );
}
