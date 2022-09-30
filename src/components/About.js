import { Link } from "react-router-dom"

const About = () => {
  return (
    <div>
      <p className="centered">version 1.0.0</p>
      <Link to="/" className="centered">Go back</Link>
    </div>
  )
}

export default About
