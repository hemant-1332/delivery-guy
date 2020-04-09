import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'bar'
    }]
  }

  options = {
    
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Total Delivery', 'Total Pickups', 'Delivery Success', 'Pickup Success', 'Failed'],
      textStyle: {
        //color: echarts.textColor,
      },
    },
    series: [
      {
        name: 'Itenary',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        data: [
          { value: 100, name: 'Total Delivery' },
          { value: 20, name: 'Total Pickups' },
          { value: 70, name: 'Delivery Success' },
          { value: 15, name: 'Pickup Success' },
          { value: 35, name: 'Failed' },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            //shadowColor: echarts.itemHoverShadowColor,
          },
        },
        label: {
          normal: {
            textStyle: {
              //color: echarts.textColor,
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              //color: echarts.axisLineColor,
            },
          },
        },
      },
    ],
  };

}
