import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-alumnos",
    templateUrl: "./alumnos.component.html",
    styleUrls: ["./alumnos.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AlumnosComponent  { }