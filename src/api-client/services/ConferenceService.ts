/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conference } from '../models/Conference';
import type { ConferenceSortField } from '../models/ConferenceSortField';
import type { CreateConferenceDto } from '../models/CreateConferenceDto';
import type { PaginatedConferenceResponseDto } from '../models/PaginatedConferenceResponseDto';
import type { SortOrder } from '../models/SortOrder';
import type { UpdateConferenceDto } from '../models/UpdateConferenceDto';
import { request as __request } from '../core/request';

export class ConferenceService {

    /**
     * Create a new conference
     * @param requestBody The conference creation payload
     * @returns Conference Conference successfully created.
     * @throws ApiError
     */
    public static async conferenceControllerCreate(
requestBody: CreateConferenceDto,
): Promise<Conference> {
        const result = await __request({
            method: 'POST',
            path: `/conference`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input.`,
            },
        });
        return result.body;
    }

    /**
     * Get all conferences
     * @param page 
     * @param limit 
     * @param search 
     * @param sortBy 
     * @param sortOrder 
     * @returns PaginatedConferenceResponseDto List of conferences.
     * @throws ApiError
     */
    public static async conferenceControllerFindAll(
page: number,
limit: number,
search: string,
sortBy: ConferenceSortField,
sortOrder: SortOrder,
): Promise<PaginatedConferenceResponseDto> {
        const result = await __request({
            method: 'GET',
            path: `/conference`,
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
     * Get a conference by ID
     * @param id 
     * @returns Conference Conference found.
     * @throws ApiError
     */
    public static async conferenceControllerFindOne(
id: string,
): Promise<Conference> {
        const result = await __request({
            method: 'GET',
            path: `/conference/${id}`,
            errors: {
                404: `Conference not found.`,
            },
        });
        return result.body;
    }

    /**
     * Update a conference
     * @param id 
     * @param requestBody The conference update payload
     * @returns Conference Conference successfully updated.
     * @throws ApiError
     */
    public static async conferenceControllerUpdate(
id: string,
requestBody: UpdateConferenceDto,
): Promise<Conference> {
        const result = await __request({
            method: 'PATCH',
            path: `/conference/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Conference not found.`,
            },
        });
        return result.body;
    }

    /**
     * Remove a conference
     * @param id 
     * @returns Conference Conference successfully removed.
     * @throws ApiError
     */
    public static async conferenceControllerRemove(
id: string,
): Promise<Conference> {
        const result = await __request({
            method: 'DELETE',
            path: `/conference/${id}`,
            errors: {
                404: `Conference not found.`,
            },
        });
        return result.body;
    }

}