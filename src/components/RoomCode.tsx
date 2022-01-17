import styles from '../styles/RoomCode.module.scss'

interface RoomCodeProps {
  code: string | string[];
}

function RoomCode(props: RoomCodeProps) {
  function CopyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code as string)
  }

  return (
    <button onClick={CopyRoomCodeToClipboard} className={styles.roomCode}>
      <div>
        <img src="/assets/images/copy.svg" alt="Copiar codigo da sala" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
}

export default RoomCode;
