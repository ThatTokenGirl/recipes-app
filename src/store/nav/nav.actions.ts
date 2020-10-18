import { createAction } from "../helpers";

export const persistent = createAction("[NAV] Persistent");
export const temporary = createAction("[NAV] Temporary");
export const open = createAction("[NAV] Open");
export const close = createAction("[NAV] Close");
