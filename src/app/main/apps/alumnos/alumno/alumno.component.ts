import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { FuseConfirmDialogComponent } from './../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import {
	MatTableDataSource,
	MatDialog,
	MatDialogRef,
	throwMatDialogContentAlreadyAttachedError
} from '@angular/material';

import { AlumnosService } from './../alumnos.service';
import { GradosService } from './../../../../../@fuse/services/grados.service';

import { Alumno } from './alumno.model';

@Component({
	selector: 'app-alumno',
	templateUrl: './alumno.component.html',
	styleUrls: [ './alumno.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class AlumnoComponent implements OnInit, OnDestroy {
	displayedColumns = [ 'nombre', 'apellido', 'documento', 'eliminar' ];
	dataSourceHermanos = new MatTableDataSource<any>();

	alumno: Alumno;
	alumnos: Alumno[];
	grados: any[];
	pageType: string;
	alumnoForm: FormGroup;
	alumnoControl = new FormControl();
	filteredAlumnos: Observable<any[]>;

	private _unsubscribeAll: Subject<any>;
	fileNameDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

	tiposEscuela: any[] = [
		{ value: 'primaria', viewValue: 'Primaria' },
		{ value: 'secundaria', viewValue: 'Secundaria' }
	];

	ngOnInit(): void {
		this.alumnosService.onAlumnoChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe((alumno) => {
			if (alumno) {
				this.alumno = new Alumno(alumno);
				this.pageType = 'edit';

				this.dataSourceHermanos = new MatTableDataSource(this.alumno.hermanos);
			} else {
				this.pageType = 'new';
				this.alumno = new Alumno();
				this.alumno.activo = true;
			}

			this.alumnoForm = this.createAlumnoForm();

			this.getGrados();
		});
	}

	createAlumnoForm(): FormGroup {
		return this._formBuilder.group({
			id: [ this.alumno.id ],
			nombre: [ this.alumno.nombre ],
			apellido: [ this.alumno.apellido ],
			documento: [ this.alumno.documento ],
			fechaNacimiento: [ this.alumno.fechaNacimiento ],
			direccion: [ this.alumno.direccion ],
			localidad: [ this.alumno.localidad ],
			telefono: [ this.alumno.telefono ],
			mail: [ this.alumno.mail ],
			activo: [ this.alumno.activo ],
			escuela: this._formBuilder.group({
				nombre: [ this.alumno.escuela.nombre ],
				direccion: [ this.alumno.escuela.direccion ],
				tipoEscuela: [ this.alumno.escuela.tipoEscuela ]
			}),
			grado: [ this.alumno.grado ],
			tipoAlumno: [ this.alumno.tipoAlumno ],
			anoInicio: [ this.alumno.anoInicio ],
			libretaSanitaria: [ this.alumno.libretaSanitaria ],
			// hermanos: this._formBuilder.array([ this.initHermanos() ]),
			observaciones: [ this.alumno.observaciones ],
			hermanoInput: null
		});
	}

	initHermanos(): FormGroup {
		return this._formBuilder.group({
			nombre: [],
			apellido: [],
			documento: []
		});
	}

	getAlumnos(): void {
		this.alumnosService.getAlumnos().then((alumnos) => {
			this.alumnos = alumnos;

			this.filteredAlumnos = this.alumnoControl.valueChanges.pipe(
				startWith<string | any>(''),
				map((value) => (typeof value === 'string' ? value : value.nombre)),
				map((nombre) => (nombre ? this._filter(nombre) : this.alumnos.slice()))
			);
		});
	}

	private _filter(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.alumnos.filter(
			(option) =>
				option.nombre.toLowerCase().indexOf(filterValue) === 0 ||
				option.apellido.toLowerCase().indexOf(filterValue) === 0
		);
	}

	displayFn(hermano: Alumno) {
		if (hermano) {
			return hermano.apellido + ' ' + hermano.nombre;
		}
	}

	getGrados(): void {
		this.gradosService.getGrados().then((grados) => {
			this.grados = grados;
		});
	}

	saveAlumno() {
		const alumno = this.alumnoForm.getRawValue();

		this.alumnosService.saveAlumno(alumno).then((data: Alumno) => {
			const dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
				data: {
					mensaje: 'El Alumno se guardó correctamente! Ahora puede editar los demás datos.',
					btnConfirm: 'Aceptar'
				},
				width: '500px'
			});

			return dialogRef.afterClosed().subscribe((result) => {
				this.alumno = new Alumno(data);
				this.alumnoForm.patchValue({ id: this.alumno.id });
				this.pageType = 'edit';
			});
		});
	}

	editAlumno() {
		const alumno = this.alumnoForm.getRawValue();

		this.alumnosService.editAlumno(alumno).then((data: Alumno) => {
			const dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
				data: {
					mensaje: 'El Alumno se editó correctamente!',
					btnConfirm: 'Aceptar'
				},
				width: '500px'
			});

			return dialogRef.afterClosed().subscribe((result) => {
				this.router.navigate([ '/alumnos' ]);
			});
		});
	}

	addHermano(hermano: any) {
		const index = this.alumno.hermanos.find((h) => h._id === hermano.id);

		if (hermano && !index) {
			let patch = {
				op: 'hermano',
				hermano: hermano,
				idAlumno: this.alumno.id
			};

			this.alumnosService.saveHermano(patch).then((data: any) => {
				this.alumno.hermanos.push(data.hermanos); // Permite mostrar la tabla de hermanos
				this.dataSourceHermanos = new MatTableDataSource(data.hermanos);

				this.alumnoControl.setValue('');
			});
		} else {
			const dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
				data: {
					mensaje: 'Seleccione un hermano o el hermano seleccionado ya fue agregado!',
					btnConfirm: 'Aceptar'
				},
				width: '500px'
			});
			return dialogRef.afterClosed();
		}
	}

	async deleteHermano(alumno, hermano) {
		debugger;
		let params = {
			op: 'deleteHermano',
			hermano: hermano
		};

		this.alumnosService.patchAlumno(alumno, params).then((data: any) => {
			this.alumno.hermanos.push(data.hermanos); // Permite mostrar la tabla de hermanos
			this.dataSourceHermanos = new MatTableDataSource(data.hermanos);
		});
	}

	ngOnDestroy() {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	constructor(
		private alumnosService: AlumnosService,
		private _formBuilder: FormBuilder,
		public dialog: MatDialog,
		private router: Router,
		private gradosService: GradosService
	) {
		this.alumno = new Alumno();
		this._unsubscribeAll = new Subject();

		this.getAlumnos();
	}
}
