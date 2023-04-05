import classNames from "classnames"
import React from "react"

type Props = {
    children:React.ReactNode,
    onClick:()=>void,
    disabled:boolean,
    type:React.ButtonHTMLAttributes<HTMLButtonElement>
}

const  Button:React.FC<Props> = (props)=> {
    const btn_classes = classNames("bg-slate-400 transition py-2 dark:bg-btn-blue rounded px-4 text-white disabled:cursor-not-allowed disabled:opacity-50")
  return (
    <button 
            className={btn_classes}
            disabled={props.disabled}
          >
            Join
          </button>
  )
}

export default Button