import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { IFinance } from 'src/app/model/finance';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  
  
  constructor(private dashboardService: DashboardService) {
    
  }

  ngOnInit() {
  }
}
