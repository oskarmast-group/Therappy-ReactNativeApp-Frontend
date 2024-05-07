import React, { useState, useEffect, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-native';

interface RouterContextProps {
  route: {
    from: string | null;
    to: string | null;
  };
  canGoBack: () => void;
  goBack: (defaultRoute: string) => void;
}

const RouterContext = React.createContext<RouterContextProps>({
  route: {
    to: null,
    from: null,
  },
  canGoBack: () => {},
  goBack: () => {},
});

const RouterProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [route, setRoute] = useState({
    to: location.pathname,
    from: location.pathname,
  });

  useEffect(() => {
    setRoute((prev) => ({ to: location.pathname, from: prev.to }));
  }, [location]);

  const canGoBack = () => !!route.from && route.from !== route.to;

  const goBack = (defaultRoute: string) =>
    canGoBack() ? navigate(route.from, { replace: true }) : navigate(defaultRoute);

  return <RouterContext.Provider value={{ route, canGoBack, goBack }}>{children}</RouterContext.Provider>;
};

export const useRouter = () => React.useContext(RouterContext);

export default RouterProvider;
