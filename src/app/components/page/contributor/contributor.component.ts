import { Component } from '@angular/core';
import { ContributorsService } from 'src/app/services/contributors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent {

  repo: string = '';
  contributors: any[] = [];
  urls: any[] = [];
  
  constructor(private _contributorService: ContributorsService, private _activated: ActivatedRoute) { 
    console.info("Contributor component initialized.");

    this._activated.params.subscribe( params => {
      this.repo = params['repo'];
      this._contributorService.getContributors(params['owner'], params['repo'])
        .subscribe((resp: any) => {
          this.setContributors(resp);
        });
    });
  }

  setContributors(resp) {
    const link = resp.headers.get('link');
    const links = link.split(',');
    this.urls = links.map(x => {
      return {
        url: x.split(';')[0].replace('>','').replace('<',''),
        title: x.split(';')[1]
      }
    });
    this.contributors = this.contributors.concat(resp.body);
  }

  getMore() {
    const getURl = this.urls.find(u => u.title.trim() === 'rel="next"');
    console.log(getURl.url);
    this._contributorService.paginationContributors(getURl.url)
      .subscribe((resp: any) => {
        this.setContributors(resp);
      });
  }
}
