import React, { useContext, useRef } from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'

const Chat = () => {
	const {data} = useContext(ChatContext)
	const alertRef = useRef()
	console.log(data.chatId)

	const handleClose = () => {
		alertRef.current.style.display = 'none'
	}

	return (
		<div className='chat'>
			<div className="chatInfo">
				{(data.chatId !== 'null') && (
					<div className="chatInfo-wrapper">
						<img src={data.user?.photoURL} alt="" />
						<span>{data.user?.displayName}</span>
					</div>
				)}
				<div className="chatIcons">
					<img src={Cam} alt="" onClick={() => alert('We are updating!')} />
					<img src={Add} alt="" onClick={() => alert('We are updating!')} />
					<img src={More} alt="" onClick={() => alert('We are updating!')} />
				</div>	
			</div>	
			{(data.chatId === 'null') && (
				<div ref={alertRef} className="alert active">
					<div className="alert-mess">
						<AiFillInfoCircle className='alert-mess-icon'/>
						<span>Please choose the user to chat!</span>
					</div>
					<AiOutlineClose className='alert-close'onClick={handleClose}/>
				</div>
			)}
			<Messages />
			<Input />
		</div>
	)
}

export default Chat