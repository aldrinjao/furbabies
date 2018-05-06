import { Response } from '@angular/http';
import { PetService } from './services/pet.service';
import Pet from '../models/pet.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private petService: PetService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newPet: Pet = new Pet()

  //An Empty list for the visible todo list
  petsList: Pet[];


  ngOnInit(): void {

    //At component initialization the 
    this.petService.getPets()
      .subscribe(pets => {
        //assign the todolist property to the proper http response
        this.petsList = pets
        console.log(pets)
      })
  }
}