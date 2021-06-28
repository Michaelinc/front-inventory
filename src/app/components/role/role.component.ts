import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];

  formRole!: FormGroup;

  is_saving = false;

  cols = [
    { field: 'roleName', header: 'Nombre' },
  ];

  constructor(private roleService: RoleService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
    this.resetForm();
  }

  resetForm() {
    this.formRole = this.formBuilder.group({
      roleId: [null],
      roleName: [null, Validators.required],
    })
  }

  ngOnInit(): void {
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
      if (this.formRole.valid) {
        this.is_saving = true;
        this.roleService.saveRole(this.formRole.value).subscribe(
          response => {
            if (response != null) {
              this.messageService.add({ severity: 'success', summary: '¡Guardado!', detail: 'Se guardo correctamente' });
              this.roles.push(response);
              this.is_saving = false;
              this.resetForm();
            }
          },
          err => {
            if(err.status == 0){
              this.messageService.add({ severity: 'error', summary: '!Error!', detail: "No se pudo conectar al servidor" });
            } else {
              this.messageService.add({ severity: 'error', summary: '!Error!', detail: err.error.message });
            }            this.is_saving = false;
          }
        )
      }
    }
  }

}
