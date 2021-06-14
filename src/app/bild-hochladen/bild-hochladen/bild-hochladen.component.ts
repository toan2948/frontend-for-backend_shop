import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bild-hochladen',
  templateUrl: './bild-hochladen.component.html',
  styleUrls: ['./bild-hochladen.component.css']
})
export class BildHochladenComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
