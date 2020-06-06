import * as React from "react";
import { Comment } from 'antd';

export interface MessageProps {
    title: string,
    text:  string,
    msgRef:   React.Ref<HTMLDivElement>
}

export const Message:React.FC<MessageProps> = ({text, title, msgRef}) => {
    return (
        <Comment
            author={<h5>{title}</h5>}
            content={
                <p ref={msgRef}>{text}</p>
            }
        />
    )
};

export default React.memo(Message);
