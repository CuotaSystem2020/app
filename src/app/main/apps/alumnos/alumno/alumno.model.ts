// import { Escuela } from "./Escuela";
// import { Autorizados } from "./Autorizados";

export class Alumno {
	public id: string;
	public nombre: string;
	public apellido: String;
	public documento: String;
	public fechaNacimiento: Date;
	public direccion: String;
	public localidad: String;
	public telefono: Number;
	public mail: String;
	public escuela: Escuela;
	public grado: String;
	public libretaSanitaria: Boolean;
	public activo: Boolean;
	public tipoAlumno: String;
	public anoInicio: Number;
	public autorizados: [Autorizados];
	public observaciones: String;
	public hermanos?: [
		{
			_id: String;
			nombre: String;
			apellido: String;
			documento: String;
		}
	];
	public alumnoImage: {
		size: String;
		path: String;
		filename: String;
		destination: String;
		mimetype: String;
		encoding: String;
		originalname: String;
		fieldname: String;
	};

	constructor(alumno?) {
		alumno = alumno || {};
		this.id = alumno.id;
		this.nombre = alumno.nombre || '';
		this.apellido = alumno.apellido || '';
		this.documento = alumno.documento || '';
		this.fechaNacimiento = alumno.fechaNacimiento || '';
		this.direccion = alumno.direccion || '';
		this.localidad = alumno.localidad || '';
		this.telefono = alumno.telefono || '';
		this.mail = alumno.mail || '';
		this.escuela = alumno.escuela || {};
		this.grado = alumno.grado || '';
		this.libretaSanitaria = alumno.libretaSanitaria || false;
		this.activo = alumno.activo;
		this.tipoAlumno = alumno.tipoAlumno || '';
		this.anoInicio = alumno.anoInicio || '';
		this.autorizados = alumno.autorizados || [];
		this.observaciones = alumno.observaciones || '';
		this.hermanos = alumno.hermanos || [];
		this.alumnoImage = alumno.alumnoImage || '';
	}
}

//TODO: Separar todo esto en otras clases
class Escuela {
	constructor(public nombre: String, public direccion: String, public tipoEscuela: String) {}
}

class Autorizados {
	constructor(public relacion: String, public nombreCompleto: String, public documento: String) {}
}
