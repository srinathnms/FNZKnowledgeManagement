import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IFinance } from 'src/app/model/finance';
import { IHighCharts } from 'src/app/model/IHighCharts';
import * as Highcharts from 'highcharts';
import { Month } from 'src/app/model/enum/month';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts;
  @Input() graphData: IFinance[];
  highCharts: IHighCharts;
  monthlyChartLabels: string[] = Object.keys(Month);
  yearOptions = ['2016', '2017', '2018', '2019'];
  yearOption = this.yearOptions[0];

  constructor() {
  }

  ngOnDestroy() {
    this.Highcharts.erase(this.Highcharts.charts, this.Highcharts.charts[0]);
  }

  ngOnInit() {
    this.Highcharts = Highcharts;
    this.highCharts = {
      chartOptions: {
        zoomType: 'xy'
      },
      xAxisOptions: this.monthlyChartLabels,
      yAxisOptions: [{ // Primary yAxis
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
      seriesOptionsTypes: this.getGraphSeries(this.yearOption)
    };
  }

  onYearChange(year: string): void {
    this.yearOption = year;
    this.highCharts.seriesOptionsTypes = this.getGraphSeries(year);
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
