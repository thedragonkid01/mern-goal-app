import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();
  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter value enough");
      return;
    }

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <h4 className="text-center">Sign In Application</h4>
      <div className="d-flex justify-content-center">
        <form className="w-50" onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            ></input>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
