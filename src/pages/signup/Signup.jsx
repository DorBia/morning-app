import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"

import "./Signup.scss"
import Camera from "../../assets/camera.svg"
import EyeIcon from "../../assets/visibility.svg"
import CrossedEye from "../../assets/visibility-off.svg"

const Signup = () => {

  // hooks
  const { signup, isPending, error } = useSignup()

  // states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarError, setAvatarError] = useState(null)
  const [showPassword, setShowPassword] = useState(false);

  // functions
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, avatar)
  }

  const handleFileChange = (e) => {
    setAvatar(null)
    let selected = e.target.files[0]

    if (!selected) {
      setAvatarError("Please select an image")
    } else if (selected.size > 1000000) {
      setAvatarError("Image size must be less than 1mb")
    } else {
      setAvatarError(null)
      setAvatar(selected)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Register</h2>

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

      <label>
        <span>Name:</span>
        <input 
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          placeholder="name/nickname"
        />
      </label>

      <label className="form__file">
        <span>Avatar:</span>
        <div className="form__add">
          <img src={Camera} alt="add avatar"/>
          {(avatarError || !avatar) && <p>Select picture</p>}
          {avatar && !avatarError && <p>{avatar.name}</p>}
        </div>
        <input 
          required
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        {avatarError && <div className="error">{avatarError}</div>}
      </label>

      {!isPending &&<button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup