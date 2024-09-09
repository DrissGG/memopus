// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule

import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule, // Ajouter HttpClientModule ici
        // Autres modules nécessaires
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
