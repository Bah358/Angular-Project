import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Maids-Gone-Easier';

  ngOnInit(): void {
    AOS.init({ duration: 1200, once: true });
  }
}
