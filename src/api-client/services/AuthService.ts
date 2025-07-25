/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { User } from '../models/User';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Register a new user
     * @param requestBody The user registration payload
     * @returns User User successfully registered.
     * @throws ApiError
     */
    public static async authControllerRegister(
requestBody: RegisterDto,
): Promise<User> {
        const result = await __request({
            method: 'POST',
            path: `/auth/register`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input.`,
            },
        });
        return result.body;
    }

    /**
     * User login
     * @param requestBody The user login payload
     * @returns any User successfully logged in.
     * @throws ApiError
     */
    public static async authControllerLogin(
requestBody: LoginDto,
): Promise<{
access_token?: string,
user?: User,
}> {
        const result = await __request({
            method: 'POST',
            path: `/auth/login`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized.`,
            },
        });
        return result.body;
    }

    /**
     * Google authentication callback
     * @returns any Google authentication successful.
     * @throws ApiError
     */
    public static async authControllerGoogleAuthCallback(): Promise<{
access_token?: string,
user?: User,
}> {
        const result = await __request({
            method: 'GET',
            path: `/auth/google/callback`,
        });
        return result.body;
    }

}