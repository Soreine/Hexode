export const NOTIFICATION_SET = "NOTIFICATION_SET"
export const NOTIFICATION_READ = "NOTIFICATION_READ"
export const FETCHING_START = "FETCHING_START"
export const FETCHING_END = "FETCHING_END"

export const notificationSet = notification => ({ type: NOTIFICATION_SET, notification })
export const notificationRead = () => ({ type: NOTIFICATION_READ })
export const fetchingStart = () => ({ type: FETCHING_START })
export const fetchingEnd = () => ({ type: FETCHING_END })

export const constants = {
    NOTIFICATION_SUCCESS: "SUCCESS",
    NOTIFICATION_ERROR: "ERROR"
}
