import * as React from "react";
import { Comment } from 'antd';

export interface MessageProps {
    title: string,
    text:  string,
    msgRef:   React.Ref<HTMLDivElement>
}

export const Message = ({text, title, msgRef}: MessageProps) => {
    return (
        <Comment
            author={<h5>{title}</h5>}
            content={
                <p ref={msgRef}>{text}</p>
            }
        />
    )
};

export default Message;
