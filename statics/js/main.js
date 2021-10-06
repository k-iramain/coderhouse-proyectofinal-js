class Usuario {
    constructor(nombreCompleto, DNI, sueldo) {
        this.nombreCompleto = nombreCompleto;
        this.DNI = DNI;
        this.sueldo = sueldo;
    }

    ingresarDatos() {
        this.nombreCompleto = "";
        while (this.nombreCompleto === "") {
            this.nombreCompleto = prompt("ingresa aqui nombre completo");
        };
        this.DNI = ""
        while (this.DNI === "") {
            this.DNI = prompt("ingresa tu DNI sin puntos");
        };
        this.sueldo = ""
        while (this.sueldo === "") {
            this.sueldo = prompt("ingrese su sueldo bruto mensual");
        };

    }
}

class Cuota {
    constructor(cuota, interes) {
        this.cuota = cuota;
        this.interes = interes;
    }

    calcularCuota(importeAPrestar) {
        return importeAPrestar * this.interes
    }
}

class Credito {
    constructor(usuario, sueldoMinimo, cuota3, cuota6, cuota12) {
        this.sueldoMinimo = sueldoMinimo;
        this.usuario = usuario;
        this.cuota3 = cuota3;
        this.cuota6 = cuota6;
        this.cuota12 = cuota12;
    }

    esAptoCredito() {
        return this.sueldoMinimo <= this.usuario.sueldo;
    }

    montoMaximoAPrestar() {
        return this.usuario.sueldo * 3;
    }

    mensajeFinal(importeFinal) {
        let mensaje = "Hola " + this.usuario.nombreCompleto + " DNI: " + this.usuario.DNI + " tu importe final es: $" + importeFinal;
        mensaje = mensaje + "\nsi lo sacas en " + this.cuota3.cuota + " cuotas pagas: " + this.cuota3.calcularCuota(importeFinal);
        mensaje = mensaje + "\nsi lo sacas en " + this.cuota6.cuota + " cuotas pagas: " + this.cuota6.calcularCuota(importeFinal);
        mensaje = mensaje + "\nsi lo sacas en " + this.cuota12.cuota + " cuotas pagas: " + this.cuota12.calcularCuota(importeFinal);
        alert(mensaje);
    }

    calcularCuotas() {
        let esApto = this.esAptoCredito();
        if (esApto) {
            let montoMaximoAPrestar = this.montoMaximoAPrestar();
            this.mensajeFinal(montoMaximoAPrestar);

        } else {
            alert("Lo sentimos no es apto para otorgarle el credito");
        }
    }



}

function simulador() {
    const cuota3 = new Cuota(3, 1.50);
    const cuota6 = new Cuota(6, 1.70);
    const cuota12 = new Cuota(12, 2.0);
    const sueldoMinimo = 50000;
    let usuario = new Usuario("", "", "");
    usuario.ingresarDatos();

    let credito = new Credito(usuario, sueldoMinimo, cuota3, cuota6, cuota12);
    credito.calcularCuotas();

}
