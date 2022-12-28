import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goal/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(deleteGoal(id));
  };

  return (
    <div className="w-25 px-2 py-2">
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">
            {new Date(goal.createdAt).toLocaleString()}
          </h6>
          <p className="card-text">{goal.text}</p>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleRemove(goal._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalItem;
