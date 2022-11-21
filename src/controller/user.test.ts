// import { dbConnect } from "../db.connect";
// import { UserRepository } from "../repositories/user.repository";
// import mongoose, { MongooseError } from 'mongoose';

// jest.mock('../repositories/user');
// const mockUsers = [
// {
//     id: "0",
//     name: "Paquete",
//     email: "12345",
//     passwd: "asdfg",
//     role: "napper"
// },
// {
//     id: "0",
//     name: "HidraRobot",
//     email: "67894",
//     passwd: "112211",
//     role: "sleeper"
// },
// ];

// describe('Given userController', () => {
//     const repository = new UserRepository();
//     let testIds: Array<string>;
//     beforeAll(async () => {
//         await dbConnect();
//         await repository.Model().findById(mockUsers)
//         await repository.Model().create();
//         const data = await repository.Model().findOne(mockUsers);
//         testIds = [data[0].id, data[1].id];
//     });
// })
