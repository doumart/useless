import loadable from "@loadable/component";
import React from "react";
import { HashRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Home = loadable(async () => {
  const { Home } = await import("./pages/home/Home");
  return Home;
});

const App: React.FC = () => {
  const location = useLocation();
  return (
    <TransitionGroup style={{ display: "flex", flex: 1 }}>
      <CSSTransition
        timeout={300}
        classNames="fade"
        key={location.key}
      >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route>
            404
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default () => <Router>
  <App />
</Router>;
