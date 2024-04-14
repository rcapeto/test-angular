import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GithubUser } from '~/app/services/api/api.service.types';
import { AvatarComponent } from '~/app/components/avatar/avatar.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule, AvatarComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss', '../../styles/card.scss']
})
export class CardComponent {
  @Input() data: GithubUser| null = null

  getInfos() {
    if(!this.data) {
      return []
    }

    return [
      { label: 'Seguidores', value: this.data.followers },
      { label: 'Seguindo', value: this.data.following },
      { label: 'Repos', value: this.data.public_repos ?? 0 },
      { label: 'Gists', value: this.data.public_gists ?? 0 },
    ]
  }
}
