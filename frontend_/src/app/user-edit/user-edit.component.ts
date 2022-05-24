import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userId: any;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')
  }

}
