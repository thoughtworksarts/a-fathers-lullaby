import React, { useEffect, useState } from 'react'

import './Backdrop.css'

const Backdrop = (props) => {
  const [backdropClass, setBackdropClass] = useState('backdrop')
  const [isOpen, setIsOpen] = useState(props.isOpen)

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props.isOpen])

  useEffect(() => {
    if (props.isOpen) {
      setBackdropClass('backdrop open')
    } else {
      setBackdropClass('backdrop')
    }
  }, [props.isOpen])

  const clickHandler = () => {
    props.backdropClickHandler(!isOpen)
    setIsOpen(!isOpen)
  }

  return (
    <div className={backdropClass} onClick={() => clickHandler()} />
  )
}

export default Backdrop
