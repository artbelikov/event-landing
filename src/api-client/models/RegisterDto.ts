/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRole } from './UserRole';

export type RegisterDto = {
    email: string;
    password: string;
    role: UserRole;
}