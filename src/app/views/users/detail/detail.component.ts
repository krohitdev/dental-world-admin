import { Component, Inject, OnInit } from '@angular/core';
// import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
data;
ngSwitchState = 'loading';
locationArray: Array<any> = [];

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDetail(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getDetail(id): void {
    this.service.getOne(id)
    .subscribe(_response => {
      this.data = _response.data.users;
      let locationDetail = {};
      locationDetail['latlong'] = this.data.loc.coordinates;
      
      this.locationArray.push(locationDetail)
      this.ngSwitchState = 'loaded';
    });
  }
  
  /**
   * getItem - get value from maps component
   * @param-
   * @return   data
   */
  getMapValue(data): void {
    console.log('mapd data', data)
    this.locationArray = data;
    // this.form.patchValue({
    //   // address: data[0].fullAddress,
    //   loc: {
    //     coordinates: data[0].latlong
    //   }
    // })
  }
}
