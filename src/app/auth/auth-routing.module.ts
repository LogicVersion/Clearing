import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { FormsModule } from '@angular/forms';
//import { UserService } from './shared/user.service';
//import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
//import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//import { appRoutes } from './routes';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { ForbiddenComponent } from '../forbidden/forbidden.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
//import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adminPanel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  // {
  //   path: 'user',
  //   component: UserComponent,
  //   children: [
  //     { path: 'login', component: SignInComponent },
  //     { path: 'signup', component: SignUpComponent },
  //   ],
  // },

  {
    path: 'signup',
    component: UserComponent,
    children: [{ path: '', component: SignUpComponent }],
  },
  {
    path: 'login',
    component: UserComponent,
    children: [{ path: '', component: SignInComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

// export
// const
//    routeComponentsAuth= [
//     SignUpComponent,
//     UserComponent,
//     SignInComponent,
//     AdminPanelComponent,
//     ForbiddenComponent,
//   ]
