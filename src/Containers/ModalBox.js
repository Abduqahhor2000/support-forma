import { motion } from 'framer-motion'
import React from 'react'

function ModalBox(props) {
    const setModal = props.setModal
  return (
    <>
        <motion.div 
            onClick={() => setModal("")}
            initial={{
               opacity: 0
              }}
            animate={{
               opacity: 1
              }}
            exit={{
               opacity: 0
            }}
            className="fixed h-screen w-screen z-10 top-0 left-0 bg-blacker-02 backdrop-blur-sm" 
        >
        </motion.div>
        <motion.div 
            initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.6,
              }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.2,
                }
              }}
            exit={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.4,
                transition: {
                    duration: 0.1,
                }
              }}
            className="fixed w-fit h-fit z-10 bg-lighter-01 m-auto inset-0 rounded-2xl"
        >
            <motion.div
                initial={{
                    
                }}
                animate={{
                    
                }}
                className="relative"
            >
                {props.children}
            </motion.div>
        </motion.div>
    </>
  )
}

export default ModalBox;