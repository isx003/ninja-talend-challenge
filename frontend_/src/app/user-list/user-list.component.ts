import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users:any = []

  constructor(private userSevice: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userSevice.getUsers().subscribe(res=>this.users = res)
  }

  deleteUser(userId:number){
    this.userSevice.deleteUser(userId).subscribe(()=>{
      this.getUsers()
    })
  }

}
