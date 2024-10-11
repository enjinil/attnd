import clsx from 'clsx'
import * as React from 'react'
import {useNavigate} from 'react-router-dom'

const variantClass = {
  primary: 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600',
  secondary: 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200',
  outline: 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100',
  success: 'bg-green-600 text-white border-green-700 hover:bg-green-700',
  danger: 'bg-red-500 text-white border-red-600 hover:bg-red-600',
  warning: 'bg-yellow-600 text-white border-yellow-700 hover:bg-yellow-700',
}

type Variant = keyof typeof variantClass

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  type?: 'button' | 'submit'
  variant?: Variant,
  to?: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  to,
  onClick,
  className,
  isLoading,
  ...props
}, ref) => {
  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent) {
    if(to) {
      navigate(to)
    }

    onClick?.(e)
  }
  
  return (
    <button
      ref={ref}
      className={clsx(
        'text-sm font-bold tracking-wide h-8 px-4 py-1 cursor-pointer inline-flex justify-center items-center border-2 rounded focus:ring-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClass[variant],
        className,
      )}
      onClick={handleClick}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading.." : children}
    </button>
  )
})