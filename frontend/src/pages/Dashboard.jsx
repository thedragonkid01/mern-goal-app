import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import GoalList from "../components/GoalList";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goal/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { goals, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.goal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return (
    <>
      <h4 className="text-center">Hello {user?.name}. Welcome to Goal app </h4>
      <div className="d-flex justify-content-center">
        <GoalForm />
      </div>
      {isLoading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      <div className="d-flex flex-wrap">
        {goals.length > 0 && <GoalList goals={goals} />}
        {goals.length <= 0 && <h5>There's no goals</h5>}
      </div>
    </>
  );
}

export default Dashboard;
