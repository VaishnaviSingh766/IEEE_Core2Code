const Header = ({
    children,
    className = "",
    as: Tag = "h2",
    id,
}) => {
    return (
        <Tag
            id={id}
            className={`core-heading uppercase ${className}`}
        >
            {children}
        </Tag>
    );
};

export default Header;