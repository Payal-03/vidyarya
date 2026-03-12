// import React, { useContext, useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { AppContext } from "../context/AppContext";
// import { toast } from "react-toastify";
// import { io } from "socket.io-client";
// import Loader from "../components/Loader";

// const ChatRoomPage = () => {
//   const { backendUrl, userData } = useContext(AppContext);
//   const { roomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const bottomRef = useRef(null);
//   const socketRef = useRef(null);
//   const [sending, setSending] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchMessages = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/chat/rooms/${roomId}/messages`, { withCredentials: true });
//       data.success ? setMessages(data.messages) : toast.error(data.message);
//     } catch (err) {
//       toast.error(err.message);
//     } finally { setLoading(false); }
//   };

//   const joinRoom = async () => {
//     try {
//       await axios.post(`${backendUrl}/api/chat/rooms/${roomId}/join`, {}, { withCredentials: true });
//     } catch (err) {
//       // ignore silently
//     }
//   };

//   useEffect(() => {
//     joinRoom();
//     fetchMessages();
//     // connect socket
//     const socket = io(backendUrl, { withCredentials: true });
//     socketRef.current = socket;
//     socket.emit("join-room", { roomId });
//     socket.on("chat-message", (message) => {
//       if (message.roomId === roomId || message.roomId?._id === roomId) {
//         setMessages((m) => [...m, message]);
//       }
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId]);

//   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

//   const send = async (e) => {
//     e.preventDefault();
//     if (!text.trim() || sending) return;
//     const payload = { senderName: userData?.name || "User", text };
//     try {
//       setSending(true);
//       const { data } = await axios.post(`${backendUrl}/api/chat/rooms/${roomId}/messages`, payload, { withCredentials: true });
//       if (data.success) {
//         // avoid local double-add; rely on socket event
//         setText("");
//       } else toast.error(data.message);
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setSending(false);
//     }
//   };

//   const getInitial = (name) => (name?.[0] || "").toUpperCase();

//   return (
//     <div>
//       <Navbar />
//       <div className="w-full max-w-3xl mx-auto p-6">
//         <div className="border-2 border-[#2A4674] rounded-2xl p-4 mt-8 h-[70vh] flex flex-col">
//           <div className="flex-1 overflow-y-auto space-y-3" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
//             {loading ? (
//               <Loader label="Loading messages..." />
//             ) : messages.length === 0 ? (
//               <div className="text-center text-gray-600 mt-6">No messages yet. Say hello!</div>
//             ) : (
//               messages.map((m) => {
//                 const isSelf = m.senderName === (userData?.name || "User");
//                 return (
//                   <div key={m._id} className={`flex items-start gap-3 px-1 ${isSelf?"justify-end":"justify-start"}`}>
//                     {!isSelf && (
//                       <div className="w-10 h-10 rounded-full bg-[#2A4674] text-white flex items-center justify-center font-bold">
//                         {getInitial(m.senderName)}
//                       </div>
//                     )}
//                     <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow ${isSelf?"bg-[#2A4674] text-white":"bg-white text-[#2A4674]"}`}>
//                       <div className={`font-semibold bg-transparent ${isSelf?"text-white/90":"text-[#2A4674]"}`}>{m.senderName}</div>
//                       <div className="mt-0.5 leading-relaxed bg-transparent">{m.text}</div>
//                     </div>
//                     {isSelf && (
//                       <div className="w-10 h-10 rounded-full bg-[#2A4674] text-white flex items-center justify-center font-bold">
//                         {getInitial(m.senderName)}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//             <div ref={bottomRef} />
//           </div>
//           <form onSubmit={send} className="mt-3 flex gap-3">
//             <input className="flex-1 px-4 py-3 border-2 border-[#2A4674] rounded-full" placeholder="Type message" value={text} onChange={(e)=>setText(e.target.value)} disabled={sending} />
//             <button disabled={sending} className={`px-6 py-3 rounded-full text-white ${sending?"opacity-60 cursor-not-allowed":""}`} style={{ backgroundColor: '#2A4674' }}>
//               {sending ? 'Sending…' : 'Send'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatRoomPage;
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Loader from "../components/Loader";
import { FaTrash, FaArrowLeft } from "react-icons/fa";

const ChatRoomPage = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const socketRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchRoomDetails = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/chat/rooms`, { withCredentials: true });
      if (data.success) {
        const currentRoom = data.rooms.find(r => r._id === roomId);
        setRoom(currentRoom);
      }
    } catch (err) {
      console.error('Error fetching room details:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/chat/rooms/${roomId}/messages`, { withCredentials: true });
      data.success ? setMessages(data.messages) : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally { setLoading(false); }
  };

  const joinRoom = async () => {
    try {
      await axios.post(`${backendUrl}/api/chat/rooms/${roomId}/join`, {}, { withCredentials: true });
    } catch (err) {
      // ignore silently
    }
  };

  useEffect(() => {
    joinRoom();
    fetchMessages();
    fetchRoomDetails();

    const socket = io(backendUrl, { withCredentials: true });
    socketRef.current = socket;
    socket.emit("join-room", { roomId });
    socket.on("chat-message", (message) => {
      if (message.roomId === roomId || message.roomId?._id === roomId) {
        setMessages((m) => [...m, message]);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    const payload = { senderName: userData?.name || "User", text };
    try {
      setSending(true);
      const { data } = await axios.post(`${backendUrl}/api/chat/rooms/${roomId}/messages`, payload, { withCredentials: true });
      if (data.success) {
        setText("");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  const getInitial = (name) => (name?.[0] || "").toUpperCase();

  const handleDeleteRoom = async () => {
    setDeletingRoom(true);
    try {
      await axios.delete(`${backendUrl}/api/chat/rooms/${roomId}`, {
        withCredentials: true
      });
      toast.success('Room deleted successfully');
      navigate('/chat');
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error(error.response?.data?.message || 'Failed to delete room');
    } finally {
      setDeletingRoom(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#2A4674] text-white px-6 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Group Chat</h2>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-white"></div>
          <div className="w-8 h-8 rounded-full bg-white"></div>
          <button className="w-8 h-8 rounded-full bg-white text-[#2A4674] text-xl font-bold">+</button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Timestamp */}
        <p className="text-center text-sm text-black mt-2">Sat, 2:22 PM</p>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <Loader label="Loading messages..." />
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-600 mt-6">No messages yet. Say hello!</div>
          ) : (
            messages.map((m) => {
              const isSelf = m.senderName === (userData?.name || "User");
              return (
                <div key={m._id} className={`flex items-start gap-2 ${isSelf ? "justify-end" : "justify-start"}`}>
                  {!isSelf && (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <img src="/default-avatar.png" alt="avatar" className="rounded-full" />
                    </div>
                  )}
                  <div className={`max-w-[60%] rounded-xl px-4 py-2 ${isSelf ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}>
                    {m.text}
                  </div>
                  {isSelf && (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <img src="/default-avatar.png" alt="avatar" className="rounded-full" />
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={send} className="flex items-center border-t border-gray-300 p-3 bg-gray-50">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={sending}
          />
          <button
            disabled={sending}
            className="ml-2 px-5 py-2 bg-[#2A4674] text-white rounded-lg disabled:opacity-50"
          >
            {sending ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoomPage;