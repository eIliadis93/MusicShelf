import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Soundtrack } from 'src/app/models/soundtrack';
import { SoundtrackService } from 'src/app/services/soundtrack.service';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.scss']
})
export class MusicplayerComponent implements OnInit {

  audioObj = new Audio();
  soundtrackName: string = "";

  soundtrack!: Soundtrack;
  playList!: Soundtrack[];

  constructor(private soundtrackService: SoundtrackService, private oauthService: OAuthService){}

  ngOnInit(): void {
    this.getPlaylist();
    console.log(this.token);
  }

  getPlaylist(){
    this.soundtrackService.getSongList().subscribe({
      next: (result) => {
        console.log(result);
        this.playList = result;
      }
    })
  }

  play(){
    this.soundtrack.filePath = this.audioObj.src;
    this.audioObj.load();
    this.audioObj.play();
    console.log("Play button");
  }

  pause(){
    this.audioObj.pause()
    console.log("Pause button");
  }

  stop(){
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
    console.log("Stop button");
  }

  openSoundtrack(filePath : string){
    this.soundtrack.filePath = filePath;
    console.log("File path: " + filePath);
    this.audioObj.src = filePath;
    this.audioObj.load();
    this.audioObj.play();
  }

  
  selectTrack(path: string){
    this.soundtrack.filePath = path;
  }


  get token(){
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims:null;
  }
}