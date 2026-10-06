const Header = ({
    children,
    className = "",
    as: Tag = "h2",
}) => {
    return (
        <Tag
            className={`core-heading ${className}`}
        >
            {children}
        </Tag>
    );
};

export default Header;