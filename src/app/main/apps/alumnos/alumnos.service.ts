import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { api } from "./../../../../../config.private";

@Injectable()
export class AlumnosService implements Resolve<any> {
    private urlAlumnos = api.url + "api/modules/cuotasystem";

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }

    getAlumnos(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(this.urlAlumnos + "/alumnos")
                .subscribe(response => {
                    resolve(response);
                });
        });
    }

    constructor(private _httpClient: HttpClient) {}
}
