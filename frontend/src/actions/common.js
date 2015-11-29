export const NOTIFICATION_SET = "NOTIFICATION_SET"
export const NOTIFICATION_READ = "NOTIFICATION_READ"
export const START_FETCHING = "START_FETCHING"
export const END_FETCHING = "END_FETCHING"

export const notificationSet = notification => ({ type: NOTIFICATION_SET, notification })
export const notificationRead = () => ({ type: NOTIFICATION_READ })
export const startFetching = () => ({ type: START_FETCHING })
export const endFetching = () => ({ type: END_FETCHING })

export const constants = {
    NOTIFICATION_SUCCESS: "SUCCESS",
    NOTIFICATION_ERROR: "ERROR"
}
