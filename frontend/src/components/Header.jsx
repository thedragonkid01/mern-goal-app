import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Dashboard
        </Link>
        <div className="d-flex">
          {!user && (
            <>
              <Link to="login" className="nav-link me-4">
                Login
              </Link>
              <Link to="register" className="nav-link">
                Register
              </Link>
            </>
          )}
          {user && (
            <button
              type="button"
              className="btn btn-link nav-link"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
