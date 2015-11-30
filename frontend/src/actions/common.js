export const FETCHING_END       = "FETCHING_END"
export const FETCHING_START     = "FETCHING_START"
export const NOTIFICATION_READ  = "NOTIFICATION_READ"
export const NOTIFICATION_SET   = "NOTIFICATION_SET"
export const RESET              = "RESET"

export const fetchingEnd        = ()            => ({ type: FETCHING_END })
export const fetchingStart      = ()            => ({ type: FETCHING_START })
export const notificationRead   = ()            => ({ type: NOTIFICATION_READ })
export const notificationSet    = notification  => ({ type: NOTIFICATION_SET, notification })
export const reset              = ()            => ({ type: RESET })

export const constants = {
    NOTIFICATION_SUCCESS: "SUCCESS",
    NOTIFICATION_ERROR: "ERROR"
}
