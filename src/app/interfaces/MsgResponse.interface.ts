export interface MsgResponse {
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
    user_id:    number;
    chat_id:    number;
    message:    string;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id:         number;
    username: string;
    email:    string;
}
