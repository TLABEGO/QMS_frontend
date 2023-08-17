import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BranchesComponent} from './dashboard/branches/branches.component';
import {BranchComponent} from './dashboard/branches/branch/branch.component';
import {BranchDirective} from './dashboard/branches/branch/branch.directive';
import {ClosingReasonsComponent} from './dashboard/closing-reasons/closing-reasons.component';
import {ClosingReasonComponent} from './dashboard/closing-reasons/closing-reason/closing-reason.component';
import {ClosingReasonDirective} from './dashboard/closing-reasons/closing-reason/closing-reason.directive';
import {CountersComponent} from './dashboard/counters/counters.component';
import {CounterComponent} from './dashboard/counters/counter/counter.component';
import {CounterDirective} from './dashboard/counters/counter/counter.directive';
import {DisplayInformationsComponent} from './dashboard/display-informations/display-informations.component';
import {DisplayInformationComponent} from './dashboard/display-informations/display-information/display-information.component';
import {DisplayInformationDirective} from './dashboard/display-informations/display-information/display-information.directive';
import {RedirectReasonsComponent} from './dashboard/redirect-reasons/redirect-reasons.component';
import {RedirectReasonComponent} from './dashboard/redirect-reasons/redirect-reason/redirect-reason.component';
import {RedirectReasonDirective} from './dashboard/redirect-reasons/redirect-reason/redirect-reason.directive';
import {ServicesComponent} from './dashboard/services/services.component';
import {ServiceComponent} from './dashboard/services/service/service.component';
import {ServiceDirective} from './dashboard/services/service/service.directive';
import {TellersComponent} from './dashboard/tellers/tellers.component';
import {TellerComponent} from './dashboard/tellers/teller/teller.component';
import {TellersDirective} from './dashboard/tellers/teller/tellers.directive';
import {TicketsComponent} from './dashboard/tickets/tickets.component';
import {TicketComponent} from './dashboard/tickets/ticket/ticket.component';
import {TicketDirective} from './dashboard/tickets/ticket/ticket.directive';
import {UsersComponent} from './dashboard/users/users.component';
import {UserComponent} from './dashboard/users/user/user.component';
import {UserDirective} from './dashboard/users/user/user.directive';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './dashboard/users/profile/profile.component';
import {SettingsComponent} from './dashboard/users/profile/settings/settings.component';
import {ReportComponent} from './dashboard/report/report.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BlockUIModule} from 'ng-block-ui';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbAlertModule, NgbDateParserFormatter, NgbDatepickerModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuard} from './core/auth.guard';
import {AuthInterceptor} from './core/auth-interceptor.service';
import {QueuesComponent} from './dashboard/queues/queues.component';
import {QueueComponent} from './dashboard/queues/queue/queue.component';
import {AbandonedTicketsComponent} from './dashboard/abandoned-tickets/abandoned-tickets.component';
import {AbandonedTicketComponent} from './dashboard/abandoned-tickets/abandoned-ticket/abandoned-ticket.component';
import {LandingComponent} from './dashboard/landing/landing.component';
import {ChartsModule} from 'ng2-charts';
import {SelectBranchComponent} from './dashboard/landing/select-branch/select-branch.component';
import {DisplayComponent} from './dashboard/landing/display/display.component';
import {FileuploadDirective} from './core/fileupload.directive';
import {NgbDateMomentParserFormatter} from './core/dateformat';
import { CountdownModule } from 'ng2-date-countdown';
import { ViewComponent } from './view/view.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {CoreComponent} from './core/core.component';
import {EntriesComponent} from './dashboard/entries/entries.component';
import {EntryComponent} from './dashboard/entries/entry/entry.component';
import { ConnectivityComponent } from './dashboard/connectivity/connectivity.component';
import { DevicesComponent } from './dashboard/connectivity/devices/devices.component';
import {DeviceDetectorService} from 'ngx-device-detector';
import { MobileLandingComponent } from './mobile/mobile-landing/mobile-landing.component';
import { MobileDisplayComponent } from './mobile/mobile-display/mobile-display.component';
import { IntraTvsComponent } from './dashboard/intra-tvs/intra-tvs.component';
import { IntraTvComponent } from './dashboard/intra-tvs/intra-tv/intra-tv.component';
import { MobileSelectDateComponent } from './mobile/mobile-select-date/mobile-select-date.component';
import {MobileSelectDateDirective} from './mobile/mobile-select-date/mobile-select-date.directive';
import {ClockPickerDirective} from './mobile/mobile-select-date/clockpicker.directive';
import { MessagesComponent } from './dashboard/messages/messages.component';
import { MessageComponent } from './dashboard/messages/message/message.component';
import { OnlineServiceDirective } from './dashboard/online-services/online-service/online-service.directive';
import {OnlineServiceComponent} from './dashboard/online-services/online-service/online-service.component';
import {OnlineServicesComponent} from './dashboard/online-services/online-services.component';

import { CovidComponent } from './mobile/covid/covid.component';
import { MobileBookingCovidComponent } from './mobile/mobile-booking-covid/mobile-booking-covid.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BranchesComponent,
    BranchComponent,
    BranchDirective,
    ClosingReasonsComponent,
    ClosingReasonComponent,
    ClosingReasonDirective,
    FileuploadDirective,
    CountersComponent,
    CounterComponent,
    CounterDirective,
    DisplayInformationsComponent,
    DisplayInformationComponent,
    DisplayInformationDirective,
    RedirectReasonsComponent,
    RedirectReasonComponent,
    RedirectReasonDirective,
    ServicesComponent,
    ServiceComponent,
    ServiceDirective,
    TellersComponent,
    TellerComponent,
    TellersDirective,
    TicketsComponent,
    TicketComponent,
    TicketDirective,
    UsersComponent,
    UserComponent,
    UserDirective,
    DashboardComponent,
    ProfileComponent,
    SettingsComponent,
    ReportComponent,
    QueuesComponent,
    QueueComponent,
    AbandonedTicketsComponent,
    AbandonedTicketComponent,
    LandingComponent,
    SelectBranchComponent,
    DisplayComponent,
    ViewComponent,
    CoreComponent,
    EntriesComponent,
    EntryComponent,
    ConnectivityComponent,
    DevicesComponent,
    MobileLandingComponent,
    MobileDisplayComponent,
    IntraTvsComponent,
    IntraTvComponent,
    MobileSelectDateComponent,
    MobileSelectDateDirective,
    ClockPickerDirective,
    MessagesComponent,
    MessageComponent,
    OnlineServicesComponent,
    OnlineServiceComponent,
    OnlineServiceDirective,
    CovidComponent,
    MobileBookingCovidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ChartsModule,
    NgbDatepickerModule,
    BlockUIModule.forRoot(),
    ToasterModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    BrowserAnimationsModule,
    CountdownModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
  ],
  providers: [{
    provide: NgbDateParserFormatter,
    useFactory: () => {
      return new NgbDateMomentParserFormatter('DD MMMM YYYY');
    }
  }, ToasterService,
    DeviceDetectorService,
    CookieService,
    AuthGuard,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]],
  bootstrap: [AppComponent]
})
export class AppModule {
}
