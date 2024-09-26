import clsx from 'clsx'
import * as React from 'react'

export interface LabelProps {
  children: React.ReactNode
}
export type LabelRef = HTMLLabelElement

const Label = React.forwardRef<LabelRef, LabelProps>(({children}, ref) => (
  <label ref={ref} className={clsx('label')}>
    {children}
  </label>
))
Label.displayName = 'Label'

export {Label}