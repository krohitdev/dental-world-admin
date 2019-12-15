import { Component, OnInit, EventEmitter, Input, Output, ViewChild,ElementRef, NgZone } from '@angular/core';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { google } from '@google/maps/';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

declare var google: google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  isReadOnly = false;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public autocomplete;
  isShow:Boolean = true;
  // public locations = [
    
  // ];

  @Input() locations;
  @Input() clear;
  address;
  @Output() mapValue = new EventEmitter();
  @Output() reviews = new EventEmitter();
  @ViewChild('map', {static: false}) map: AgmMap;
  @ViewChild('search', {static: false}) public searchElementRef: ElementRef;

  constructor(private _builder: FormBuilder, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  
  ngOnInit(): void {
    this.searchControl = new FormControl();

    this.mapsAPILoader.load()
      .then(() => {
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        this.autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {

            // get the place result
            let place = this.autocomplete.getPlace();
            this.reviews.emit(place);
            // tslint:disable-next-line:prefer-const
            let temLoction = {};
            place.address_components.forEach(address => {
              if (address.types.includes('locality')) {
                temLoction['city'] = address.long_name;
                // this.form.patchValue({city: address.long_name});
              }
              if (address.types.includes('country')) {
                temLoction['country'] = address.long_name;
                // this.form.patchValue({country: address.long_name});
              }
              if (address.types.includes('administrative_area_level_1')) {
                temLoction['state'] = address.long_name;
                // this.form.patchValue({state: address.long_name});
              }
            });
            
            this.clear == true ? this.locations = [] : false
            temLoction['fullAddress'] = place.formatted_address;
            temLoction['latlong'] = [place.geometry.location.lng(), place.geometry.location.lat()];
            this.locations = [];
            this.locations.push(temLoction);
            this.locations && this.locations.length === 5 ? this.isReadOnly = true : this.isReadOnly = false;
            this.locations ? this.mapValue.emit(this.locations) : false;
            this.clear == true ? this.searchControl = new FormControl() : false;
            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            // set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 10;
           console.log('>>>>>>>>>>>>>>>>>', this.locations)

          });
        });
      });
    this.setCurrentPosition();
  }

  // to get the current position on initialise of map
  setCurrentPosition(): void {
    this.longitude = 103.7038177;
    this.latitude = 1.3143394;
    this.zoom = 12;
  }

   // on click the map 
   mapClicked($event: MouseEvent) {
    this.latitude = $event['coords'].lat
    this.longitude = $event['coords'].lng
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(this.latitude, this.longitude);
    let request = {location: { latLng: latlng }};
    this.address;
    geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
      // if (status === 'OK') {
        let result = results[0];
        
        let rsltAddress = result.formatted_address;
        if (result != null) {
          this.address = rsltAddress;
          
        } else {
          alert('No address available!');
        }
        let cntry = []
        for (let element in result.address_components) {
          if (result.address_components[element].types[0] == "country") {
            cntry.push(result.address_components[element]);
          }
        }
      }
    });

  }

}
