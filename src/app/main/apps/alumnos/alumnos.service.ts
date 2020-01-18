import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { api } from './../../../../../config.private';

import { Alumno } from './alumno/alumno.model';

@Injectable()
export class AlumnosService implements Resolve<any> {
	private urlAlumnos = api.url + 'api/modules/cuotasystem';

	routeParams: any;
	alumno: Alumno;
	alumnos: Alumno[];
	onAlumnosChanged: BehaviorSubject<any>;
	onAlumnoChanged: BehaviorSubject<any>;

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
		this.routeParams = route.params;
debugger;
		let promise;
		if ((this.routeParams.id === 'new') || (this.routeParams.id)) {
			promise = this.getAlumno();
		} else {
			promise = this.getAlumnos();
		}

		return new Promise((resolve, reject) => {
			Promise.all([ promise ]).then(() => {
				resolve();
			}, reject);
		});
	}

	getAlumno(): Promise<any> {
		return new Promise((resolve, reject) => {
			if (this.routeParams.id === 'new') {
				this.onAlumnoChanged.next(false);
				resolve(false);
			} else {
				this._httpClient.get(this.urlAlumnos + '/alumnos/' + this.routeParams.id).subscribe((response: any) => {
					this.alumno = response;
					this.onAlumnoChanged.next(this.alumno);
					resolve(response);
				}, reject);
			}
		});
	}

	getAlumnos(): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient.get(this.urlAlumnos + '/alumnos').subscribe((response: any) => {
				this.alumnos = response;
				this.onAlumnosChanged.next(this.alumnos);
				resolve(response);
			});
		});
	}

	saveAlumno(alumno) {
		return new Promise((resolve, reject) => {
			this._httpClient.post(this.urlAlumnos + '/' + 'alumno', alumno).subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}

	/**
     * Actualizar alumno
     *
     * @param alumno
     * @returns {Promise<any>}
     */
	updateAlumno(alumno: Alumno): Promise<Alumno> {
		return new Promise((resolve, reject) => {
			this._httpClient.put(this.urlAlumnos + '/' + 'alumno/' + alumno.id, alumno).subscribe((response: any) => {
				resolve(response);
			}, reject);
		});
	}

	constructor(private _httpClient: HttpClient) {
		this.onAlumnosChanged = new BehaviorSubject({});
		this.onAlumnoChanged = new BehaviorSubject({});
	}
}
