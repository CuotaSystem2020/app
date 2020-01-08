import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

import { api } from "./../../../../../config.private";

@Injectable()
export class AlumnosService implements Resolve<any> {
    private urlAlumnos = api.url + "api/modules/cuotasystem";

    alumnos: any[];
    onAlumnosChanged: BehaviorSubject<any>;

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getAlumnos()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getAlumnos(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(this.urlAlumnos + "/alumnos")
                .subscribe((response: any) => {                    
                    this.alumnos = response;
                    this.onAlumnosChanged.next(this.alumnos);
                    resolve(response);
                });
        });
    }

    constructor(private _httpClient: HttpClient) {
        this.onAlumnosChanged = new BehaviorSubject({});
    }
}
