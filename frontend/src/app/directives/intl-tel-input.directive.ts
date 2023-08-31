import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../shared/models/User';
import { UserStateService } from '../services/user-state.service';

@Directive({
  selector: '[appIntlTelInput]',
})
export class IntlTelInputDirective implements AfterViewInit {
  @Input() appIntlTelInput: boolean = false;
  @Output() dialCodeChange = new EventEmitter<string>();
  user: User = this.userStateService.currentUser;

  constructor(private el: ElementRef, private userStateService: UserStateService) {}

  ngAfterViewInit(): void {
    
    if (this.appIntlTelInput) {
      const inputElement = this.el.nativeElement;
      const iti = intlTelInput(inputElement, {
        initialCountry: 'auto',
        separateDialCode: false,
        geoIpLookup: (callback:any):any =>  {
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
    }})
      inputElement.addEventListener('countrychange',()=> {
        
        const selectedCountryData = iti.getSelectedCountryData();
        console.log(selectedCountryData.iso2);
     
        if (selectedCountryData) {
          console.log(selectedCountryData);
          const dialCode = selectedCountryData.dialCode;
          this.dialCodeChange.emit(dialCode);
        } 
      });
    }
  }
}
