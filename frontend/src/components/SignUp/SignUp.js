import React, { useState, useRef, useEffect } from "react";
import todoImg from "../../assets/todo.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    validation();

    try {
      const user = await axios.post(
        "http://localhost:5000/users",
        JSON.stringify({
          name,
          email,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(user.data);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {}
  };

  const validation = () => {
    let state = true;
    if (
      name === "" ||
      name === null ||
      email === "" ||
      email === null ||
      password === "" ||
      password === null
    ) {
      state = false;
      toast.warning("PLEASE FILL ALL INPUT !");
    }
  };
  return (
    <div className="text-center font-serif p-3">
      <img src={todoImg} alt="" />
      <div className="mt-4">
        <form onSubmit={signUp}>
          <ToastContainer />
          <input
            type="text"
            placeholder="Name"
            className="w-[290px] p-3 mb-6 rounded-lg text-xl border"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            className="w-[290px] p-3 mb-6 rounded-lg text-xl border"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[290px] p-3 mb-6 rounded-lg text-xl border"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="w-[100px] rounded-lg py-3 bg-[#44e62e] mb-6 text-xl font-serif">
            {" "}
            Sign Up
          </button>
        </form>
      </div>
      <div className="mt-2 flex justify-center">
        <p className="mr-1">Already have an account?</p>
        <p className="text-[#44e62e]">
          <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
