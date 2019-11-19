import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  Highcharts: typeof Highcharts;
  chartOptions: Highcharts.Options;
  @Input()
  graphData: Highcharts.SeriesOptionsType[];
  constructor() {
  }

  ngOnInit() {
    debugger;
    this.Highcharts = Highcharts;
    this.chartOptions = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: 'FNZ Revenue'
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} %',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'CP',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        title: {
          text: 'Revenue',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} $',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },
      series: this.graphData
    };
  }

  onYearChange(event): void {
    const data = this.graphData && this.graphData.filter(c => c.mapData === event.target.value);
    this.graphData = data;
  }
}
