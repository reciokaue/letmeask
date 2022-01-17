import { useRouter } from "next/router";
// import { FormEvent, useState } from "react";
import { loadFirebase } from "../../../services/firebase"
import { useRoom } from "../../../hooks/useRoom";

// import UseAuthFirebase from "../../../hooks/useAuth";

import Button from "../../../components/Button";
import RoomCode from "../../../components/RoomCode";
import Question from "../../../components/Question";
import styles from '../../../styles/Room.module.scss'

function AdminRoom() {
  const router  = useRouter();
  const { roomId } = router.query
  // const { user } = UseAuthFirebase()

  const { database } = loadFirebase()
  const { questions, title } = useRoom(roomId)

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    router.push(`/rooms/new`)
  }
  async function handleCheckQuestionAsAnswered(questionId: string, atualState: boolean){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: !atualState
    })
  }
  async function handleHighlightQuestion(questionId: string, atualState: boolean){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: !atualState
    })
  }
  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm("Tem certeza que desaja excluir essa pergunta")){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id={styles.pageRoom}>
      <header>
        <div  className={styles.content}>
          <img src="/assets/images/logo.svg" alt="" />
          <div>
            <RoomCode code={roomId}/>
            <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className={styles.questionList}>
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && ( <>
                <button className={`${styles.likeButton} ${question.likeId && styles.liked}`} aria-label="Marcar pergunta como respondida" type="button" onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}>
                  <img src="/assets/images/answer.svg" alt="" />
                </button>
                <button className={`${styles.likeButton} ${question.likeId && styles.liked}`} aria-label="Deletar Pergunta" type="button" onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}>
                  <img src="/assets/images/check.svg" alt="" />
                </button>
              </>)}
              <button className={`${styles.likeButton} ${question.likeId && styles.liked}`} aria-label="Deletar Pergunta" type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <img src="/assets/images/delete.svg" alt="" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AdminRoom;
