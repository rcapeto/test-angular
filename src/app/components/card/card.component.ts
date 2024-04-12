import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GithubUser } from '~/app/services/types';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, MatIconModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss', '../../common/card.common.scss']
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
      { label: 'Repositórios Públicos', value: this.data.public_repos ?? 0 },
      { label: 'Gists Públicos', value: this.data.public_gists ?? 0 },
    ]
  }
}
