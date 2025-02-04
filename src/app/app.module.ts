import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { Pagina404Component } from './pagina404/pagina404.component';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { CrearFacturaComponent } from './core/pages/crear-factura/crear-factura.component';
import { BuscarFacturaComponent } from './core/pages/buscar-factura/buscar-factura.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    Pagina404Component,
    CrearFacturaComponent,
    BuscarFacturaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    HttpClientModule

  ],
  providers: [
    provideAnimations(),
    provideToastr()],
  bootstrap: [AppComponent]
})
export class AppModule { }
