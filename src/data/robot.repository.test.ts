import mongoose, { Error } from "mongoose";
import { dbConnect } from "../db.connect";
import { RobotRepository } from "./robot.repository";

const mockData = [
    {
        id: '0',
        name: 'test1',
        speed: 4,
        endurance: 2,
        dateOfCreation: '18'
    },
    {
        id: '1',
        name: 'test2',
        speed: 5,
        endurance: 9,
        dateOfCreation: '12'
    },
];
describe('Given robot repository', () => {
    const repository = new RobotRepository();
    let testIds : Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockData);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });
    test('Then getAll...', async () => {
        const result = await repository.getAll();
        expect(result[0].name).toEqual(mockData[0].name);
    })
    test('then when getAll cannot receive correct information, it should throw an error', () => {
        //
    })
    test('then get should receive concrete information about specific items', async () =>  {
        const result = await repository.get(testIds[0]);
        expect(result.name).toEqual(mockData[0].name)
    })
    test('When get does not receive correct information, it should throw an error', async () => {
       
        expect(async () => {await repository.get(testIds[3])}).rejects.toThrowError()
    })
    test('Then post should return the new object just created', async () => {
        const newRobot = {
            "name": "manolito"
        }
        const result = await repository.post(newRobot);
        expect(result.name).toEqual(newRobot.name);
    })
    
    test('Then patch should return the modified object', async () => {
        const updatedRobot = {
            name: "Titan"
        }
        const result = await repository.patch(testIds[0], updatedRobot);
        expect(result.name).toEqual(updatedRobot.name);
    })
    test('then when patch cannot receive correct information, it should throw an error', async () => {
        const updatedRobot = {
            name: "Titan"
        }
        expect(async () => { await repository.patch(testIds[3], updatedRobot)}).rejects.toThrowError()
    })
    test('Then delete should return an empty object', async () => {
        const result = await repository.delete(testIds[0]);
        expect(result).toBeUndefined();
    })
    test('if delete method is incorrect, it should throw an error', async () => {
        expect (async () => {await repository.delete(testIds[3])}).rejects.toThrowError();  
        
    })
    afterAll(async () => {
        await repository.disconnect();
    });
})
