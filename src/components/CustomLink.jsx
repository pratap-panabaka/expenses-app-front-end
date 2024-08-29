import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const CustomLink = (props) => {
    const obj = props;
    const { to, routeName } = obj;

    const isActive = useMatch({ path: useResolvedPath(to).pathname, end: true });

    return (
        <Link className={isActive ? 'link bg-black border-2 border-toolite text-white' : 'link'} to={to} onClick={(e) => e.currentTarget.blur()}>{routeName}</Link>
    );
};

export default CustomLink;