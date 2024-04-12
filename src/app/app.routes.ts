import { Routes } from '@angular/router';
import { HomeComponent } from '~/app/pages/home/home.component'
import { UserComponent } from '~/app/pages/user/user.component'

export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'users/:username', component: UserComponent },
];
