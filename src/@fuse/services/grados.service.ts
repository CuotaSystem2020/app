import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { api } from './../../../config.private';

@Injectable()
export class GradosService {
	private urlClima = api.url + 'api/modules/tm';

	getGrados(): Promise<any> {
		return new Promise((resolve, reject) => {
			this._httpClient.get(this.urlClima + '/grados').subscribe((response) => {
				resolve(response);
			});
		});
	}

	constructor(private _httpClient: HttpClient) {}
}
