import Pet from '../../models/pet.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

//RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

@Injectable()
export class PetService {

  api_url = 'http://localhost:3000';
  petUrl = `${this.api_url}/api/pets`;

  constructor(
    private http: HttpClient
  ) { }


  //Create Pet, takes a Pet Object
  createPet(pet: Pet): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.petUrl}`, pet);
  }

  //Read Pet, takes no arguments
  getPets(): Observable<Pet[]>{
    return this.http.get(this.petUrl)
    .map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Pet[];
    })
  }
  //Update Pet, takes a Pet Object as parameter
  editPet(pet:Pet){
    let editUrl = `${this.petUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, pet);
  }

  deletePet(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.petUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}