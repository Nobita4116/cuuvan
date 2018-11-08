export const parseArr = (str, defaultVal= []) => {
    if (!str) return defaultVal
    try {
        return JSON.parse(str)
    } catch(err) {
        return defaultVal
    }
}

export const setArr = (value, defaultVal = '') => {
    if (!value) return ''
    try {
        return JSON.stringify(value)
    } catch(err) {
        return ''
    }
}