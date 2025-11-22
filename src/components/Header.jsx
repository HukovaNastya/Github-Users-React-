const Header = ({title, text}) => {
    return (
        <div className="header">
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    )
}

export default Header;