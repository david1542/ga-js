import { useLocation } from "react-router";
import { Route, Switch } from 'react-router-dom';
import { ROUTES_ARRAY } from "../../routes";

const RouterSwitch = () => {
  const location = useLocation();
  return (
    <Switch location={location}>
      {ROUTES_ARRAY.map(({ path, component }, i) => (
        <Route
          key={i}
          path={path}
          component={component}
          exacty
        />
      ))}
    </Switch>
  );
};

export {RouterSwitch};
