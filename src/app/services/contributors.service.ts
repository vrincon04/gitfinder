import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService {

  constructor( private _constant: ConstantsService, private _http:HttpClient ) { 
    console.info("Contributors service initialized.");
  }

  getContributors(owner: string, repo: string):Observable<HttpResponse<any[]>> {
    return this._http.get<any>(
      `${this._constant.apiUrl}/repos/${owner}/${repo}/contributors`,
      { observe: 'response' }
    );
  }

  paginationContributors(url: string):Observable<HttpResponse<any[]>> {
    return this._http.get<any>(url, { observe: 'response' });
  }
}
