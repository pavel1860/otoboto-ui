import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

    innerHeight; 
    innerWidth; 

    constructor() {
        this.innerHeight = window.screen.height;
        this.innerWidth = window.screen.width;
    }

    isMobile() {
        return this.innerWidth < 768;
    }



}