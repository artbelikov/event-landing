/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageBlock } from '../models/PageBlock';
import { request as __request } from '../core/request';

export class PageBlocksService {

    /**
     * Create a new page block
     * @returns PageBlock Page block successfully created.
     * @throws ApiError
     */
    public static async pageBlockControllerCreate(): Promise<PageBlock> {
        const result = await __request({
            method: 'POST',
            path: `/page-blocks`,
        });
        return result.body;
    }

    /**
     * Get all page blocks
     * @returns PageBlock List of page blocks.
     * @throws ApiError
     */
    public static async pageBlockControllerFindAll(): Promise<Array<PageBlock>> {
        const result = await __request({
            method: 'GET',
            path: `/page-blocks`,
        });
        return result.body;
    }

    /**
     * Get page blocks by conference ID
     * @param conferenceId 
     * @returns PageBlock List of page blocks for the conference.
     * @throws ApiError
     */
    public static async pageBlockControllerFindByConference(
conferenceId: string,
): Promise<Array<PageBlock>> {
        const result = await __request({
            method: 'GET',
            path: `/page-blocks/conference/${conferenceId}`,
        });
        return result.body;
    }

    /**
     * Get a page block by ID
     * @param id 
     * @returns PageBlock Page block found.
     * @throws ApiError
     */
    public static async pageBlockControllerFindOne(
id: string,
): Promise<PageBlock> {
        const result = await __request({
            method: 'GET',
            path: `/page-blocks/${id}`,
            errors: {
                404: `Page block not found.`,
            },
        });
        return result.body;
    }

    /**
     * Update a page block
     * @param id 
     * @returns PageBlock Page block successfully updated.
     * @throws ApiError
     */
    public static async pageBlockControllerUpdate(
id: string,
): Promise<PageBlock> {
        const result = await __request({
            method: 'PATCH',
            path: `/page-blocks/${id}`,
            errors: {
                404: `Page block not found.`,
            },
        });
        return result.body;
    }

    /**
     * Remove a page block
     * @param id 
     * @returns PageBlock Page block successfully removed.
     * @throws ApiError
     */
    public static async pageBlockControllerRemove(
id: string,
): Promise<PageBlock> {
        const result = await __request({
            method: 'DELETE',
            path: `/page-blocks/${id}`,
            errors: {
                404: `Page block not found.`,
            },
        });
        return result.body;
    }

    /**
     * Reorder page blocks
     * @param conferenceId 
     * @param requestBody 
     * @returns any Page blocks successfully reordered.
     * @throws ApiError
     */
    public static async pageBlockControllerReorderBlocks(
conferenceId: string,
requestBody: Array<string>,
): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/page-blocks/reorder/${conferenceId}`,
            body: requestBody,
            mediaType: 'application/json',
        });
        return result.body;
    }

}