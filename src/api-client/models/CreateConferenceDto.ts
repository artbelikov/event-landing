/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConferenceStatus } from './ConferenceStatus';

export type CreateConferenceDto = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    place: string;
    headliner: string;
    formId: number;
    status: ConferenceStatus;
    ownerId: number;
}