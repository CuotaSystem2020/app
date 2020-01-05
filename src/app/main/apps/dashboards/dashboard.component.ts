import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";

import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { DashboardService } from "./dashboard.service";
import { AlumnosService } from "./../alumnos/alumnos.service";
import { ClimaService } from "./../../../../@fuse/services/clima.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
    dateNow = Date.now();
    alumnosActivos: number;
    alumnosInactivos: number;
    clima: any = {};
    wind_direction: string;

    ngOnInit() {
        this.getClima();
        this.getAlumnos();
    }

    getAlumnos(): void {
        this.alumnosService.getAlumnos().then(data => {
            this.alumnosActivos = data.filter(x => x.activo === true).length;
            this.alumnosInactivos = data.filter(x => x.activo === false).length;
        });
    }

    getClima(): void {
        this.climaService.getClima().then(data => {
            this.clima = JSON.parse(data);
            this.getWindDirection(this.clima.current_observation.wind.direction)
        });
    }

    getWindDirection(direction: number) {
        let DirTable = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "SOUTH",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
            "N"
        ];

        this.wind_direction =
            DirTable[Math.floor((direction + 11.25) / 22.5)];
    }

    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: DashboardService,
        private alumnosService: AlumnosService,
        private climaService: ClimaService
    ) {
        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);
    }
}
