import { Component, OnInit, Input } from "@angular/core";
import { ChartDataSets, ChartOptions, Chart } from "chart.js";
import { Color, Label } from "ng2-charts";
import { ITeamViewGraphData } from '../../model/teamViewGraphData';
import { IGraphData } from '../../model/graphData';
import { AssociateRoles } from '../../model/enum/associateRoles';
import { Month } from '../../model/enum/month';
import { YearOptions } from '../../model/enum/yearOptions';

@Component({
  selector: "team-view",
  templateUrl: "./team-view.component.html",
  styleUrls: ["./team-view.component.css"]
})
export class TeamViewComponent implements OnInit {
  @Input() graphData: ITeamViewGraphData;
  onsiteOverAllData: IGraphData[];
  offshoreOverAllData: IGraphData[];
  onsiteBillableAssociateData: IGraphData[];
  offshoreBillableAssociateData: IGraphData[];
  selectedYearfilterValue: YearOptions;
  graphTypeLabel: string;
  monthlyChartLabels: Label[] = Object.keys(Month);
  yearlyChartLabels: Label[];
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
          beginAtZero: true
        }
      }]
    },
    animation: {
      onComplete: function () {
        const chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            const data = dataset.data[index];
            if (data > 0) {
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
            }
          });
        });
      }
    }
  };
  lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(100,0,0,0.5)"
    }
  ];
  lineChartLegend = false;
  lineChartType = "";
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  constructor() { }

  ngOnInit() {
    this.graphTypeLabel = AssociateRoles.Overall;
    this.yearlyChartLabels = this.getYearlyChartLabels();
    this.setOnsiteAndOffshoreAssociateData();
    this.setDefaultGraphValue();
  }

  setDefaultGraphValue(): void {
    this.lineChartLegend = this.graphTypeLabel != AssociateRoles.Buffer;
    this.selectedYearfilterValue = YearOptions.Yearly;
    this.lineChartType = 'bar';
    this.setGraphData();
  }

  showGraph(e): void {
    this.graphTypeLabel = e.target.value;
    this.setDefaultGraphValue();
  }

  getYearSpecificGraphData(value): void {
    this.selectedYearfilterValue = value;
    this.setGraphData()
  }

  setGraphData(): void {
    switch (this.graphTypeLabel) {
      case AssociateRoles.BillableRoles:
        {
          this.lineChartData = this.getAssociateCountData(this.onsiteBillableAssociateData, this.offshoreBillableAssociateData);
        }
        break;
      case AssociateRoles.Buffer:
        {
          this.lineChartData = this.getAssociateCountData(this.graphData.Buffer);
        }
        break;
      default:
        this.lineChartData = this.getAssociateCountData(this.onsiteOverAllData, this.offshoreOverAllData);
    }
  }

  getAssociateCountData(onsiteData: IGraphData[], offshoreData?: IGraphData[]): ChartDataSets[] {
    switch (this.graphTypeLabel) {
      case AssociateRoles.BillableRoles:
      case AssociateRoles.Overall: {
        if (this.selectedYearfilterValue == YearOptions.Yearly) {
          this.lineChartLabels = this.yearlyChartLabels;
          return ([
            { data: [this.getMaximumValue(YearOptions.Year_2016, onsiteData), this.getMaximumValue(YearOptions.Year_2017, onsiteData), this.getMaximumValue(YearOptions.Year_2018, onsiteData), this.getMaximumValue(YearOptions.Year_2019, onsiteData)], label: 'Onsite' },
            { data: [this.getMaximumValue(2016, offshoreData), this.getMaximumValue(2017, offshoreData), this.getMaximumValue(2018, offshoreData), this.getMaximumValue(2019, offshoreData)], label: 'Offshore' }
          ]);
        }
        this.lineChartLabels = this.monthlyChartLabels;
        return ([
          { data: this.isArrayNotNullOrEmpty(onsiteData) && onsiteData.filter(x => x.Year == this.selectedYearfilterValue).map(y => y.Count), label: 'Onsite' },
          { data: this.isArrayNotNullOrEmpty(offshoreData) && offshoreData.filter(x => x.Year == this.selectedYearfilterValue).map(y => y.Count), label: 'Offshore' }
        ]);
      }
      case AssociateRoles.Buffer:
        if (this.selectedYearfilterValue == YearOptions.Yearly) {
          this.lineChartLabels = this.yearlyChartLabels;
          return ([
            { data: [this.getMaximumValue(YearOptions.Year_2016, this.graphData.Buffer), this.getMaximumValue(YearOptions.Year_2017, this.graphData.Buffer), this.getMaximumValue(YearOptions.Year_2018, this.graphData.Buffer), this.getMaximumValue(YearOptions.Year_2019, this.graphData.Buffer)] }
          ]);
        }
        this.lineChartLabels = this.monthlyChartLabels;
        return ([
          { data: this.isArrayNotNullOrEmpty(this.graphData.Buffer) && this.graphData.Buffer.filter(x => x.Year == this.selectedYearfilterValue).map(y => y.Count) }
        ]);
      default:
        return;
    }
  }

  getMaximumValue(year: number, data: IGraphData[]): number {
    if (this.isArrayNotNullOrEmpty(data)) {
      return Math.max(...data.filter(x => x.Year == year).map(y => y.Count));
    }
  }

  setOnsiteAndOffshoreAssociateData(): void {
    this.onsiteBillableAssociateData = this.graphData.BilledOnsite;
    this.onsiteOverAllData = this.graphData.TotalOnsite;
    this.offshoreBillableAssociateData = this.graphData.BilledOffshore;
    this.offshoreOverAllData = this.graphData.TotalOffshore;
  }

  getYearlyChartLabels(): string[] {
    const yearLabels: number[] = this.graphData.TotalOffshore.map(x => x.Year);
    const uniqueLabels: number[] = Array.from(new Set(yearLabels.map((item: any) => item)));
    return uniqueLabels.map(String);
  }

  isArrayNotNullOrEmpty(array: any[]): boolean {
    return array && array.length > 0;
  }
}