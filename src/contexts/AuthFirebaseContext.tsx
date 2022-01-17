import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { loadFirebase } from "../services/firebase";

type AuthFirebaseContextType = {
  user: User | undefined
  SignInWithGoogle: () => Promise<void>
}
type User = {
  id: string
  name: string
  avatar: string
}
interface AuthFirebaseProviderProps{
  children: ReactNode
}

export const AuthFirebaseContext = createContext({} as AuthFirebaseContextType)

export function AuthFirebaseProvider({children} : AuthFirebaseProviderProps){
  const [ user, setUser ] = useState<User>()

  async function SignInWithGoogle(){
    const { auth, firebase } = loadFirebase()
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)

    if(result.user){
      const { displayName, photoURL, uid, } = result.user
      if(!displayName){
        throw new Error('Missing information from Google Account.')
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }
  useEffect(() => {
    const { auth } = loadFirebase()
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid} = user
        if(!displayName){
          throw new Error('Missing information from Google Account.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
    return () => {
      unsubscribe()
    }
  },[])

  return (
    <AuthFirebaseContext.Provider value={{
      user,
      SignInWithGoogle,
    }}>
      {children}
    </AuthFirebaseContext.Provider>
  )
}
