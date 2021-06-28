import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Commodity } from 'src/app/models/Commodity';
import { User } from 'src/app/models/User';
import { CommodityService } from 'src/app/services/commodity.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.css']
})
export class CommodityComponent implements OnInit {

  maxDate: Date = new Date();

  users: User[] = [];

  amount: number = 0;

  commodities: Commodity[] = [];

  formCommodity!: FormGroup;
  formFilters!: FormGroup;

  is_saving = false;
  is_editing = false;

  cols = [
    { field: 'commodityName', header: 'Nombre' },
    { field: 'amount', header: 'Cantidad' },
    { field: 'entryDate', header: 'Fecha Entrada' },
    { field: 'user.userName', header: 'Ingresado por' },
  ];

  constructor(private userService: UserService,
    private commodityService: CommodityService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.resetForm();
    this.filterForm();
  }

  resetForm() {
    this.formCommodity = this.formBuilder.group({
      user: [null, Validators.required],
      commodityName: ["", Validators.required],
      amount: [0, [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      entryDate: [new Date(), Validators.required]
    })
    this.is_editing = false;
  }

  filterForm() {
    this.formFilters = this.formBuilder.group({
      commodityName: [null, Validators.required],
      userId: [null, Validators.required],
      entryDate: [null, Validators.required]
    });

    this.statusFields(false);

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      response => {
        if (response != null) {
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

    this.commodityService.getCommodities().subscribe(
      response => {
        if (response != null) {
          this.commodities = response;
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

  saveCommodity() {
    if (this.is_saving == false) {
      if (this.formCommodity.valid) {
        this.is_saving = true;
        if (this.is_editing) {
          this.commodityService.editCommodity(this.formCommodity.value, this.formCommodity.controls['user'].value.userId).subscribe(
            response => {
              if (response != null) {
                this.messageService.add({ severity: 'success', summary: 'Editado!', detail: 'Se actualizo correctamente' });
                this.commodities.splice(
                  this.commodities.findIndex(data => data.commodityName == response.commodityName)
                  , 1, response);
                this.is_saving = false;
                this.is_editing = false;
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
        } else {
          this.commodityService.saveCommodity(this.formCommodity.value).subscribe(
            response => {
              if (response != null) {
                this.messageService.add({ severity: 'success', summary: '¡Guardado!', detail: 'Se guardo correctamente' });
                this.commodities.push(response);
                this.is_saving = false;
                this.resetForm();
              }
            },
            err => {
              if (err.status == 0) {
                this.messageService.add({ severity: 'error', summary: '!Error!', detail: "No se pudo conectar al servidor" });
              } else {
                this.messageService.add({ severity: 'error', summary: '!Error!', detail: err.error.message });
              }
              this.is_saving = false;
            }
          )
        }

      }
    }
  }

  selectCommodity(commodity: Commodity, index: number) {
    this.formCommodity.controls['user'].setValue(commodity.user);
    this.formCommodity.controls['commodityName'].setValue(commodity.commodityName);
    this.formCommodity.controls['amount'].setValue(commodity.amount);
    console.log(commodity.entryDate + "")
    this.formCommodity.controls['entryDate'].setValue(new Date(commodity.entryDate + ""));
    this.is_editing = true;
  }

  removeCommodity(commodity: Commodity, index: number) {
    this.confirmationService.confirm({
      header: "¡Eliminar!",
      message: '¿Estas seguro que quiere eliminar el producto ' + commodity.commodityName + "?",
      accept: () => {
        console.log(commodity)
        this.commodityService.removeCommodity(commodity.commodityName, this.formCommodity.controls['user'].value.userId).subscribe(
          response => {
            if (response == true) {
              this.commodities.splice(index, 1);
              this.messageService.add({ severity: 'success', summary: 'Eliminado!', detail: 'Se elimino correctamente' });
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
    });
  }

  filterStatus(event: any, controlName: string) {
    if (event) {
      this.formFilters.controls[controlName].enable();
      this.formFilters.controls[controlName].setValue(null);
    } else {
      this.formFilters.controls[controlName].disable();
      this.formFilters.controls[controlName].setValue(null);
    }
  }



  findByFilters() {
    this.commodityService.getCommoditiesByExample(this.formFilters.value).subscribe(
      response => {
        if (response != null) {
          this.commodities = response;
        } else {
          this.commodities = [];
        }
      }
    );
  }

  statusFields(event: boolean) {
    if (event) {
      Object.keys(this.formFilters.controls).forEach(key => {
        this.formFilters.controls[key].enable();
      });
    } else {
      Object.keys(this.formFilters.controls).forEach(key => {
        this.formFilters.controls[key].disable();
      });
    }
  }

}
