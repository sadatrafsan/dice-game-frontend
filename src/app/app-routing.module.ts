import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./component/index/index.component";
import {CreatePlayerComponent} from "./component/create-player/create-player.component";


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'create-player', component: CreatePlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
