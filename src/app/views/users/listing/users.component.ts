import { Component, OnInit, ViewChild } from '@angular/core';
import { log } from 'util';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user/user.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../shared/notifications.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../../environments/environment';
import { Slots } from '../../../shared/slots';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ Slots ]

})
export class UsersComponent implements OnInit {
  

  users:Array<any> = []
  settings = ['username','mobileNumber','tolaCoins','quizPlayed','quizWon','quizLost','Action']
  fieldName = [
    {
      // id: 'Id',
      username: 'Username',
      mobileNumber: 'Mobile Number',
      tolaCoins: 'Tola Coins',
      quizPlayed: 'Quiz Played',
      quizWon: 'Quiz Won',
      quizLost: 'Quiz Lost',
      Action: 'Action'
    },
  ];

  winnerSettingCols = ['username','mobileNumber','tolaCoins','slotStartTime','slotEndTime','winningAmount','finalDonateAmount','updatedAt','finalRedeemAmount','isDonateToNgo', 'isWinnerPrizeRedeem'];
  winnerFieldName = [
    {
      username: 'Username',
      mobileNumber: 'Mobile Number',
      tolaCoins: 'Tola Coins',
      slotStartTime: 'Start Time',
      slotEndTime: 'End Time',
      winningAmount: 'Winning Amount',
      finalDonateAmount: 'Donate Amount',
      updatedAt:'Played On',
      finalRedeemAmount: 'Final Redeem Amount',
      isDonateToNgo:'Donated NGO',
      isWinnerPrizeRedeem:'Price Redeem',
      // action: 'Action'
    }
  ];

  bankset = ['userName','bankName','accountNumber','ifscCode','branch','state','action'];
  bankFieldName = [
    {
      // id: 'Id',
      userName: 'Username',
      bankName: 'bankName',
      accountNumber: 'Account No.',
      ifscCode: 'IFSC',
      branch: 'Branch',
      state: 'State',
      Action: 'Action'
    },
  ];

  ngSwitchState = 'loading';
  editIcon: Boolean = false;
  deleteIcon: Boolean = false;
  statusIcon: Boolean = true;
  viewIcon: Boolean = true;
  public page:Number = 1;
  sort;
  specificUser: Boolean = true;
  data;
  adminId: String;
  // @ViewChild('tabset') tabset: TabsetComponent;
  // @ViewChild('1') first: TabDirective;


  constructor(
    private service: UserService,
    private router: Router,
    public notificationService: NotificationsService,
    private spinner: NgxSpinnerService,
    private routeActivate: ActivatedRoute,
    private slots: Slots

  ) { }

  ngOnInit() {
    // this.getUsers();
    let token = localStorage.getItem('token');
    let admin = JSON.parse(token);
    this.adminId = admin.userId;
    this.getList('1');
    this.spinner.show();
    this.myfunction();
  }

  myfunction(){
    this.routeActivate.fragment.subscribe((fragment: string) => {
      if(fragment){
        setTimeout(() => {
          this.router.navigate(['/users'])
          document.getElementById('2').click();
        }, 500); 
      }
       
    })
  }

  getUsers(page?: Number,json?):void { 
    this.page = page ? page : 1;
    this.service.getList(json, this.page,this.sort,'1')
    .subscribe(_response => {
   
      this.users = _response.data;
      // this.spinner.hide();
      this.ngSwitchState = 'loaded';
    });
  }

  changeStatus(row){
    let data = { 
      // adminId : localStorage.getItem('id')
      adminId: this.adminId,
      userId: row._id 
     }
    this.service.updateUserStatus(data)
    .subscribe(_response => {
    
      // this.users = _response['data'].result;
      this.notificationService.notify('success',_response.message);
      this.getUsers();
      // this.spinner.hide();
      this.ngSwitchState = 'loaded';
    });
  }

  
  selectTab($event:NgbTabChangeEvent){
    
    this.specificUser = true;
    this.getList($event.nextId);
  }

  getList(type?:String,page?: Number,json?):void { 
    this.spinner.show();
    this.page = page ? page : 1;
    
    if(type == '3') {
      return;
    }
    if(type == '2'){
      this.getWinners();
      return;
    }else {
      this.service.getList(json, this.page,this.sort,type)
      .subscribe(_response => {
        this.users = _response['data'];
        
        this.spinner.hide();
        this.ngSwitchState = 'loaded';
      });
    }
   
  }
  
  
  getWinners(page?: Number,json?){
    this.spinner.show();
    this.page = page ? page : 1;
    this.service.getList(json, this.page,this.sort,'2')
    .subscribe(_response => {
      let data = _response['data'].result;
      let newData = [];
      let obj = {};
      data.forEach((user)=>{
        if(user.user){
          obj = user.user;
          obj['createdAt'] = user['createdAt'];
          obj['updatedAt'] = user['updatedAt'];
          
          obj['finalDonateAmount'] = user.finalDonateAmount;
          obj['finalRedeemAmount'] = user.finalRedeemAmount;
          obj['slotStartTime'] = user.slotStartTime;
          obj['slotEndTime'] = user.slotEndTime;
          obj['updatedAt'] = user.updatedAt;
          obj['winningAmount'] = user.winningAmount;
          obj['isDonateToNgo'] = user.isDonateToNgo;
          obj['isWinnerPrizeRedeem'] = user.isWinnerPrizeRedeem;
          obj['_id'] = user.user._id;
          newData.push(obj);
          obj = {};
        }
        
      });

      _response['data'].result = newData;
      
      this.users = _response['data'];

      this.spinner.hide();
      this.ngSwitchState = 'loaded';
    });
  }

  bankDetails(page?: Number,json?){
    this.page = page ? page : 1;
    this.service.getList(json, this.page,this.sort,'4')
    .subscribe(_response => {
      this.users = _response['data'];
      // this.spinner.hide();
      this.ngSwitchState = 'loaded';
    });
  }

  getParticularUser(user){
    this.spinner.show();
    this.specificUser = false;
    this.getDetail(user._id)
    this.router.navigateByUrl(`/users/detail/${user._id}`);
    setTimeout(()=>{
      // document.getElementById('3').click();
      // this.router.navigate(['/user/detail/'+user._id])
      // this.router.navigateByUrl(`/users/detail/${user._id}`);
      this.spinner.hide();
    },500)
  }

  getDetail(id): void {
    this.service.getOne(id)
    .subscribe(_response => {
      this.data = _response.data.users;
      this.ngSwitchState = 'loaded';
    });
  }

  downloadUserCSV():void{
    this.fetchService(`${environment.BaseURL}${environment.AdminAPI.oneUser}`,'userlists.csv');
  }

  downloadUserBankData():void{
    this.fetchService(`${environment.BaseURL}${environment.AdminAPI.user}`,'banklist.csv')
  }



  // fetch service
  fetchService(url,filename):void{
    fetch(url)
    .then(resp => resp.blob())
    .then(blob => {
      this.downloadCSV(filename,blob);
    })
    .catch(() => console.log('error'));
  }

 
  // download csv data
  downloadCSV(filename:string,data):void{
    const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
  }

  Search(value){
    const query = {query:value};
    this.service.search(query)
    .subscribe(_response => {
      this.users = _response['data'];
      document.getElementById('1').click();
      this.spinner.hide();
      this.ngSwitchState = 'loaded';
    });

  }

}
