import { Injectable } from '@angular/core';
import { Bot } from './bot.service';

@Injectable()
export class Auth {

    constructor(private bot: Bot) {}

    loginWithFB() {
        this.bot.loginWithFB(); 
    }


}