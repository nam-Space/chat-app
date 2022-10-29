import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Navbar = () => {
	let {currentUser} = useContext(AuthContext)
	let {data} = useContext(ChatContext)

	const handleSignOut = () => {
		currentUser = {}
		data.chatId = 'null'
		data.user = {}
		signOut(auth)
	}

	return (
		<div className='navbar'>
			<span className="logo">Lama Chat</span>
			<div className="user">
				<img src={currentUser.photoURL} alt="" />
				<span>{currentUser.displayName}</span>
				<button onClick={handleSignOut}>Logout</button>
			</div>
		</div>
	)
}

export default Navbar