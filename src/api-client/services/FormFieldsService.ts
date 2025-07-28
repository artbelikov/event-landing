/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormField } from '../models/FormField';
import { request as __request } from '../core/request';

export class FormFieldsService {

    /**
     * Create a new form field
     * @returns FormField Form field successfully created.
     * @throws ApiError
     */
    public static async formFieldControllerCreate(): Promise<FormField> {
        const result = await __request({
            method: 'POST',
            path: `/form-fields`,
        });
        return result.body;
    }

    /**
     * Get all form fields
     * @returns FormField List of form fields.
     * @throws ApiError
     */
    public static async formFieldControllerFindAll(): Promise<Array<FormField>> {
        const result = await __request({
            method: 'GET',
            path: `/form-fields`,
        });
        return result.body;
    }

    /**
     * Get form fields by conference ID
     * @param conferenceId 
     * @returns FormField List of form fields for the conference.
     * @throws ApiError
     */
    public static async formFieldControllerFindByConference(
conferenceId: string,
): Promise<Array<FormField>> {
        const result = await __request({
            method: 'GET',
            path: `/form-fields/conference/${conferenceId}`,
        });
        return result.body;
    }

    /**
     * Get a form field by ID
     * @param id 
     * @returns FormField Form field found.
     * @throws ApiError
     */
    public static async formFieldControllerFindOne(
id: string,
): Promise<FormField> {
        const result = await __request({
            method: 'GET',
            path: `/form-fields/${id}`,
            errors: {
                404: `Form field not found.`,
            },
        });
        return result.body;
    }

    /**
     * Update a form field
     * @param id 
     * @returns FormField Form field successfully updated.
     * @throws ApiError
     */
    public static async formFieldControllerUpdate(
id: string,
): Promise<FormField> {
        const result = await __request({
            method: 'PATCH',
            path: `/form-fields/${id}`,
            errors: {
                404: `Form field not found.`,
            },
        });
        return result.body;
    }

    /**
     * Remove a form field
     * @param id 
     * @returns FormField Form field successfully removed.
     * @throws ApiError
     */
    public static async formFieldControllerRemove(
id: string,
): Promise<FormField> {
        const result = await __request({
            method: 'DELETE',
            path: `/form-fields/${id}`,
            errors: {
                404: `Form field not found.`,
            },
        });
        return result.body;
    }

    /**
     * Sync form fields with guest properties
     * @param conferenceId 
     * @param requestBody 
     * @returns any Form fields successfully synced.
     * @throws ApiError
     */
    public static async formFieldControllerSyncWithGuestProperties(
conferenceId: string,
requestBody: Array<string>,
): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/form-fields/sync/${conferenceId}`,
            body: requestBody,
            mediaType: 'application/json',
        });
        return result.body;
    }

}