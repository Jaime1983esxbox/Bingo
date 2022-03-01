"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BingoComponent = void 0;
var core_1 = require("@angular/core");
var jugador_1 = require("src/app/models/jugador");
var BingoComponent = /** @class */ (function () {
    function BingoComponent() {
        this.numeros = [];
        this.jugadores = [];
        this.jugador = new jugador_1.Jugador();
        this.numeroJugadores = 0;
        this.numeroActual = 0;
        this.numerosBingo = [];
        this.numerosLinea1 = [];
        this.numerosLinea2 = [];
        this.numerosLinea3 = [];
        this.filtered = [];
        this.numeroAcertado = false;
        this.mostrarBotonInicio = true;
        this.mostrarCartones = false;
        this.mostrarNumeros = false;
        this.mostrarBotonComenzar = false;
        this.mostrarBotonNumero = false;
        this.mostrarBotonNuevaPartida = false;
        this.mostrarGanadorLinea = false;
        this.mostrarGanadorBingo = false;
    }
    BingoComponent.prototype.ngOnInit = function () {
        for (var i = 1; i <= 90; i++) {
            this.numeros.push(i);
        }
    };
    BingoComponent.prototype.getRandomCarton = function () {
        return Math.floor((Math.random() * (90 - 1 + 1)) + 1);
    };
    BingoComponent.prototype.random = function () {
        return Math.floor(Math.random() * this.numeros.length);
    };
    BingoComponent.prototype.agregarJugadores = function () {
        this.mostrarBotonInicio = false;
        this.mostrarCartones = true;
        this.mostrarBotonComenzar = true;
        for (var i = 0; i < this.numeroJugadores; i++) {
            this.jugador = new jugador_1.Jugador();
            this.jugador.nombre = 'Jugador' + i;
            this.jugador.carton = [];
            while (this.jugador.carton.length < 15) {
                var numeroCarton = this.getRandomCarton();
                if (!this.jugador.carton.includes(numeroCarton)) {
                    this.jugador.carton.push(numeroCarton);
                    this.jugador.carton.sort(function (a, b) { return a - b; });
                }
            }
            this.jugadores.push(this.jugador);
        }
    };
    BingoComponent.prototype.comenzarBingo = function () {
        var _this = this;
        this.mostrarNumeros = true;
        this.mostrarBotonComenzar = false;
        this.mostrarBotonNumero = true;
        if (this.numerosBingo.length < 90) {
            var indiceAleatorioArrayNumero = Math.floor(Math.random() * this.numeros.length);
            this.numeroActual = this.numeros[indiceAleatorioArrayNumero];
            this.numerosBingo.push(this.numeroActual);
            var index = this.numeros.indexOf(this.numeroActual);
            if (index !== -1) {
                this.numeros.splice(index, 1);
            }
            for (var i = 0; i < this.jugadores.length; i++) {
                this.comprobarLinea(this.jugadores[i]);
                var filtered = this.jugadores[i].carton.filter(function (number) {
                    if (!_this.numerosBingo.includes(number)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                if (filtered.length == 0) {
                    this.mostrarGanadorBingo = true;
                    this.jugadorGanador = new jugador_1.Jugador();
                    this.jugadorGanador.nombre = this.jugadores[i].nombre;
                    this.mostrarBotonNumero = false;
                    this.mostrarBotonNuevaPartida = true;
                    break;
                }
            }
        }
    };
    BingoComponent.prototype.comprobarLinea = function (jugador) {
        var _this = this;
        var numerosCarton = jugador.carton;
        for (var j = 0; j < numerosCarton.length; j++) {
            if (j >= 0 && j < 5) {
                this.numerosLinea1.push(numerosCarton[j]);
            }
            else if (j >= 5 && j < 10) {
                this.numerosLinea2.push(numerosCarton[j]);
            }
            else if (j >= 10 && j < 15) {
                this.numerosLinea3.push(numerosCarton[j]);
            }
        }
        this.filtered = this.numerosLinea1.filter(function (number) {
            if (!_this.numerosBingo.includes(number)) {
                return true;
            }
            else {
                return false;
            }
        });
        if (this.filtered.length == 0 && this.mostrarGanadorLinea == false) {
            this.mostrarGanadorLinea = true;
            this.jugadorGanadorLinea = new jugador_1.Jugador();
            this.jugadorGanadorLinea.nombre = jugador.nombre;
            this.jugadorGanadorLinea.carton = this.numerosLinea1;
        }
        this.filtered = this.numerosLinea2.filter(function (number) {
            if (!_this.numerosBingo.includes(number)) {
                return true;
            }
            else {
                return false;
            }
        });
        if (this.filtered.length == 0 && this.mostrarGanadorLinea == false) {
            this.mostrarGanadorLinea = true;
            this.jugadorGanadorLinea = new jugador_1.Jugador();
            this.jugadorGanadorLinea.nombre = jugador.nombre;
            this.jugadorGanadorLinea.carton = this.numerosLinea2;
        }
        this.filtered = this.numerosLinea3.filter(function (number) {
            if (!_this.numerosBingo.includes(number)) {
                return true;
            }
            else {
                return false;
            }
        });
        if (this.filtered.length == 0 && this.mostrarGanadorLinea == false) {
            this.mostrarGanadorLinea = true;
            this.jugadorGanadorLinea = new jugador_1.Jugador();
            this.jugadorGanadorLinea.nombre = jugador.nombre;
            this.jugadorGanadorLinea.carton = this.numerosLinea3;
        }
        this.numerosLinea1 = [];
        this.numerosLinea2 = [];
        this.numerosLinea3 = [];
    };
    BingoComponent.prototype.comprobarNumero = function (numero) {
        if (this.numerosBingo.includes(numero)) {
            return true;
        }
        else {
            return false;
        }
    };
    BingoComponent.prototype.nuevaPartida = function () {
        this.numerosBingo = [];
        this.numerosLinea1 = [];
        this.numerosLinea2 = [];
        this.numerosLinea3 = [];
        this.numeros = [];
        this.jugadores = [];
        this.filtered = [];
        this.mostrarBotonInicio = true;
        this.mostrarGanadorBingo = false;
        this.mostrarGanadorLinea = false;
        this.mostrarNumeros = false;
        this.mostrarBotonNuevaPartida = false;
        this.ngOnInit();
    };
    BingoComponent = __decorate([
        core_1.Component({
            selector: 'app-bingo',
            templateUrl: './bingo.component.html',
            styleUrls: ['./bingo.component.css']
        })
    ], BingoComponent);
    return BingoComponent;
}());
exports.BingoComponent = BingoComponent;
