import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  selectedButton = 3;

  selectButton(buttonNumber: number) {
    this.selectedButton = buttonNumber;
  }
}
