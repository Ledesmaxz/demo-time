import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http
        .get('http://127.0.0.1:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (response: any) => {
            this.userName = response.name;
          },
          (error) => {
            console.error('Failed to fetch user info', error);
            this.router.navigate(['/login']);
          }
        );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
