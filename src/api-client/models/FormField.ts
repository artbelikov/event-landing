/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FormField = {
    id: number;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
    options?: Array<string>;
    validation?: any;
    order: number;
    conferenceId: number;
}