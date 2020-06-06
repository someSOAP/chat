import React from "react";
import { ResizableListContext } from "./ResizableList";
import { Comment } from "antd";

interface ResizableMessageProps {
    text: string,
    title: string,
    index: number
}

const ResizableMessage:React.FC<ResizableMessageProps> = ({ text, title, index }) => {

    const {setSize, windowWidth} = React.useContext(ResizableListContext);
    const root = React.useRef(null);

    React.useEffect(() => {
        setSize(index, root.current.getBoundingClientRect().height);
    }, [windowWidth]);

    return (
        <div ref={root}>
            <Comment
                author={<h5>{title}</h5>}
                content={
                    <p>{text}</p>
                }
            />
        </div>
    );

};
export default ResizableMessage;
