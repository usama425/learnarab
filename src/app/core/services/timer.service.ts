import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TimerService {
    timer: object = {};
    ticking: boolean = false;
    timeSet: number = 0;
    timerCount: number = 0;

    time: any;
    lastUpdate: number = 0;

    constructor(
        private router: Router,
        private eventService: EventService
    ) {
        
    }

    initTimer(duration) {
        // start the timer;
        this.ticking = false;
        this.timerCount = 0;
        this.set(duration);

        this.start();
    };

    start() {
        if (this.time) clearInterval(this.time);

        this.lastUpdate = Date.now();

        this.time = setInterval(() => {
            try {
                var currentTime = Date.now();
                this.timerCount += currentTime - this.lastUpdate;
                this.lastUpdate = currentTime;
                if (this.timerCount >= this.timeSet) {
                    clearInterval(this.time);
                    this.timerCount = this.timeSet;
                    return this.eventService.triggerGameEnd();
                }

                let done = this.timerCount / this.timeSet;
                if (done > 0.6) {
                    var green = Math.round(Math.min(1 - done, 0.2) * 5 * 198);
                    var red = 141 + Math.round(Math.min(done - 0.6, 0.2) * 5 * 114);
                    var nc = '#' + red.toString(16) + green.toString(16) + '3f';
                    this.eventService.triggerColor(nc);

                }
                return this.timeTicking();
            } catch (error) {
                console.log('eeeererror' + JSON.stringify(error));
            }
        }, 1000);
    };

    timeTicking() {
        if (this.timeleft() < 12000) {
            let volume;
            if (!this.ticking) {
                this.ticking = true;
                volume = 0;
                this.eventService.triggerStartTicking();
            } else {
                volume = (12000 - this.timeleft()) / 12000;
            }

            this.eventService.triggerVolume(volume);
        }
    }


    set(setTime) {
        this.timeSet = setTime;
        this.eventService.triggerColor('#8DC63F')
    }

    stop() {
        //console.log('timer stop');
        clearInterval(this.time);
        this.timerCount = 0;
    }

    pause() {
        //console.log('pause timer ' + time);
        clearInterval(this.time);
    }

    timeleft() {
        return this.timeSet - this.timerCount;
    }

}
