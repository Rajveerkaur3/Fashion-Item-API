import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../config/firebaseConfig";
import { AuthenticationError } from "../src/api/v1/errors/errors";

// Mock Firebase auth
jest.mock("../config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should throw error when no token is provided", async () => {
        await expect(
            authenticate(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            )
        ).rejects.toThrow(AuthenticationError);

        expect(nextFunction).not.toHaveBeenCalled();
    });

    it("should call next() when token is valid", async () => {
        // Arrange
        mockRequest.headers = {
            authorization: "Bearer valid-token",
        };

        // Mock successful verification
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "test-uid",
            role: "admin",
        });

        // Act
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(auth.verifyIdToken).toHaveBeenCalledWith("valid-token");
        expect(mockResponse.locals).toEqual({
            uid: "test-uid",
            role: "admin",
        });
        expect(nextFunction).toHaveBeenCalled();
    });

    it("should throw error when token verification fails", async () => {
        // Arrange
        mockRequest.headers = {
            authorization: "Bearer invalid-token",
        };

        // Mock failed verification
        (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(
            new Error("Invalid token")
        );

        // Act and Assert
        await expect(
            authenticate(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            )
        ).rejects.toThrow(AuthenticationError);

        expect(nextFunction).not.toHaveBeenCalled();
    });
});