import React from 'react';
import { Link } from 'react-router-dom';

function FooterSection() {
    return (
        <>
            <footer className='footerSection'>
                <div className="container-fluid" style={{ color: "black", textAlign: "center", marginTop: "4px" }}>
                    <h6>Copyright @2024 Lovepreet</h6>
                    <div style={{ marginTop: "10px" }}>
                        <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "black" }}>
                            <i className="fab fa-facebook fa-lg"></i>
                        </Link>
                        <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "black" }}>
                            <i className="fab fa-twitter fa-lg"></i>
                        </Link>
                        <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "black" }}>
                            <i className="fab fa-instagram fa-lg"></i>
                        </Link>
                        <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ margin: "0 10px", color: "black" }}>
                            <i className="fab fa-linkedin fa-lg"></i>
                        </Link>
                    </div>
                </div>
            </footer >
        </>
    );
}

export default FooterSection;
