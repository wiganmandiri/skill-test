import React, { useEffect, useRef, useState } from 'react'

const Modal = ({
  isOpen,
  setIsOpen,
  children
}: any) => {

  const ref: any = useRef()

  useEffect(() => {
    if (isOpen) {
      const checkIfClickedOutside = (e: any) => {
        if (isOpen && ref.current && !ref.current.contains(e.target)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
        // Cleanup the event listener
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
    }
  }, [isOpen]) //eslint-disable-line

  return isOpen && (
    <div className='fixed z-[99] inset-0 w-screen h-screen bg-slate-400 bg-opacity-25 backdrop-blur-sm'>
      <div className='flex items-center justify-center w-full h-full p-10'>
        <div ref={ref} className="min-w-[30rem] bg-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal