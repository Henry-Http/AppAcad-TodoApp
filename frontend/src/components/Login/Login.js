import React, { useState, useContext } from "react";
import todoImg from "../../assets/todo.jpg";
import Footer from "../Footer/Footer";
import Posts from "../Post/Posts";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContext from "../../context/loginContextProvider";

function Login() {
  // const { setLogin } = useContext(LoginContext);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [task, setTask] = useState([]);
  const [page, setPage] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const _user = await axios.post(
      "http://localhost:5000/login",
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (_user.data.email === email && _user.data.password === password) {
      axios.get(`http://localhost:5000/users/${_user.data.id}`).then((res) => {
        const { id, name, posts } = res.data;
        setUser({ id, name, posts });
        setPage(true);
      });
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      {page ? (
        <Posts data={user} />
      ) : (
        <>
          <div className="text-center font-serif p-3">
            <img src={todoImg} alt="" />
            <div className="pt-10">
              <form onSubmit={login}>
                <ToastContainer />

                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={email}
                  required
                  className="w-[290px] p-3 mb-6 rounded-lg text-xl border"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  required
                  className="w-[290px] p-3 mb-6 rounded-lg text-xl border"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button className="w-[100px] rounded-lg px-4 py-3 bg-[#44e62e] mb-6 text-xl font-serif">
                  Login
                </button>
              </form>
            </div>
            <div className="mt-2 flex justify-center">
              <p className="mr-1">Don't have an account?</p>
              <p className="text-[#44e62e]">
                <Link to="/SignUp">SignUp</Link>
              </p>
            </div>
          </div>
          <div>
            {/* {task.map((items) => {
              console.log(items.task);
              return (
                <div key={items.id}>
                  <li>{items.task}</li>
                </div>
              );
            })} */}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Login;
