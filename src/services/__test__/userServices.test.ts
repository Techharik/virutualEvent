import { IUserRepository } from "domain/repositories/IUserRepository";
import { UserService } from "../userServices";
import { beforeEach, describe, expect, jest, test } from "@jest/globals"
import { UserEntityType } from "domain/entities/UserEntityType";
import { Mocked } from "jest-mock";
import { AppError, NotFoundError } from "../../utils/errorHandler";

describe("UserService Tests", () => {

    let mockRepo: Mocked<IUserRepository>;
    let mockValidator: any;
    let service: UserService;

    beforeEach(() => {
        jest.clearAllMocks();
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

        test("should throw NotFoundError when email does not exist", async () => {
            const dto = { email: "notfound@example.com", password: "123456" };

            mockValidator.validateLogin.mockReturnValue(dto);

            mockRepo.findByEmail.mockResolvedValue(null); // email not in DB

            await expect(service.login(dto)).rejects.toBeInstanceOf(AppError);
            await expect(service.login(dto)).rejects.toThrow("Email not exists");

            expect(mockRepo.findByEmail).toHaveBeenCalledWith(dto.email);
        });


    });

});
