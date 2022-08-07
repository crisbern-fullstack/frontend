import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-envelope" />
          </div>
        </div>
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-lock" />
          </div>
        </div>
      </div>
      <div className="row">
        {/* /.col */}
        <div className="col-4">
          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </div>
        {/* /.col */}
      </div>
    </form>
  );
};

export default LoginForm;
