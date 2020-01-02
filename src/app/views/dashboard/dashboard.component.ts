import { Component, OnInit } from "@angular/core";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { DashboardService } from "../../services/dashboard/dashboard.service";
import { NotificationsService } from "../../shared/notifications.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Slots } from "../../shared/slots";

@Component({
  templateUrl: "dashboard.component.html",
  providers: [Slots],
  styles: [
    `
      .coins-div {
        border: 1px solid #fdea02;
        background: white;
        border-radius: 5px;
      }
      .10-coins-div {
        background: #511316;
      }
      .img-cont {
        padding: 15px;
      }
      .coin-img {
        height: 75px;
        float: left;
      }
      .quiz-title {
        width: 68%;
        float: left;
        padding-top: 11px;
        font-weight: bold;
        font-size: 24px;
      }
      .quiz-info {
        display: inline-block;
        font-size: 16px;
      }
      .title-cont {
        text-align: center;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {
  radioModel: string = "Month";
  isQuizLive: Boolean = true;
  isQuizTen: Boolean = false;
  isQuizFifty: Boolean = false;
  isQuizC: Boolean = false; // hundred quiz
  isQuizTwenty: Boolean = false;
  isQuizTwentyInfinite: Boolean = false;
  isQuizFiftyInfinite: Boolean = false;
  isQuizCfinite: Boolean = false;
  titleQuiz: string = "Live";
  totalSlots: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedSlot: Number;
  // isQuizFifty: Boolean = false;
  datepickerClass = "example-full-width-dashboard";
  currentTab: string = "9";

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: "10 Coins-1 Hour"
    }
  ];
  public lineChart1Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent"
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent"
          }
        }
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 40 - 5,
            max: 84 + 5
          }
        }
      ]
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle("--primary"),
      borderColor: "rgba(255,255,255,.55)"
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = "line";

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "Live"
    }
  ];
  public lineChart2Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent"
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent"
          }
        }
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 1 - 5,
            max: 34 + 5
          }
        }
      ]
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    {
      // grey
      backgroundColor: getStyle("--info"),
      borderColor: "rgba(255,255,255,.55)"
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = "line";

  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "50 Coins-1 Hour"
    }
  ];
  public lineChart3Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      }
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)"
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = "line";

  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: "100 Coins-1 Hour"
    }
  ];
  public barChart1Labels: Array<any> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16"
  ];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
          barPercentage: 0.6
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.3)",
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = "bar";

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: "Current"
    },
    {
      data: this.mainChartData2,
      label: "Previous"
    },
    {
      data: this.mainChartData3,
      label: "BEP"
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: "index",
      position: "nearest",
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return {
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor
          };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value: any) {
              return value.charAt(0);
            }
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250
          }
        }
      ]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    {
      // brandInfo
      backgroundColor: hexToRgba(getStyle("--info"), 10),
      borderColor: getStyle("--info"),
      pointHoverBackgroundColor: "#fff"
    },
    {
      // brandSuccess
      backgroundColor: "transparent",
      borderColor: getStyle("--success"),
      pointHoverBackgroundColor: "#fff"
    },
    {
      // brandDanger
      backgroundColor: "transparent",
      borderColor: getStyle("--danger"),
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = "line";

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: "Facebook"
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: "Twitter"
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "LinkedIn"
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: "Google+"
    }
  ];

  public brandBoxChartLabels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July"
  ];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false
        }
      ],
      yAxes: [
        {
          display: false
        }
      ]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.1)",
      borderColor: "rgba(255,255,255,.55)",
      pointHoverBackgroundColor: "#fff"
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = "line";
  // lineChart2
  public lineChart4Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "20 Coins-1 Day"
    }
  ];
  public lineChart5Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "20 Coins-Infinite"
    }
  ];
  public lineChart6Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "50 Coins-Infinite"
    }
  ];
  public lineChart7Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "100 Coins-Infinite"
    }
  ];

  public adminId;

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  winner: Number = 0;
  loosers: Number = 0;
  totalUsers: Number = 0;
  slotTotal: Number = 0;
  selectedQuiz: Number = 9;
  winnerList: Array<any> = [];
  settings = [
    "username",
    "mobileNumber",
    "tolaCoins",
    "quizPlayed",
    "quizWon",
    "quizLost",
    "Action"
  ];
  fieldName = [
    {
      // id: 'Id',
      username: "Username",
      mobileNumber: "Mobile Number",
      tolaCoins: "Tola Coins",
      quizPlayed: "Quiz Played",
      quizWon: "Quiz Won",
      quizLost: "Quiz Lost",
      Action: "Action"
    }
  ];
  noLiveQuiz: string = "";
  searchDate: string;
  quizDate: Date = new Date();

  constructor(
    private service: DashboardService,
    public notificationService: NotificationsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public slots: Slots
  ) {}

  ngOnInit(): void {
    // this.spinner.show();
    document.body.classList.remove("login-bg"); // remove background image for dashboard pages
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }

    let token = localStorage.getItem("token");
    let admin = JSON.parse(token);
    this.adminId = admin;
    // this.quizStat(this.selectedQuiz);

    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    this.searchDate = currentDate;
  }

  quizStat(quiz, date?) {
    if (date) {
      let existDate = this.parseDate(date);
      if (this.currentTab == quiz && this.searchDate == existDate) {
        return false;
      }
    }

    this.currentTab = quiz;
    this.spinner.show();
    this.service.getQuiz(quiz, date).subscribe(_response => {
      if (_response["status"] == "fail") {
        this.noLiveQuiz = "No Live Quiz";
        if (quiz == 9) {
          this.notificationService.notify("info", this.noLiveQuiz);
          this.winner = 0;
          this.loosers = 0;
          this.totalUsers = 0;
          this.slotTotal = 0;
          this.winnerList = [];
        }
      } else {
        this.winner = _response["data"].winnerTotal || 0;
        this.loosers = _response["data"].lossTotal || 0;
        this.totalUsers = _response["data"].players.length || 0;
        this.slotTotal = _response["data"].slotTotal || 0;
        this.winnerList = _response["data"].whoWon || [];
      }
      this.spinner.hide();
    });
  }
  parseDate(dt) {
    let date = new Date(dt.value || dt);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
