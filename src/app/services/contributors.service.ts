import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService {

  constructor( private _constant: ConstantsService, private _http:HttpClient ) { 
    console.info("Contributors service initialized.");
  }

  getContributors(owner: string, repo: string) {
    return this._http.get(`${this._constant.apiUrl}/repos/${owner}/${repo}`);
  }
}
