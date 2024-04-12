import { Component } from '@angular/core';
import { SkeletonDirective } from '~/app/directives/skeleton/skeleton.directive';

@Component({
  selector: 'app-card-loading',
  standalone: true,
  imports: [SkeletonDirective],
  templateUrl: './card-loading.component.html',
  styleUrls: ['./card-loading.component.scss', '../../common/card.common.scss'],
})
export class CardLoadingComponent {

}
