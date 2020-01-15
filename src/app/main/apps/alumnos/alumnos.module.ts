import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

import { AlumnosService } from "./alumnos.service";

import { AlumnosComponent } from "./alumnos/alumnos.component";
import { AlumnoComponent } from "./alumno/alumno.component";

const routes: Routes = [
    {
        path: "alumnos",
        component: AlumnosComponent,
        resolve: {
            data: AlumnosService
        }
    },
    {
        path: "alumno/:id",
        component: AlumnoComponent,
        resolve: {
            data: AlumnosService
        }
    }
];

@NgModule({
    declarations: [AlumnosComponent, AlumnoComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers: [AlumnosService]
})
export class AlumnosModule {}
