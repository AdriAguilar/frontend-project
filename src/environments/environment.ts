import { HttpHeaders } from "@angular/common/http";

export const environment = {
    production: false,
    baseUrl: 'http://localhost:8000/api',
    wsUrl: 'http://localhost:3000',
    httpOptions: {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': '*/*'
        })
    },
    hostname: 'http://localhost:8000',
    localStorageUserListKey: 'userList'
}