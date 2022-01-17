import Link from 'next/link'
import router from 'next/router'
import { FormEvent, useState } from 'react'
import Button from '../../components/Button'
import UseAuthFirebase from '../../hooks/useAuth'
import { loadFirebase } from '../../services/firebase'

import styles from '../../styles/NewRoom.module.scss'

export default function NewRoom() {
  const { user } = UseAuthFirebase()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()
    const { database } = loadFirebase()

    if(newRoom.trim() === ''){
      return
    }
    const roomRef = database.ref('rooms')
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    router.push(`/rooms/${firebaseRoom.key}`)
  }

  const [ newRoom, setNewRoom ] = useState('')

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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input onChange={event => setNewRoom(event.target.value)} value={newRoom} type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala Existente? 
            <Link href="/"> Clique aqui</Link>
          </p>
         </div>
       </main>
    </section>
  )
}
