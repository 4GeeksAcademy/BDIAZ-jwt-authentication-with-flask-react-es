import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            console.log("No existe token");
            setShow(false);
        } else {
            console.log("Existe token");
            setShow(true);
        }
    }, [localStorage.getItem("accessToken")]);

    const handleCloseSesion = () => {
        localStorage.removeItem("accessToken");
        setShow(false);
        navigate("/"); // Redirigir después de cerrar sesión
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                {show ? (
                    <button className="btn btn-primary" onClick={handleCloseSesion}>
                        Cerrar sesión
                    </button>
                ) : (
                    <>
                        <Link to="/signup" className="me-1">
                            <button className="btn btn-primary">Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button className="btn btn-primary">Log In</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
