import * as React from "react";
import { Layout } from 'antd';
import Header from './components/Header';
import Content from "./components/Content";
import Footer from './components/Footer';

export const App:React.FC = () => {
    const socket : WebSocket = React.useMemo(() : WebSocket => new WebSocket(process.env.CHAT_WS), []);

    const [messages, setMessages] = React.useState([]);
    const [input, onChange]       = React.useState("");
    const listRef                 = React.useRef(null);

    socket.onmessage = ({data}) => {
        setMessages([...messages, JSON.parse(data)]);
    };

    React.useEffect(()=>{
        fetch('messages')
            .then(res=>res.json())
            .then(setMessages);
    }, []);

    React.useEffect(()=>{
        if(listRef.current){
            listRef.current.scrollToItem(messages.length, "end");
        }
    }, [messages]);

    return (
        <Layout style = {{position: "relative", height: "100%"}}>
            <Header/>
            <Content data={messages} listRef={listRef}/>
            <Footer onChange={onChange} input={input} socket={socket} />
        </Layout>
    )
};
