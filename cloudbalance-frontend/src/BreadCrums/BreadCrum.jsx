import { useLocation, Link } from 'react-router-dom';
import { breadCrumEnum } from '../Enums/BreadCrums';
 const  Breadcrumb = () =>{
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x).slice(1);
  
  return (
    <nav>
      
      {pathnames.map((path, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      
        return (
          <span key={to}>
        
            <span to={to}>{capitalize(breadCrumEnum[path])}</span>
            {index < pathnames.length - 1 && ' > '}
          </span>
        );
      })}
    </nav>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default Breadcrumb;
