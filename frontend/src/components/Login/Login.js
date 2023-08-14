import React, { useState } from "react";
import todoImg from "../../assets/todo.jpg";
import Footer from "../Footer/Footer";
import Posts from "../Post/Posts";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [users, getUsers] = useState([]);
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [task, setTask] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios.get("http://localhost:5000/users").then((res) => {
      getUsers(res.data);
    });
    setEmailReg("");
    setPasswordReg("");
    users.map((user) => {
      if (user.email === emailReg && user.password === passwordReg) {
        axios.get(`http://localhost:5000/users/${user.id}`).then((res) => {
          const { id, name, Todos } = res.data;
          // console.log(Todos);
          setTask(Todos);
        });
      }
    });
  };
  return (
    <>
      <div className="text-center font-serif p-3">
        <img src={todoImg} alt="" />
        <div className="pt-10">
          <input
            type="text"
            id="email"
            placeholder="Email"
            autoComplete="off"
            value={emailReg}
            required
            className="w-[290px] p-3 mb-6 rounded-lg text-xl border"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={passwordReg}
            required
            className="w-[290px] p-3 mb-6 rounded-lg text-xl border"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
          <button
            className="w-[100px] rounded-lg px-4 py-3 bg-[#44e62e] mb-6 text-xl font-serif"
            onClick={login}
          >
            Login
          </button>
        </div>
        <div className="mt-2 flex justify-center">
          <p className="mr-1">Don't have an account?</p>
          <p className="text-[#44e62e]">
            <Link to="/SignUp">SignUp</Link>
          </p>
        </div>
      </div>
      <div>
        {task.map((items) => {
          console.log(items.task);
          return (
            <div key={items.id}>
              <li>{items.task}</li>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Login;
