import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentHomePageComponent } from './AgentHomePage/agentHome.component';

const routes: Routes = [
  {path:'', component: AgentHomePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
