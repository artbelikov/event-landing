/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConferenceStatus } from './ConferenceStatus';

export type Conference = {
    id: number;
    name: string;
    description: string;
    place: string;
    headliner?: string;
    customUrl?: string;
    status: ConferenceStatus;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
    formId: number;
}