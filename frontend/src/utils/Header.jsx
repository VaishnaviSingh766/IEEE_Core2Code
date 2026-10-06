const Header = ({
    children,
    className = "",
    as: Tag = "h2",
}) => {
    return (
        <Tag
            className={`
        font-core
        w-full
        text-center
        text-5xl
        sm:text-6xl
        lg:text-7xl
        font-normal
        tracking-tight
        text-[#D4AF37]
        ${className}
      `}
        >
            {children}
        </Tag>
    );
};

export default Header;