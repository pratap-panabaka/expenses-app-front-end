import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const CustomLink = (props) => {
    const obj = props;
    const { to, routeName } = obj;

    const isActive = useMatch({ path: useResolvedPath(to).pathname, end: true });

    return (
        <Link className={isActive ? 'btn text-active' : 'btn'} to={to}>{routeName}</Link>
    );
};

export default CustomLink;