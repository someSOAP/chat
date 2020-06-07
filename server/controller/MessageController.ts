import { getManager } from "typeorm";
import { Message } from "../entity/Message";

export const saveMessage = async (msg: string) => {
    const message = JSON.parse(msg);
    if(message.text){
        const msgRepository = getManager().getRepository(Message);
        const newMsg = msgRepository.create(message);
        await msgRepository.save(newMsg);
        return newMsg;
    }
};

export const getAllMessages = async () => {
    const postRepository = getManager().getRepository(Message);
    return postRepository.find();
};
