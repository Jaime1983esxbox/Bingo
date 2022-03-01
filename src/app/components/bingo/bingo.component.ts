import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/models/jugador';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})
export class BingoComponent implements OnInit {

  numeros: number[] = [];
  jugadores: Jugador[] = [];
  jugador: Jugador = new Jugador();
  jugadorGanador!: Jugador;
  jugadorGanadorLinea!: Jugador;
  numeroJugadores: number = 0;
  numeroActual: number = 0;
  numerosBingo: number[] = [];
  numerosLinea1: number[] = [];
  numerosLinea2: number[] = [];
  numerosLinea3: number[] = [];
  filtered: number[] = [];
  numeroAcertado: boolean = false;
  mostrarBotonInicio: boolean = true;
  mostrarCartones: boolean = false;
  mostrarNumeros: boolean = false;
  mostrarBotonComenzar: boolean = false;
  mostrarBotonNumero: boolean = false;
  mostrarBotonNuevaPartida: boolean = false;
  mostrarGanadorLinea: boolean = false;
  mostrarGanadorBingo: boolean = false;

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 90; i++) {
      this.numeros.push(i);
    }
  }

  getRandomCarton() {
    return Math.floor((Math.random() * (90 - 1 + 1)) + 1);
  } 

  random() {
    return Math.floor(Math.random() * this.numeros.length);
  }

  agregarJugadores(){
    this.mostrarBotonInicio = false;
    this.mostrarCartones = true;
    this.mostrarBotonComenzar = true;
    for (let i = 0; i < this.numeroJugadores; i++) {
      this.jugador = new Jugador();
      this.jugador.nombre = 'Jugador' + i;
      this.jugador.carton = []; 
      while(this.jugador.carton.length < 15){
        let numeroCarton = this.getRandomCarton();
        if(!this.jugador.carton.includes(numeroCarton)){
          this.jugador.carton.push(numeroCarton);
          this.jugador.carton.sort(function(a, b){return a - b});
        }
      }
      this.jugadores.push(this.jugador);  
    }
  }

  comenzarBingo(){
    this.mostrarNumeros = true;
    this.mostrarBotonComenzar = false;
    this.mostrarBotonNumero = true;
    if(this.numerosBingo.length < 90) {
      let indiceAleatorioArrayNumero = Math.floor(Math.random()*this.numeros.length);
      this.numeroActual = this.numeros[indiceAleatorioArrayNumero];
      this.numerosBingo.push(this.numeroActual);
      const index: number = this.numeros.indexOf(this.numeroActual);
      if (index !== -1) {
        this.numeros.splice(index, 1);
      }
      for (let i = 0; i < this.jugadores.length; i++) {
        this.comprobarLinea(this.jugadores[i]);
        let filtered = this.jugadores[i].carton.filter((number) =>{
          if(!this.numerosBingo.includes(number)){
            return true;
          }else{
            return false;
          }
        }) 
        if(filtered.length == 0){
          this.mostrarGanadorBingo = true;
          this.jugadorGanador = new Jugador();
          this.jugadorGanador.nombre = this.jugadores[i].nombre;
          this.mostrarBotonNumero = false;
          this.mostrarBotonNuevaPartida = true;
          break;
        }
      }
    }  
  }

  comprobarLinea(jugador: Jugador){
    let numerosCarton = jugador.carton;
    for (let j = 0; j < numerosCarton.length; j++) {
      if(j >= 0 && j < 5){
        this.numerosLinea1.push(numerosCarton[j]);
      }else if(j >= 5 && j < 10){
        this.numerosLinea2.push(numerosCarton[j]);
      }else if(j >= 10 && j < 15){
        this.numerosLinea3.push(numerosCarton[j]);
      }
    }
    this.filtered = this.numerosLinea1.filter((number) =>{
      if(!this.numerosBingo.includes(number)){
        return true;
      }else{
        return false;
      }
    })
    if(this.filtered.length == 0 && this.mostrarGanadorLinea == false){
      this.mostrarGanadorLinea = true;
      this.jugadorGanadorLinea = new Jugador();
      this.jugadorGanadorLinea.nombre = jugador.nombre;
      this.jugadorGanadorLinea.carton = this.numerosLinea1;
    }
    this.filtered = this.numerosLinea2.filter((number) =>{
      if(!this.numerosBingo.includes(number)){
        return true;
      }else{
        return false;
      }
    })
    if(this.filtered.length == 0 && this.mostrarGanadorLinea == false){
      this.mostrarGanadorLinea = true;
      this.jugadorGanadorLinea = new Jugador();
      this.jugadorGanadorLinea.nombre = jugador.nombre;
      this.jugadorGanadorLinea.carton = this.numerosLinea2;
    }
    this.filtered = this.numerosLinea3.filter((number) =>{
      if(!this.numerosBingo.includes(number)){
        return true;
      }else{
        return false;
      }
    })
    if(this.filtered.length == 0 && this.mostrarGanadorLinea == false){
      this.mostrarGanadorLinea = true;
      this.jugadorGanadorLinea = new Jugador();
      this.jugadorGanadorLinea.nombre = jugador.nombre;
      this.jugadorGanadorLinea.carton = this.numerosLinea3;
    }
    this.numerosLinea1 = [];
    this.numerosLinea2 = [];
    this.numerosLinea3 = [];
  }

  comprobarNumero(numero: number) {
    if(this.numerosBingo.includes(numero)){
      return true; 
    }else{
      return false;
    }
  }

  nuevaPartida(){
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
  }

}
