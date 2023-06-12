export interface Response {
    data: ChatData;
}

export interface ChatResponse {
    message: string;
    data:    Chat;
}

export interface ChatData {
    chat:     Chat;
    messages: Message[];
}

export interface Chat {
    id:         number;
    user_1:     number;
    user_2:     number;
    created_at?: Date;
    updated_at?: Date;
}

export interface Message {
    id?:         number;
    chat_id:    number;
    chat?:      number;
    message:    string;
    user?:       User;
    username?:  string;
    date?:      string;
    isMyMessage?: boolean;
    created_at?: Date;
    updated_at?: Date;
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
