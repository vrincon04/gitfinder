import { Component } from '@angular/core';
import { RepositoriesService } from 'src/app/services/repositories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  value: string = '';
  repositories: any[] = [];

  constructor(private _repositoryService: RepositoriesService, private _router: Router) { 
    console.info("Home component initialized.");
  }

  onSubmit() {
    if (this.value === '') {
      this.onClear();
      return;
    }

    this._repositoryService.getRepositories(this.value)
      .subscribe((data: any) => {
        this.repositories = data.items;
      });
  }

  onClear() {
    this.repositories = [];
  }

  onClick() {
    this._router.navigateByUrl('home');
  }

}
