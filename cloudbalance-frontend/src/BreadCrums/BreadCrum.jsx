import { useLocation, Link } from 'react-router-dom';
import { breadCrumEnum } from '../Enums/BreadCrums';
import { breadCrumEnumLink } from '../Enums/BreadCrumLinks';

 const  Breadcrumb = () =>{
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x).slice(1);

  return (
    <nav className='border-b-2 border-gray-400'>
      
      {pathnames.map((path, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        console.log(to)
        return (

          <span key={to}>
           <Link to={breadCrumEnumLink[to]}>
            <span  className="pl-2" to={to}>{capitalize(breadCrumEnum[path])}</span>
            {index < pathnames.length - 1 && ' > '}
            </Link>
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
