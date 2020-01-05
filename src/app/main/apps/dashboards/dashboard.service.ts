import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class DashboardService implements Resolve<any> {
    widgets: any[];

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

    getWidgets(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this._httpClient
            //     .get("api/project-dashboard-widgets")
            //     .subscribe((response: any) => {
            //         this.widgets = response;
            //         resolve(response);
            //     }, reject);
        });
    }

    constructor(private _httpClient: HttpClient) {}
}


