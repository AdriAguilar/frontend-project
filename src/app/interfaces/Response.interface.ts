export interface Response {
    data: Data;
}

export interface Data {
    chat:     Chat;
    messages: Message[];
}

export interface Chat {
    id:         number;
    user_1:     number;
    user_2:     number;
    created_at: Date;
    updated_at: Date;
}

export interface Message {
    id?:         number;
    chat_id:    number;
    message:    string;
    user:       User;
}

export interface Logged {
    user:    User;
    token:   string;
}

export interface Registered {
    user:    User;
    token:   string;
}

export interface User {
    id?:                number;
    role_id?:           number;
    name?:              string;
    username:          string;
    email?:             string;
    email_verified_at?: Date;
    image?:             string;
    created_at?:        Date;
    updated_at?:        Date;
}
