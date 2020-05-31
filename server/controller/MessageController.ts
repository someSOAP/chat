import { getManager } from "typeorm";
import { Message } from "../entity/Message";

export const saveMessage = async (msg: string) => {
    const message = JSON.parse(msg);
    const postRepository = getManager().getRepository(Message);
    const newPost = postRepository.create(message);
    await postRepository.save(newPost);
    return newPost;
};

export const getAllMessages = async () => {
    const postRepository = getManager().getRepository(Message);
    return postRepository.find();
};
