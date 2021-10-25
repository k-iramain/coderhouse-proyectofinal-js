document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form").addEventListener('submit', simulador);
});

const veraz = {
    36079981: {
        "estado_bcra": 4,
        "prestamo_vigente": true
    },
    31767890: {
        "estado_bcra": 1,
        "prestamo_vigente": false
    },
    33660132: {
        "estado_bcra": 1,
        "prestamo_vigente": false
    },
    33050132: {
        "estado_bcra": 1,
        "prestamo_vigente":true
    },
    30600032: {
        "estado_bcra": 1,
        "prestamo_vigente": false
    },
    31180102: {
        "estado_bcra": 1,
        "prestamo_vigente": false
    },

}

let localStorage = window.localStorage;

localStorage.setItem("veraz", JSON.stringify(veraz));

class Usuario {
    constructor(nombre, apellido, DNI, sueldo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.DNI = DNI;
        this.sueldo = sueldo;
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
        let veraz = JSON.parse(localStorage.getItem("veraz"));
        let informacionCrediticia = veraz[this.usuario.DNI]
        console.log(informacionCrediticia);

        if (this.sueldoMinimo >= this.usuario.sueldo ) {
            console.log(1);
            return false;
        }
        else if (informacionCrediticia == undefined) {
            console.log(2);
            return false;
        }
        else if (informacionCrediticia.prestamo_vigente == true) {
            console.log(3);
            return false;
        }
        else if (informacionCrediticia.estado_bcra > 2) {
            console.log(4);
            return false;
        }
        else {
            return true;
        };
       

    }

    montoMaximoAPrestar() {
        return this.usuario.sueldo * 3;
    }

    mensajeFinal(importeFinal) {
        let header = document.createElement("h1");
        header.innerHTML = "Detalle prestamo";
        let detalle = document.createElement("p");
        detalle.innerHTML = "Hola " + this.usuario.nombre + "" + this.usuario.apellido + " DNI: " + this.usuario.DNI + " podemos otorgarte hasta: $" + importeFinal;
        let cuotas = document.createElement("ul");
        let cuotaDetalle1 = document.createElement("li");
        cuotaDetalle1.innerHTML = "si lo sacas en " + this.cuota3.cuota + " cuotas pagas: " + this.cuota3.calcularCuota(importeFinal);
        let cuotaDetalle2 = document.createElement("li");
        cuotaDetalle2.innerHTML = "si lo sacas en " + this.cuota6.cuota + " cuotas pagas: " + this.cuota6.calcularCuota(importeFinal);
        let cuotaDetalle3 = document.createElement("li");
        cuotaDetalle3.innerHTML = "si lo sacas en " + this.cuota12.cuota + " cuotas pagas: " + this.cuota12.calcularCuota(importeFinal);
        cuotas.appendChild(cuotaDetalle1);
        cuotas.appendChild(cuotaDetalle2);
        cuotas.appendChild(cuotaDetalle3);

        let detallePrestamo = document.getElementById("prestamo");
        detallePrestamo.appendChild(header);
        detallePrestamo.appendChild(detalle);
        detallePrestamo.appendChild(cuotas);


    }

    calcularCuotas() {
        let esApto = this.esAptoCredito();
        if (esApto) {
            let montoMaximoAPrestar = this.montoMaximoAPrestar();
            this.mensajeFinal(montoMaximoAPrestar);

        } else {
          let error = document.createElement("h1");
          error.innerHTML = "lo sentimos, no podemos otorgarle el crédito";
          let detallePrestamo = document.getElementById("prestamo");
          detallePrestamo.appendChild(error);
        }
    }





}

function simulador(evento) {

    evento.preventDefault();
    const cuota3 = new Cuota(3, 1.50);
    const cuota6 = new Cuota(6, 1.70);
    const cuota12 = new Cuota(12, 2.0);
    const sueldoMinimo = 50000;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let DNI = document.getElementById("DNI").value;
    let sueldo = document.getElementById("sueldoBruto").value;
    let usuario = new Usuario(nombre, apellido, DNI, sueldo);


    let credito = new Credito(usuario, sueldoMinimo, cuota3, cuota6, cuota12);
    credito.calcularCuotas();

}