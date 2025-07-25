/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGuestDto } from '../models/CreateGuestDto';
import type { Guest } from '../models/Guest';
import type { SortOrder } from '../models/SortOrder';
import type { UpdateGuestDto } from '../models/UpdateGuestDto';
import { request as __request } from '../core/request';

export class GuestService {

    /**
     * Create a new guest
     * @param requestBody The guest creation payload
     * @returns Guest Guest successfully created.
     * @throws ApiError
     */
    public static async guestControllerCreate(
requestBody: CreateGuestDto,
): Promise<Guest> {
        const result = await __request({
            method: 'POST',
            path: `/guest`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input.`,
            },
        });
        return result.body;
    }

    /**
     * Get all guests
     * @param page 
     * @param limit 
     * @param search 
     * @param sortBy 
     * @param sortOrder 
     * @returns Guest List of guests.
     * @throws ApiError
     */
    public static async guestControllerFindAll(
page: number,
limit: number,
search: string,
sortBy: string,
sortOrder: SortOrder,
): Promise<Array<Guest>> {
        const result = await __request({
            method: 'GET',
            path: `/guest`,
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
        return result.body;
    }

    /**
     * Get a guest by ID
     * @param id 
     * @returns Guest Guest found.
     * @throws ApiError
     */
    public static async guestControllerFindOne(
id: string,
): Promise<Guest> {
        const result = await __request({
            method: 'GET',
            path: `/guest/${id}`,
            errors: {
                404: `Guest not found.`,
            },
        });
        return result.body;
    }

    /**
     * Update a guest
     * @param id 
     * @param requestBody The guest update payload
     * @returns Guest Guest successfully updated.
     * @throws ApiError
     */
    public static async guestControllerUpdate(
id: string,
requestBody: UpdateGuestDto,
): Promise<Guest> {
        const result = await __request({
            method: 'PATCH',
            path: `/guest/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Guest not found.`,
            },
        });
        return result.body;
    }

    /**
     * Remove a guest
     * @param id 
     * @returns Guest Guest successfully removed.
     * @throws ApiError
     */
    public static async guestControllerRemove(
id: string,
): Promise<Guest> {
        const result = await __request({
            method: 'DELETE',
            path: `/guest/${id}`,
            errors: {
                404: `Guest not found.`,
            },
        });
        return result.body;
    }

    /**
     * Get guests by conference ID
     * @param conferenceId 
     * @param page 
     * @param limit 
     * @param search 
     * @param sortBy 
     * @param sortOrder 
     * @returns Guest List of guests.
     * @throws ApiError
     */
    public static async guestControllerFindByConference(
conferenceId: string,
page: number,
limit: number,
search: string,
sortBy: string,
sortOrder: SortOrder,
): Promise<Array<Guest>> {
        const result = await __request({
            method: 'GET',
            path: `/guest/conference/${conferenceId}`,
            query: {
                'page': page,
                'limit': limit,
                'search': search,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
            errors: {
                404: `Conference not found.`,
            },
        });
        return result.body;
    }

}