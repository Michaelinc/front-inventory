import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// //Menu
// import { PanelMenuModule } from 'primeng/panelmenu';

// //Botones
import { ButtonModule } from 'primeng/button';
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { ToggleButtonModule } from 'primeng/togglebutton';
// import { SelectButtonModule } from 'primeng/selectbutton';

// //Inputs
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
// import { EditorModule } from 'primeng/editor';
// import { SpinnerModule } from 'primeng/spinner';
import { DropdownModule } from 'primeng/dropdown';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { RadioButtonModule } from 'primeng/radiobutton';
 import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar'
// import { ColorPickerModule } from 'primeng/colorpicker';

// //Mensajes
 import { MessagesModule } from 'primeng/messages';
 import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

// //Ventanas de dialogo
// import { DialogModule } from 'primeng/dialog';
// import { SidebarModule } from 'primeng/sidebar';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { ProgressBarModule } from 'primeng/progressbar';


// //Forma de mostrar datos
// import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
// import { PickListModule } from 'primeng/picklist';
 import { TabMenuModule } from 'primeng/tabmenu';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { TooltipModule } from 'primeng/tooltip';
// import { AccordionModule } from 'primeng/accordion';

// //Otros
// import { FileUploadModule } from 'primeng/fileupload';
// import { FieldsetModule } from 'primeng/fieldset';
// import { CaptchaModule } from 'primeng/captcha';


@NgModule({
    imports: [
        CommonModule,
        // PanelMenuModule,
        ButtonModule,
        // SplitButtonModule,
        // ToggleButtonModule,
        // SelectButtonModule,
        InputTextModule,
        InputNumberModule,
        ConfirmDialogModule,
        // EditorModule,
        // SpinnerModule,
        DropdownModule,
        // RadioButtonModule,
         CheckboxModule,
        CalendarModule,
        // ColorPickerModule,
         MessagesModule,
         MessageModule,
        // DialogModule,
        // CardModule,
        ToastModule,
        TableModule,
        // PickListModule,
        // FileUploadModule,
        // FieldsetModule,
        // MultiSelectModule,
        TabMenuModule,
        // OverlayPanelModule,
        // TooltipModule,
        // SidebarModule,
        // AccordionModule,
        // CaptchaModule,
        // ProgressSpinnerModule,
        // ProgressBarModule
    ],

    exports: [
        // PanelMenuModule,
        ButtonModule,
        // SplitButtonModule,
        // ToggleButtonModule,
        // SelectButtonModule,
        InputTextModule,
        InputNumberModule,
        // EditorModule,
        // SpinnerModule,
        DropdownModule,
        // RadioButtonModule,
         CheckboxModule,
        CalendarModule,
        ConfirmDialogModule,
        // ColorPickerModule,
         MessagesModule,
         MessageModule,
        // DialogModule,
        // CardModule,
        ToastModule,
        TableModule,
        // PickListModule,
        // FileUploadModule,
        // FieldsetModule,
        // MultiSelectModule,
        TabMenuModule,
        // OverlayPanelModule,
        // TooltipModule,
        // SidebarModule,
        // AccordionModule,
        // CaptchaModule,
        // ProgressSpinnerModule,
        // ProgressBarModule
    ], entryComponents: [

    ]
})

export class PrimengConfig { }
