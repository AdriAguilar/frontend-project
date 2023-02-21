export interface Response {
    data: Data;
}

export interface Data {
    chat:     Chat[];
    messages: Message[];
}

export interface Chat {
    id:                number;
    role_id:           number;
    name:              string;
    username:          string;
    email:             string;
    email_verified_at: null;
    image:             null;
    created_at:        Date;
    updated_at:        Date;
}

export interface Message {
    id:         number;
    chat_id:    number;
    user_id:    number;
    message:    string;
    created_at: Date;
    updated_at: Date;
    user:       Chat;
}
