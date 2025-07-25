/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class AppService {

    /**
     * Get application status
     * @returns any Application is running.
     * @throws ApiError
     */
    public static async appControllerGetStatus(): Promise<{
status?: string,
message?: string,
}> {
        const result = await __request({
            method: 'GET',
            path: `/`,
        });
        return result.body;
    }

}