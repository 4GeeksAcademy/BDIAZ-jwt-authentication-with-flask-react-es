import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

import { Context } from "../store/appContext";

export const SingUp = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};
    const handleSingUp = async (e) => {
		e.preventDefault();
        console.log("data.email", data.email)
        console.log("data.password", data.password)
		const result = await actions.singUp(data);
		if (!result.error) {

            Swal.fire({
                icon: "success",
                title: result.msg,
                showConfirmButton: false,
                timer: 1500
              });
            // navigate("/login");
		} else {
            Swal.fire({
                icon: "error",
                title: result.error,
                showConfirmButton: false,
                timer: 1500
              });
		}
	};

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSingUp}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Ingrese su correo</label>
                            <input type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp"
                            		value={data.email}
                                    onChange={handleChange}
                                    name="email"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1"
                                    value={data.password}
                                    onChange={handleChange}
                                    name="password"
                                    />
                        </div>                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};
