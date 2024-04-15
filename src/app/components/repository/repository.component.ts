import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RelativeDatePipe } from '~/app/pipes/relative-date.pipe';
import { GithubRepos } from '~/app/services/api/api.service.types';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [MatIconModule, CommonModule, RelativeDatePipe],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss'
})
export class RepositoryComponent {
  @Input() repo!: GithubRepos
}
