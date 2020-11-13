
export const BASE_URL = "http://moon.crocodic.net/latihan-api/public"
export const KEY_IS_LOGGED_IN = "key_is_logged_in"
export const KEY_USER_ID = 'key_user_id'
export const KEY_EMAIL = 'key_email'
export const KEY_PASSWORD = 'key_password'
export const KEY_NAME = 'key_name'
export const KEY_USER = 'key_user'

export const Path = {
    LOGIN: '/login',
    REGISTER: '/register',
    NOTES: '/note/list'
}

export const Param = {
    email: "email",
    password: "password",
    name: "name",
    phone: "phone",
    image: "image",
    userId: "user_id"
}

Object.freeze(Path)
Object.freeze(Param)
