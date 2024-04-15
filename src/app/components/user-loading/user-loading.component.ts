import { Component } from '@angular/core';
import { SkeletonDirective } from '~/app/directives/skeleton/skeleton.directive';

@Component({
  selector: 'app-user-loading',
  standalone: true,
  imports: [SkeletonDirective],
  templateUrl: './user-loading.component.html',
  styleUrl: './user-loading.component.scss'
})
export class UserLoadingComponent {

}
