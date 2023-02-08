import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginWrapperComponent } from './components/login-wrapper/login-wrapper.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: LoginWrapperComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
