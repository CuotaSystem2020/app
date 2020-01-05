import { NgModule } from "@angular/core";

import { AlumnosService } from "./alumnos.service";

import { AlumnosComponent } from "./alumnos/alumnos.component";

@NgModule({
    declarations: [AlumnosComponent],
    imports: [],
    providers: [AlumnosService]
})
export class AlumnosModule {}
