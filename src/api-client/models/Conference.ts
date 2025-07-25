/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConferenceStatus } from './ConferenceStatus';

export type Conference = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    place: string;
    headliner: string;
    status: ConferenceStatus;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
    formId: number;
}