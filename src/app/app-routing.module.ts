import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/tabs/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('./pages/auth/forgot/forgot.module').then(
        (m) => m.ForgotPageModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'organizations-home',
    loadChildren: () =>
      import(
        './pages/admin/organizations/organizations-home/organizations-home.module'
      ).then((m) => m.OrganizationsHomePageModule),
  },
  {
    path: 'organizations-details',
    loadChildren: () =>
      import(
        './pages/admin/organizations/organizations-details/organizations-details.module'
      ).then((m) => m.OrganizationsDetailsPageModule),
  },
  {
    path: 'events-home',
    loadChildren: () =>
      import('./pages/organizations/events-home/events-home.module').then(
        (m) => m.EventsHomePageModule
      ),
  },
  {
    path: 'events-details',
    loadChildren: () =>
      import('./pages/organizations/events-details/events-details.module').then(
        (m) => m.EventsDetailsPageModule
      ),
  },
  {
    path: 'users-home',
    loadChildren: () =>
      import('./pages/admin/users/users-home/users-home.module').then(
        (m) => m.UsersHomePageModule
      ),
  },
  {
    path: 'users-details',
    loadChildren: () =>
      import('./pages/admin/users/users-details/users-details.module').then(
        (m) => m.UsersDetailsPageModule
      ),
  },
  {
    path: 'events-user-home',
    loadChildren: () =>
      import(
        './pages/tabs/events/events-user-home/events-user-home.module'
      ).then((m) => m.EventsUserHomePageModule),
  },
  {
    path: 'events-user-details',
    loadChildren: () =>
      import(
        './pages/tabs/events/events-user-details/events-user-details.module'
      ).then((m) => m.EventsUserDetailsPageModule),
  },
  {
    path: 'swipe-home',
    loadChildren: () =>
      import('./pages/swipe/swipe-home/swipe-home.module').then(
        (m) => m.SwipeHomePageModule
      ),
  },
  {
    path: 'profile-home',
    loadChildren: () =>
      import('./pages/tabs/profile/profile-home/profile-home.module').then(
        (m) => m.ProfileHomePageModule
      ),
  },
  {
    path: 'profile-details',
    loadChildren: () =>
      import(
        './pages/tabs/profile/profile-details/profile-details.module'
      ).then((m) => m.ProfileDetailsPageModule),
  },
  {
    path: 'matchs-home',
    loadChildren: () =>
      import('./pages/tabs/matchs/matchs-home/matchs-home.module').then(
        (m) => m.MatchsHomePageModule
      ),
  },
  {
    path: 'matchs-details',
    loadChildren: () => import('./pages/tabs/matchs/matchs-details/matchs-details.module').then( m => m.MatchsDetailsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chats/chat/chat.module').then( m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
