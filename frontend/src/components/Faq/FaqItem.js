import { useState } from "react" 
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'

const FaqItem = ({item}) => {

    const [isOpen,setIsOpen] = useState(false)

    const toggleAcc = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className="p-3 lg:p-4 rounded-[12px] border border-solid border-sky-500 mb-5 cursor-pointer ">
        <div className="flex items-center justify-between gap-5" onClick={toggleAcc}>
            <h4 className="text-[16px] leading-7 lg:text-[20px] lg:leading-8 text-darkColor font-[500]">{item.question}</h4>
            <div className={` w-7 h-7 lg:w-8 lg:h-8 border border-solid border-r-darkColor rounded flex items-center justify-center`}>{isOpen ? <AiOutlineMinus/> : <AiOutlinePlus/>}
            </div>
        </div>

        {isOpen && <div className="mt-4">
            <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-gray-500">{item.content}</p>
            </div>}

    </div>
  )
}

export default FaqItem
