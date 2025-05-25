import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'Home';
        break;
      case '/create':
        document.title = 'Create Item';
        break;
      default:
        document.title = 'View Item';
        break;
    }
  }, [location]);

  return null;
};

export default RouteTitleManager;
