import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Firebase
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  provideAuth,
} from '@angular/fire/auth';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';

//Http
import { HttpClientModule } from '@angular/common/http';

//Cache
import { IonicStorageModule } from '@ionic/storage-angular';

//Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Shared Module
import { SharedModule } from './modules/shared/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.global.firebase)),
    provideAuth(() => {
      if (Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(), {
          persistence: indexedDBLocalPersistence,
        });
      } else {
        return getAuth();
      }
    }),
    AngularFireModule.initializeApp(environment.global.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,

    //Http
    HttpClientModule,

    //Cache
    IonicStorageModule.forRoot(),

    //Toast
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    //Modules
    SharedModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
