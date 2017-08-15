import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared.module';
import {ALL_PROVIDERS} from '../services';
import {AppComponent, HeaderComponent, FooterComponent, ShowMeComponent} from '../components/';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    SharedModule,
    RouterModule.forRoot(
        [
            { path: '', component: ShowMeComponent}
        ]
    )
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShowMeComponent,
  ],
  providers: [
      ...ALL_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
