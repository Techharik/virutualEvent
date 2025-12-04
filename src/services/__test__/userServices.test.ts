import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserService } from "../userServices";
import { beforeEach, describe, expect, jest, test } from "@jest/globals"
import { Mocked } from "jest-mock";
import { AppError, NotFoundError, ValidationError } from "../../utils/errorHandler";
import { UserEntityType } from "../../domain/entities/UserEntityType";
jest.mock("../../utils/jwt", () => ({
    createToken: jest.fn(),
}));
import { createToken } from "../../utils/jwt";

describe("UserService Tests", () => {

    let mockRepo: Mocked<IUserRepository>;
    let mockValidator: any;
    let mockToken: any;
    let service: UserService;

    beforeEach(() => {
        jest.clearAllMocks();
        mockToken = {
            createToken: jest.fn()
        };
        mockRepo = {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
        };
        mockValidator = {
            vaildateRegister: jest.fn(),
            validateLogin: jest.fn()
        };

        service = new UserService(mockValidator, mockRepo);
    });

    describe("register()", () => {

        test("should register a new user", async () => {
            const dto = { name: "Hari", email: "hari@example.com", password: "123456" };
            mockValidator.vaildateRegister.mockReturnValue(dto);
            mockRepo.findByEmail.mockResolvedValue(null);
            const mockSavedUser = { id: "fake-id", ...dto } as any;
            mockRepo.createUser.mockResolvedValue(mockSavedUser);

            const result = await service.register(dto);

            expect(mockValidator.vaildateRegister).toHaveBeenCalledWith(dto);
            expect(mockRepo.findByEmail).toHaveBeenCalledWith(dto.email);
            expect(mockRepo.createUser).toHaveBeenCalledTimes(1);

            expect(result).toBe(mockSavedUser);
        });

    });
    test("should throw NotFoundError when email does not exist", async () => {
        const dto = { email: "notfound@example.com", password: "123456" };

        mockValidator.validateLogin.mockReturnValue(dto);
        mockRepo.findByEmail.mockResolvedValue(null); // email not in DB

        await expect(service.login(dto)).rejects.toBeInstanceOf(AppError);
        await expect(service.login(dto)).rejects.toThrow("Email not exists");

        expect(mockRepo.findByEmail).toHaveBeenCalledWith(dto.email);
    });
    test("Password comparison failed", async () => {

        // Make your mock user satisfy the real UserEntityType
        const verfiyPasswordMock: jest.MockedFunction<
            (candidate: string) => Promise<boolean>
        > = jest.fn(async (_candidate: string) => false);

        const user: UserEntityType = {
            id: "123",
            name: "Test User",
            email: "a@test.com",
            password: "hashed",
            verfiyPassword: verfiyPasswordMock
        };
        const password = "122232423@r";

        const dto = { email: 'a@test.com', password }
        mockValidator.validateLogin.mockReturnValue(dto)
        mockRepo.findByEmail.mockResolvedValue(user);
        // user.verfiyPassword()
        await expect(service.login(dto)).rejects.toBeInstanceOf(AppError)
        expect(user.verfiyPassword).toHaveBeenCalledWith(password)
    });
    test("Password comparison success", async () => {

        // Make your mock user satisfy the real UserEntityType
        const verfiyPasswordMock: jest.MockedFunction<
            (candidate: string) => Promise<boolean>
        > = jest.fn(async (_candidate: string) => true);

        const user: UserEntityType = {
            id: "123",
            name: "Test User",
            email: "a@test.com",
            password: "hashed",
            verfiyPassword: verfiyPasswordMock
        };
        const password = "122232423@r";

        const dto = { email: 'a@test.com', password }
        mockValidator.validateLogin.mockReturnValue(dto)
        mockRepo.findByEmail.mockResolvedValue(user);

        (createToken as jest.Mock<any>).mockResolvedValue("mock.jwt.token");
        const result = await service.login(dto);

        expect(mockValidator.validateLogin).toHaveBeenCalledWith(dto);
        expect(mockRepo.findByEmail).toHaveBeenCalledWith("a@test.com");
        expect(user.verfiyPassword).toHaveBeenCalledWith(password);
        expect(createToken).toHaveBeenCalledWith(user);
        expect(result).toEqual({ token: "mock.jwt.token" });

    });

});
