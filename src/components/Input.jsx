import React, { useCallback, useContext, useEffect, useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {IoIosCloseCircle} from 'react-icons/io'

const Input = () => {
	const [text, setText] = useState('')
	const [img, setImg] = useState(null)
	const [linkImg, setLinkImg] = useState('')

	const {currentUser} = useContext(AuthContext)
	const {data} = useContext(ChatContext)

	const handleSend = async () => {
		if ((text || img) && data.chatId !== 'null') {
			if (img) {
				const storageRef = await ref(storage, uuid())

				await uploadBytesResumable(storageRef, img).then(
					() => {
						getDownloadURL(storageRef).then(async (downloadURL) => {
							try {
								await updateDoc(doc(db, 'chats', data.chatId), {
									messages: arrayUnion({
										id: uuid(),
										text,
										senderId: currentUser.uid,
										date: Timestamp.now(),
										img: downloadURL
									})
								})
							}
							catch(err) {
								
							}
						})
						
					},
				)
			} else {
				await updateDoc(doc(db, 'chats', data.chatId), {
					messages: arrayUnion({
						id: uuid(),
						text,
						senderId: currentUser.uid,
						date: Timestamp.now()
					})
				})
			}

			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[data.chatId + '.lastMessage']: {
					text,
					latestImg: linkImg
				},
				[data.chatId + '.date'] : serverTimestamp()
			})

			await updateDoc(doc(db, 'userChats', data.user.uid), {
				[data.chatId + '.lastMessage'] : {
					text,
					latestImg: linkImg
				},
				[data.chatId + '.date'] : serverTimestamp()
			})

			setText('')
			setImg(null)
		} else if (data.chatId === 'null') {
			alert('Please select the user to chat!')
		}

		setLinkImg('')
	}

	const handleKeyDown = (e) => {
		e.code === 'Enter' && handleSend()
	}

	const handleChooseImage = async (e) => {
		if (data.chatId !== 'null') {
			const imgChosen = e.target.files[0]
			setImg(imgChosen)
			const storageRef = await ref(storage, uuid())

			await uploadBytesResumable(storageRef, imgChosen).then(
				() => {
					getDownloadURL(storageRef).then(async (downloadURL) => {
						try {
							await setLinkImg(downloadURL)
						}
						catch(err) {
							console.log(err)
						}
					})
					
				},
			)

		} else {
			e.preventDefault()
			alert('Please select the user to chat!')
		}
	}

	const handleCloseImage = () => {
		setLinkImg('')
		setImg(null)
	}

	return (
		<>
			{linkImg && (
				<div className="wrap-img">
					<div className="img-item">
						<img src={linkImg} alt="" />
						<IoIosCloseCircle className='img-close' onClick={handleCloseImage}/>
					</div>
				</div>
			)}
			<div className='input'>
				<input 
					type="text" 
					placeholder='Type something...' 
					onChange={e => setText(e.target.value)}
					value={text}
					onKeyDown={handleKeyDown}
				/>
				<div className="send">
					<img src={Attach} alt="" onClick={() => alert('We are updating!')}/>
					<input 
						type="file" 
						style={{display: 'none'}} 
						id="file" 
						onChange={handleChooseImage}
					/>
					<label htmlFor="file">
						<img src={Img} alt=""/>
					</label>
					<button onClick={handleSend}>Send</button>
				</div>
				
			</div>
		</>
	)
}

export default Input