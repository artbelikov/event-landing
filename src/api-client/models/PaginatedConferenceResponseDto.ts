/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Conference } from './Conference';
import type { PaginationMeta } from './PaginationMeta';

export type PaginatedConferenceResponseDto = {
    /**
     * Array of conferences
     */
    data: Array<Conference>;
    meta: PaginationMeta;
}