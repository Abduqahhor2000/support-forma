import React, {useState} from 'react'

export default function CareerForm() {
  const [isNext, setIsNext] = useState(false)
  return (
    <div  className='bg-form-bg'>
      <div className='w-[1160px] mx-auto min-h-[500px]'>
        <div className={`flex relative mb-[70px] text-2xl font-semibold tracking-widest mt-14 pb-5 border-b-[4px] after:content-[""] after:block after:bg-border-active after:h-1 after:w-1/2 after:absolute after:-bottom-1 after:duration-500 ${isNext ? "after:left-1/2" : "after:left-0"} border-solid border-form-border`}>
          <span onClick={()=> setIsNext(false)} className='w-1/2 text-main-text text-center'>Education</span>
          <span onClick={()=> setIsNext(true)} className='w-1/2 text-main-text text-center'>Working experience</span>
        </div>
        <div className='max-w-[1024px] mx-auto'>
          <div className='text-2xl text-main-text font-semibold'>Education process</div>
          <div className='flex pt-5 pb-7'>

          </div>
        </div>
      </div>
    </div>
   
  )
}
