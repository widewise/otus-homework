import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoComponent } from "./components/go/go.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { DictionaryComponent } from "./components/dictionary/dictionary.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'go', component: GoComponent
  },
  {
    path: 'settings', component: SettingsComponent
  },
  {
    path: '',
    component: DictionaryComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
