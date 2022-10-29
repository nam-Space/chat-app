import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext)
    const ref = useRef()

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })
        
        // ref.current.scrollIntoView({behavior: 'smooth'})

        return () => {
            unsubscribe()
        }
    }, [data.chatId])
    
    return (
        <div ref={ref} className='messages'>
            {messages.map(m => (
                <Message message={m} key={m.id}/>
            ))}
        </div>
    )
}

export default Messages