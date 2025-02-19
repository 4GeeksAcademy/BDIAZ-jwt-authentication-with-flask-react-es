import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import { Context } from "../store/appContext";

export const Private = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            console.log("No existe token")
            navigate("/")
        } else {
            console.log("Existe token")
        }
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                   <h1>contenido super privado</h1>
                </div>
            </div>
        </div>

    );
};
