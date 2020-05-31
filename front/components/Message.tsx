import * as React from "react";
import { Comment } from 'antd';

export const Message = ({title, text}) => {
    return (
        <Comment
            author={<h6>{title}</h6>}
            content={
                <p>{text}</p>
            }
        />
    )
};

export default Message;
