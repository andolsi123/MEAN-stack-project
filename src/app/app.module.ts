import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatRippleModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyComponent } from './company/company.component';
import { AddProjectComponent } from './company/add-project/add-project.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { AppliedFreeLancerComponent } from './company/applied-free-lancer/applied-free-lancer.component';
import { SideBarComponent } from './company/side-bar/side-bar.component';
import { NavbarComponent } from './company/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './landing-page/log-in/log-in.component';
import { SignUpComponent } from './landing-page/sign-up/sign-up.component';
import { NavbarLandingComponent } from './landing-page/navbar-landing/navbar-landing.component';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    AddProjectComponent,
    DashboardComponent,
    AppliedFreeLancerComponent,
    SideBarComponent,
    NavbarComponent,
    LandingPageComponent,
    LogInComponent,
    SignUpComponent,
    NavbarLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
