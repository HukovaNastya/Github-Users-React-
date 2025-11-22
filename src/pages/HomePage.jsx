import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="container">
            <div className="content" style={{ display: "flex", justifyContent: 'center', margin: "100px" }}>
                <Link to="/search">Search User Information 🔍</Link>
                <Link to="/about" style={{marginLeft: '20px'}}>About Us</Link>
            </div>
        </div>
    );
}

export default HomePage;
