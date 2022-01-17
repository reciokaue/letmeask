import { useRouter } from 'next/router'
import UseAuthFirebase from '../hooks/useAuth'

import Button from '../components/Button'
import styles from '../styles/Home.module.scss'
import { FormEvent, useState } from 'react'
import { loadFirebase } from '../services/firebase'

export default function Home() {
  const { user, SignInWithGoogle } = UseAuthFirebase()
  const [ roomCode, setRoomCode ] = useState('')

  const router = useRouter()

  async function HandleCreateRoom(){
    if(!user){
      await SignInWithGoogle()
      router.push('/newRoom')
    }else{
      router.push('/rooms/new')
    }
  }
  async function JoinRoom(event: FormEvent){
    event.preventDefault()
    const { database } = loadFirebase()

    if(roomCode.trim() === ''){
      return
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get()
    if(!roomRef.exists()){
      alert('Room doesnt exists.')
      return
    }
    if(roomRef.val().endedAt){
      alert('Room already closed.')
      return
    }
    router.push(`/rooms/${roomCode}`)
  }
  
  return (
    <section id={styles.pageAuth}>
       <aside>
         <img src="/assets/images/illustration.svg" alt="ilustração simbolizando perguntas e respostas" />
         <strong>Crie salas<br/> de  Q&amp;A ao-vivo</strong>
         <p>Tire as dúvidas da sua audiência em tempo real</p>
       </aside>
       <main>
         <div className={styles.mainContent}>
          <img src="/assets/images/logo.svg" alt="Letmeask" />
            <button onClick={HandleCreateRoom} className={styles.createRoom}>
              <img src="/assets/images/google-icon.svg" alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form onSubmit={JoinRoom}>
            <input onChange={event => setRoomCode(event.target.value)} value={roomCode} type="text" placeholder="Digite o codigo da sala" />
            <Button type="submit">Entrar na Sala</Button>
          </form>
         </div>
       </main>
    </section>
  )
}
