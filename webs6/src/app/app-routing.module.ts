import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AuthComponent } from "./modules/auth/auth.component";
import { NotFoundComponent } from './modules/not-found/not-found.component';

const appRoutes: Routes = [
	// Index path
	{ path: '', redirectTo: '/tournament', pathMatch: "full" },

	// Component-specific paths
	{ path: "auth", component: AuthComponent },

	// Catch-all
	{ path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only when enabled
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
