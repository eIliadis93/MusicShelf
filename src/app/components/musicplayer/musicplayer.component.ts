import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
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
    console.log("Play button");
  }

  pause(){
    console.log("Pause button");
  }

  stop(){
    console.log("Stop button");
  }

  get token(){
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims:null;
  }
}