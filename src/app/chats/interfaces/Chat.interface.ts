export interface Response {
    data: Data;
}

export interface Data {
    chat:       Chat;
    users:     User[];
    messages: Message[];
}

export interface Chat {
    id:         number;
    user_1:     number;
    user_2:     number;
    created_at?: Date;
    updated_at?: Date;
}

export interface User {
    id:                number;
    role_id?:           number;
    name?:              string;
    username:          string;
    email?:             string;
    email_verified_at?: Date;
    image?:             string;
    created_at?:        Date;
    updated_at?:        Date;
}

export interface UserStorageData {
    id:       number;
    username: string;
}

export interface Message {
    id:         number;
    chat_id:    number;
    user_id:    number;
    message:    string;
    created_at: Date;
    updated_at: Date;
    user:       User;
}
