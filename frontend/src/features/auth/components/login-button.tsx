import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"

const LoginButton = () => {
  const navigate = useNavigate()
  return <Button onClick={() => navigate("/login")}>Login</Button>
}

export default LoginButton