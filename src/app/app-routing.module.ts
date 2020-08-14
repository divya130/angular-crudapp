import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: "",
    redirectTo: "user/list",
    pathMatch: "full"
  },
  {
    path:'',
    component:AuthLayoutComponent,
    children:[{
      path:'',
      loadChildren: "./pages/login/login.module#LoginModule"
    }
    ]
  },
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
      path:'user',
      loadChildren: "./pages/user/user.module#UserModule",
      canLoad:[AuthGuard]
    }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
