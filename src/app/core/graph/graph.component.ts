import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IFinance } from 'src/app/model/finance';
import { YearOptions } from 'src/app/model/enum/yearOptions';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  Highcharts: typeof Highcharts;
  chartOptions: Highcharts.Options;
  @Input()
  graphData: IFinance[];
  yearOptions = ['2016', '2017', '2018', '2019'];
  yearOption = this.yearOptions[0];
  constructor() {

  }

  ngOnInit() {
    this.Highcharts = Highcharts;
    this.chartOptions = {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: ''
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
          text: 'CP (%)',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        title: {
          text: 'Revenue ($)',
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
        align: 'right',
        // x: 120,
        verticalAlign: 'top',
        // y: 100,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },
      series: this.getGraphSeries(this.yearOption)
    };
  }

  onYearChange(year: string): void {
    this.yearOption = year;
    const series: Highcharts.Options = { series: this.getGraphSeries(year) };
    this.Highcharts.charts[0].update(series);
  }

  getGraphSeries(year: string): Highcharts.SeriesOptionsType[] {
    const data = this.graphData && this.graphData.filter(c => c.Year === year);
    const revenue = data && data.map((finance: IFinance) => finance.Revenue) as Highcharts.SeriesXrangeDataOptions[];
    const customerProfitability = data && data.map(
      (finance: IFinance) => finance.CustomerProfitability) as Highcharts.SeriesXrangeDataOptions[];
    const graphSeries = [
      {
        name: 'Revenue ($)',
        type: 'column',
        yAxis: 1,
        data: revenue,
        tooltip: {
          valueSuffix: ' $'
        }
      },
      {
        name: 'CP (%)',
        type: 'spline',
        data: customerProfitability,
        tooltip: {
          valueSuffix: ' %'
        }
      }] as Highcharts.SeriesOptionsType[];

    return graphSeries;
  }
}
