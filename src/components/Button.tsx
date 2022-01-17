import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from '../styles/Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

function Button({isOutlined = false, ...rest}: ButtonProps) {
  return (
    <button  className={`${styles.button} ${isOutlined && styles.outline}`} {...rest}/>
  );
}

export default Button;
