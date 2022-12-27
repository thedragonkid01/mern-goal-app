import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {
  const dispatch = useDispatch();
  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const { name, email, password, rePassword } = formData;

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

    if (!name || !email || !password) {
      toast.error("Please enter value enough");
      return;
    }
    if (password !== rePassword) {
      toast.error("Retype password should same password");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  return (
    <>
      <h4 className="text-center">Register New Account</h4>
      <div className="d-flex justify-content-center">
        <form className="w-50" onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Fullname</label>
            <input
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
            ></input>
          </div>
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
          <div className="mb-3">
            <label className="form-label">Retype Password</label>
            <input
              type="password"
              className="form-control"
              id="rePassword"
              name="rePassword"
              value={rePassword}
              onChange={onChange}
            ></input>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
