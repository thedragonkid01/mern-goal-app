import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addGoal } from "../features/goal/goalSlice";

function GoalForm(props) {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      toast.error("Please input the goal");
      return;
    }

    dispatch(addGoal({ text }));
    setText("");
  };

  return (
    <form className="w-50" onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          className="form-control"
          placeholder="Please input your new goal"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button className="btn btn-outline-success" type="submit">
          Add Goal
        </button>
      </div>
    </form>
  );
}

export default GoalForm;
