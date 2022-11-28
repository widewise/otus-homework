import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { TranslateListComponent } from './components/dictionary/translate-list/translate-list.component';
import { GoComponent } from './components/go/go.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryComponent,
    TranslateListComponent,
    GoComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
