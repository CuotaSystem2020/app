import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
	selector: 'fuse-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: [ './confirm-dialog.component.scss' ]
})
export class FuseConfirmDialogComponent {
	public confirmMessage: string;
	public mensaje: string;
	public btnConfirm: string;
	public btnCancel: string;
	/**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmDialogComponent>} dialogRef
     */
	constructor(public dialogRef: MatDialogRef<FuseConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) private data) {}

	ngOnInit() {
		debugger;
		this.mensaje = this.data.mensaje;
		this.confirmMessage = this.data.confirmMessage;
		this.btnConfirm = this.data.btnConfirm;
		this.btnCancel = this.data.btnCancel;
	}
}
