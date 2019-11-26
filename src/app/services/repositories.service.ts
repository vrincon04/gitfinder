import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(private _constant: ConstantsService, private _http:HttpClient ) {
    console.info("Repositories service initialized.");
  }

  getRepositories(value:string = '') {
    return this._http.get(`${this._constant.apiUrl}/search/repositories?q=${value}&sort=stars&order=desc`);
  }
}
