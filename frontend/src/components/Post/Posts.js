import React, { useState, useEffect } from "react";
import todoImg from "../../assets/todo.jpg";
import deleteBtn from "../../assets/deleteBtn.png";
import editBtn from "../../assets/editBtn.png";
import axios from "axios";

function Posts({ data }) {
  const [task, setTask] = useState("");
  const [taskIdList, setTaskIdList] = useState();
  // const { id, name, posts } = data;
  // console.log({ posts });

  // useEffect(() => {
  //   setTask(posts);
  // }, []);

  const addPost = async (e) => {
    const _id = data.id;
    e.preventDefault();
    const _user = await axios.post(
      "http://localhost:5000/tasks",
      JSON.stringify({
        task,
        _id,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
      {}
    );
    console.log(_user);
    setTask("");
  };

  const delTask = data.posts.map((items) => {
    return items.id;
  });

  // const deleteTask = async (id) => {
  //   const taskId = data.posts.map((post) => {
  //     axios.delete(`http://localhost:5000/tasks/${post.id}`);
  //     console.log(post.id);
  //     // setTaskIdList(post.id)
  //   });
  //   console.log(data.posts);
  // };

  return (
    <div>
      <nav className=" mt-7 grid justify-center">
        <img src={todoImg} alt="" className="w-36" />
      </nav>
      <p className="mt-10 mb-5 text-lg font-serif grid justify-center">
        {" "}
        Hi, {data.name}
      </p>
      <form onSubmit={addPost} className="grid justify-center">
        <div className="mb-4">
          <input
            type="text"
            name=""
            id=""
            value={task}
            placeholder="Enter task here"
            onChange={(e) => {
              setTask(e.target.value);
            }}
            className="bg-slate-200 p-2 w-60"
          />
        </div>
        <button className="px-8 py-3 rounded-lg text-white bg-green-600 ">
          Enter
        </button>
      </form>
      <div>
        <ul>
          <div className=" ">
            {" "}
            {data.posts.map((post, i) => {
              return (
                <div key={i}>
                  <div>
                    <li className="mb-2 mt-2 bg-slate-300 p-3 text-center">
                      <input
                        type="checkbox"
                        className="float-left mt-2 ml-4"
                      />
                      {post.task}
                      <div className="flex justify-center">
                        <img src={editBtn} alt="" className="  h-7" />
                        <a href="#" onClick={(null)}>
                          <img src={deleteBtn} className=" h-7 ml-40 " />
                        </a>
                      </div>
                    </li>
                  </div>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
      <div className="grid justify-center">
        <button className="bg-[#EA1414] px-8 py-3 rounded-lg text-white font-serif mr-4 mt-7 ">
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Posts;
