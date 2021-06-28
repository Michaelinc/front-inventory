import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users: User[] = [];

  roles: Role[] = [];

  formUser!: FormGroup;

  is_saving = false;

  cols = [
    { field: 'userName', header: 'Nombre' },
    { field: 'age', header: 'Edad' },
    { field: 'companyEntryDate', header: 'Fecha Ingreso' },
    { field: 'role.roleName', header: 'Cargo' },
  ];

  constructor(private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
    this.resetForm();
  }

  resetForm() {
    this.formUser = this.formBuilder.group({
      userId: [null],
      userName: [null, Validators.required],
      age: [0, [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      companyEntryDate: [new Date(), Validators.required],
      role: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      response => {
        if (response != null) {
          console.log(response)
          this.users = response;
        }
      },
      err => {
        if (err.status == 0) {
          this.messageService.add({ severity: 'error', summary: '!Error!', detail: "No se pudo conectar al servidor" });
        } else {
          this.messageService.add({ severity: 'error', summary: '!Error!', detail: err.error.message });
        }
      }
    )

    this.roleService.getRoles().subscribe(
      response => {
        if (response != null) {
          console.log(response)
          this.roles = response;
        }
      },
      err => {
        if (err.status == 0) {
          this.messageService.add({ severity: 'error', summary: '!Error!', detail: "No se pudo conectar al servidor" });
        } else {
          this.messageService.add({ severity: 'error', summary: '!Error!', detail: err.error.message });
        }
      }
    )
  }

  saveUser() {
    if (this.is_saving == false) {
      if (this.formUser.valid) {
        this.is_saving = true;
        this.userService.saveUser(this.formUser.value).subscribe(
          response => {
            if (response != null) {
              this.messageService.add({ severity: 'success', summary: '¡Guardado!', detail: 'Se guardo correctamente' });
              this.users.push(response);
              this.is_saving = false;
              this.resetForm();
            }
          },
          err => {
            if (err.status == 0) {
              this.messageService.add({ severity: 'error', summary: '!Error!', detail: "No se pudo conectar al servidor" });
            } else {
              this.messageService.add({ severity: 'error', summary: '!Error!', detail: err.error.message });
            } this.is_saving = false;
          }
        )
      }
    }
  }

}
