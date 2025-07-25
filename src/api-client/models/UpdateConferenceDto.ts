/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConferenceStatus } from './ConferenceStatus';

export type UpdateConferenceDto = {
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    place?: string;
    headliner?: string;
    formId?: number;
    status?: ConferenceStatus;
    ownerId?: number;
}