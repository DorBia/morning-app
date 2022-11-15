import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import EyeIcon from "../../assets/visibility.svg"
import CrossedEye from "../../assets/visibility-off.svg"

export default function Login() {
  const { error, login, isPending } = useLogin();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h2>Sign in</h2>

        <label>
          <span>Email:</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
        </label>

        <label className="form__password">
          <span>Password:</span>
          <input
            required
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
          <img src={showPassword ? CrossedEye : EyeIcon} alt="show/hide password" onClick={() => setShowPassword(!showPassword)} />
        </label>

        {!isPending && <button className="btn">Sign in</button>}
        {isPending && <button className="btn">Loading...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
