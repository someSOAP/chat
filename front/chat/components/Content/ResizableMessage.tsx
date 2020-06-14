import React from "react";
import { ResizableListContext } from "./ResizableList";
import { Comment } from "antd";

interface ResizableMessageProps {
    text: string,
    title: string,
    index: number,
    dateString: string,
}

const ResizableMessage:React.FC<ResizableMessageProps> = ({ text, title, dateString, index }) => {

    const {setSize, windowWidth} = React.useContext(ResizableListContext);
    const root = React.useRef(null);

    React.useEffect(() => {
        setSize(index, root.current.getBoundingClientRect().height);
    }, [windowWidth]);

    const datetime = new Date(dateString);

    return (
        <div ref={root}>
            <Comment
                author = {<h4>{title}</h4>}
                content = {
                    <p>{text}</p>
                }
                datetime = {
                    `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`
                }
            />
        </div>
    );

};
export default ResizableMessage;
