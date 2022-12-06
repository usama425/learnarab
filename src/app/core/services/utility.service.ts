import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    private baseApiUrl: string;
    private soundPlaying: any;

    constructor() {
        this.baseApiUrl = environment.baseApiUrl;
    }

    isDebugModeEnabled() {
        return environment.debugMode;
    }

    completeServerUrl(relativePath: string) {
        return this.baseApiUrl + relativePath;
    }

    serverUrlByFileName(file: string, imageType: boolean = false) {
        let fileName = file.substr(file.lastIndexOf('/') + 1);
        if (imageType) return `/assets/data/image/${fileName}`;
        return `/assets/sound/${fileName.toLowerCase()}`;
    }

    localImagePathByFileName(fileName: string) {
        return `assets/images/${fileName}`;
    }

    stopAudio() {
        if (this.soundPlaying) {
            this.soundPlaying.pause();
            this.soundPlaying.currentTime = 0;
            this.soundPlaying = null;
        }
    };

    playAudio(audioEvent) {
        try {
            audioEvent.stopImmediatePropagation();

            const audioElement = audioEvent.currentTarget as HTMLElement; // Element with Sound path attribute
            const soundPath = audioElement.getAttribute("sound-path");

            const audio = new Audio(soundPath);
            audio.load();

            if (this.soundPlaying && soundPath === this.soundPlaying.getAttribute('src')) {
                this.stopAudio();
                audioElement.classList.remove('active');
            } else {
                if (this.soundPlaying) {
                    this.stopAudio();
                }
                this.soundPlaying = audio;
                this.soundPlaying.onended = () => {
                    audioElement.classList.remove('active');
                    this.soundPlaying = null;
                };
                this.soundPlaying.onpause = () => {
                    audioElement.classList.remove('active');
                };
                audio.play();
                audioElement.classList.add('active');
            }
        } catch (error) {
            console.log('Sound error: ' + JSON.stringify(error));
        }
    };
}