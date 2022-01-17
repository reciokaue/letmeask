import { useContext } from "react"
import { AuthFirebaseContext } from "../contexts/AuthFirebaseContext"

const UseAuthFirebase = () => {
  const value = useContext(AuthFirebaseContext)
  return value
}
export default UseAuthFirebase