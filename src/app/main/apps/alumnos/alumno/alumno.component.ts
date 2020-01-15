import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";
import { FuseUtils } from "@fuse/utils";

import { AlumnosService } from "./../alumnos.service";
import { Alumno } from "./alumno.model";

@Component({
    selector: "app-alumno",
    templateUrl: "./alumno.component.html",
    styleUrls: ["./alumno.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AlumnoComponent implements OnInit, OnDestroy {
    alumno: Alumno;
    pageType: string;
    alumnoForm: FormGroup;

    private _unsubscribeAll: Subject<any>;

    ngOnInit(): void {
        this.alumnosService.onAlumnoChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(alumno => {
                if (alumno) {
                    this.alumno = new Alumno(alumno);
                    this.pageType = "edit";
                } else {
                    this.pageType = "new";
                    this.alumno = new Alumno();
                }

                this.alumnoForm = this.createAlumnoForm();
            });
    }

    createAlumnoForm(): FormGroup {
        return this._formBuilder.group({
            nombre: [this.alumno.nombre],
            apellido: [this.alumno.apellido],
            documento: [this.alumno.documento],
            fechaNacimiento: [this.alumno.fechaNacimiento],
            direccion: [this.alumno.direccion],
            localidad: [this.alumno.localidad],
            telefono: [this.alumno.telefono],
            mail: [this.alumno.mail],
            observaciones: [this.alumno.observaciones]
        });
    }

    addAlumno() {
        const alumno = this.alumnoForm.getRawValue();
        debugger;
        if (this.pageType === "new") {
            this.alumnosService.saveAlumno(alumno).then(data => {});
        } else {
        }
    }

    saveAlumno() {}

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    constructor(
        private alumnosService: AlumnosService,
        private _formBuilder: FormBuilder
    ) {
        this.alumno = new Alumno();

        this._unsubscribeAll = new Subject();
    }
}
