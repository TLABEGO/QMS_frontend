import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './dashboard/users/profile/profile.component';
import {SettingsComponent} from './dashboard/users/profile/settings/settings.component';
import {UsersComponent} from './dashboard/users/users.component';
import {ServicesComponent} from './dashboard/services/services.component';
import {TellersComponent} from './dashboard/tellers/tellers.component';
import {TicketsComponent} from './dashboard/tickets/tickets.component';
import {ClosingReasonsComponent} from './dashboard/closing-reasons/closing-reasons.component';
import {ReportComponent} from './dashboard/report/report.component';
import {UserComponent} from './dashboard/users/user/user.component';
import {ServiceComponent} from './dashboard/services/service/service.component';
import {TellerComponent} from './dashboard/tellers/teller/teller.component';
import {DisplayInformationsComponent} from './dashboard/display-informations/display-informations.component';
import {DisplayInformationComponent} from './dashboard/display-informations/display-information/display-information.component';
import {TicketComponent} from './dashboard/tickets/ticket/ticket.component';
import {ClosingReasonComponent} from './dashboard/closing-reasons/closing-reason/closing-reason.component';
import {BranchesComponent} from './dashboard/branches/branches.component';
import {BranchComponent} from './dashboard/branches/branch/branch.component';
import {QueuesComponent} from './dashboard/queues/queues.component';
import {QueueComponent} from './dashboard/queues/queue/queue.component';
import {AbandonedTicketsComponent} from './dashboard/abandoned-tickets/abandoned-tickets.component';
import {AbandonedTicketComponent} from './dashboard/abandoned-tickets/abandoned-ticket/abandoned-ticket.component';
import {AuthGuard} from './core/auth.guard';
import {SelectBranchComponent} from './dashboard/landing/select-branch/select-branch.component';
import {DisplayComponent} from './dashboard/landing/display/display.component';
import {ViewComponent} from './view/view.component';
import {LandingComponent} from './dashboard/landing/landing.component';
import {EntriesComponent} from './dashboard/entries/entries.component';
import {EntryComponent} from './dashboard/entries/entry/entry.component';
import {ConnectivityComponent} from './dashboard/connectivity/connectivity.component';
import {MobileLandingComponent} from './mobile/mobile-landing/mobile-landing.component';
import {MobileDisplayComponent} from './mobile/mobile-display/mobile-display.component';
import {IntraTvsComponent} from './dashboard/intra-tvs/intra-tvs.component';
import {IntraTvComponent} from './dashboard/intra-tvs/intra-tv/intra-tv.component';
import {MobileSelectDateComponent} from './mobile/mobile-select-date/mobile-select-date.component';
import {MessagesComponent} from './dashboard/messages/messages.component';
import {MessageComponent} from './dashboard/messages/message/message.component';
import {OnlineServiceComponent} from './dashboard/online-services/online-service/online-service.component';
import {OnlineServicesComponent} from './dashboard/online-services/online-services.component';
import {CovidComponent} from './mobile/covid/covid.component';
import {MobileBookingCovidComponent} from './mobile/mobile-booking-covid/mobile-booking-covid.component';

const routes: Routes = [
  {path: '', component: SelectBranchComponent},
  {path: 'covid', component: CovidComponent},
  {path: 'mobile-landing', component: MobileLandingComponent},
  {path: 'mobile-booking-covid/:id', component: MobileBookingCovidComponent},
  {path: 'mobile-display/:id', component: MobileDisplayComponent},
  {path: 'mobile-select-date/:id', component: MobileSelectDateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'display/:id', component: DisplayComponent},
  {path: 'view/:id', component: ViewComponent},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: LandingComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'branches', component: BranchesComponent},
      {path: 'branch', component: BranchComponent},
      {path: 'branch/:id', component: BranchComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user', component: UserComponent},
      {path: 'user/:id', component: UserComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'service', component: ServiceComponent},
      {path: 'service/:id', component: ServiceComponent},
      {path: 'tellers', component: TellersComponent},
      {path: 'teller', component: TellerComponent},
      {path: 'teller/:id', component: TellerComponent},
      {path: 'display-information', component: DisplayInformationsComponent},
      {path: 'display-info', component: DisplayInformationComponent},
      {path: 'display-info/:id', component: DisplayInformationComponent},
      {path: 'tickets', component: TicketsComponent},
      {path: 'ticket', component: TicketComponent},
      {path: 'ticket/:id', component: TicketComponent},
      {path: 'queues', component: QueuesComponent},
      {path: 'queue', component: QueueComponent},
      {path: 'queue/:id', component: QueueComponent},
      {path: 'closing-reasons', component: ClosingReasonsComponent},
      {path: 'closing-reason', component: ClosingReasonComponent},
      {path: 'closing-reason/:id', component: ClosingReasonComponent},
      {path: 'report', component: ReportComponent},
      {path: 'active-tickets', component: QueuesComponent},
      {path: 'abandoned-tickets', component: AbandonedTicketsComponent},
      {path: 'abandoned-ticket', component: AbandonedTicketComponent},
      {path: 'abandoned-ticket/:id', component: AbandonedTicketComponent},
      {path: 'entries', component: EntriesComponent},
      {path: 'entry', component: EntryComponent},
      {path: 'entry/:id', component: EntryComponent},
      {path: 'connectivity', component: ConnectivityComponent},
      {path: 'intra-tvs', component: IntraTvsComponent},
      {path: 'intra-tv', component: IntraTvComponent},
      {path: 'intra-tv/:id', component: IntraTvComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'message', component: MessageComponent},
      {path: 'message/:id', component: MessageComponent},
      {path: 'online-services', component: OnlineServicesComponent},
      {path: 'online-service', component: OnlineServiceComponent},
      {path: 'online-service/:id', component: OnlineServiceComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
