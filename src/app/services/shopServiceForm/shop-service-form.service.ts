import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from 'src/app/common/country/country';
import { State } from 'src/app/common/state/state';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceFormService {
  private countriesUrl = "http://localhost:8080/api/countries";
  private stateUrl = "http://localhost:8080/api/states";

  constructor(private httpClient : HttpClient) { }

  //get countries method
    getCountries(): Observable<Country[]>{
        return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
          map(respose => respose._embedded.countries)
        );
    }
    //get states method
    getState(theCountryCode: string) : Observable<State[]>{
        //search URL
        const searchStatesUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
        return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
          map(response => response._embedded.states)
        )
    }



  //method of month
  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data : number[] = [];
    // build an array for "month" dropdown list
    // start at current month and until
    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
        data.push(theMonth)
    }
    return of (data);
  }
  //method of years
  getCreditCardYears():Observable<number[]>{

    let data : number[] = [];
    // build an array for "year" dropdown list
    // start at current year and loop for next 10 years
      const startYear: number = new Date().getFullYear();
      const endYear:number = startYear + 10 ;
      for (let theYear = startYear; theYear <= endYear ; theYear++) {
          data.push(theYear)
      }
      return of (data);
  }
}
interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}
interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}
