import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { InfoInstance } from './info-instance/info-instance.component';
import { Translator } from './translator.service';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MockService } from './mock.service';


@NgModule({
  declarations: [AppComponent, InfoInstance],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [Translator, MockService, ConnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
