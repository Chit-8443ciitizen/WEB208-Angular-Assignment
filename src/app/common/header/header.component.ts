import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  getFormattedTime(): string{
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate, 'dd/MM/yyyy HH:mm', 'en-US');
    return formattedDate;
  }
}
