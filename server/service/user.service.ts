import { getManager } from "typeorm";
import User from "../model/User";
import bcrypt from 'bcrypt';

export const createUser = async (username : string, password: string) => {
    if (username  && password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userRepository = getManager().getRepository(User);
        const user = {
            username ,
            password: hashedPassword,
        };
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
        return newUser;
    } else {
        throw new Error("Username and password required");
    }
};

export const findUserByID = async (id: number) => {
    const userRepository = getManager().getRepository(User);
    return userRepository.findOne(id);
};

export const findUserByUsername = async (username: string) => {
    const userRepository = getManager().getRepository(User);
    return userRepository.findOne({ username });
};




