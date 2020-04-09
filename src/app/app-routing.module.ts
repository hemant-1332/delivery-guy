import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { ListComponent } from './pages/list/list.component';
import { ReportsComponent } from './pages/reports/reports.component';



const routes: Routes = [
  { path: '', redirectTo: 'ui/home', pathMatch: 'full' },  
  { path: 'ui/home', component: HomepageComponent, pathMatch: 'full' },  
  { path: 'ui/list', component: ListComponent },
  { path: 'ui/reports', component: ReportsComponent },  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
