import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserEditComponent } from './user-edit/user-edit.component'
import { UserListComponent } from './user-list/user-list.component'

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
