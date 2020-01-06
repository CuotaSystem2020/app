import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AlumnosService } from "./alumnos.service";

import { AlumnosComponent } from "./alumnos/alumnos.component";

const routes: Routes = [
    {
        path: "alumnos",
        component: AlumnosComponent
    }
    // {
    //     path: "alumno/:id",
    //     component: AlumnoComponent,
    //     canActivate: [AuthGuard],
    //     resolve: {
    //         data: AlumnoService
    //     }
    // }
];

@NgModule({
    declarations: [AlumnosComponent],
    imports: [RouterModule.forChild(routes)],
    providers: [AlumnosService]
})
export class AlumnosModule {}
