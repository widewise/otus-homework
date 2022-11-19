import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoComponent } from "./go/go.component";
import { SettingsComponent } from "./settings/settings.component";
import { DictionaryComponent } from "./dictionary/dictionary.component";

const routes: Routes = [
  {
    path: 'go', component: GoComponent
  },
  {
    path: 'settings', component: SettingsComponent
  },
  {
    path: '**',
    component: DictionaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
