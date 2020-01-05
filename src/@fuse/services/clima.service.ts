import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { api } from "./../../../config.private";

@Injectable()
export class ClimaService {
    private urlClima = api.url + "api/modules/cuotasystem";

    getClima(): Promise<any> {
        return new Promise((resolve, reject) => {            
            this._httpClient
                .get(this.urlClima + "/clima")
                .subscribe(response => {                    
                    resolve(response);
                });
        });
    }

    constructor(private _httpClient: HttpClient) {}
}
