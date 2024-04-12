import { Component } from '@angular/core';
import { ApiService } from '~/app/services/api.service';
import { GithubRepos, GithubUser } from '~/app/services/api.service.types';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {


  constructor(private gitService: ApiService) {}
}
