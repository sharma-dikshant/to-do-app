export function setCookies(name, token) {
    document.cookie = `${name}=${token}; Domain=${'127.0.0.1'}; SameSite=None;`
}