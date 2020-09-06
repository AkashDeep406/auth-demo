import React, { useEffect, useState } from "react";

const Dashboard = (props) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const onLogout = () => {
    console.log("onLogout");
    localStorage.removeItem("token");
    props.history.push("/");
  };

  const onSubmitNote = (event) => {
    event.preventDefault();
    console.log("onSubmit event: ", event.target.value);
    const note = {
      title: title,
      note: note,
    };
  };

  return (
    <div class={"container"}>
      <h3>Welcome, Dashboard</h3>
      <button type="button" class="btn btn-primary" onClick={onLogout}>
        Logout
      </button>

      <br />
      <br />
      <div>
        <form onSubmit={onSubmitNote}>
          <div class="form-group">
            <label for="title">Title</label>
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              type="text"
              class="form-control"
              id="title"
              placeholder="Enter a Title"
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Notes</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(event) => setNote(event.target.value)}
              value={note}
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
