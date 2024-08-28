import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const CustomLink = (props) => {
    const obj = props;
    const { to, routeName } = obj;

    const isActive = useMatch({ path: useResolvedPath(to).pathname, end: true });

    return (
        <Link className={isActive ? 'btn bg-teal-500 ring-2 ring-white' : 'btn'} to={to}>{routeName}</Link>
    );
};

export default CustomLink;