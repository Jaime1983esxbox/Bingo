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
  numeroJugadores: number = 0;
  numeroActual: number = 0;
  numerosBingo: number[] = [];
  numeroAcertado: boolean = false;
  mostrarBotonInicio: boolean = true;
  mostrarCartones: boolean = false;
  mostrarNumeros: boolean = false;
  mostrarBotonComenzar: boolean = false;
  mostrarBotonNumero: boolean = false;
  mostrarBotonNuevaPartida: boolean = false;
  mostrarGanador: boolean = false;

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
        let filtered = this.jugadores[i].carton.filter((number) =>{
          if(!this.numerosBingo.includes(number)){
            return true;
          }else{
            return false;
          }
        }) 
        if(filtered.length == 0){
          this.mostrarGanador = true;
          this.jugadorGanador = new Jugador();
          this.jugadorGanador.nombre = this.jugadores[i].nombre;
          this.mostrarBotonNumero = false;
          this.mostrarBotonNuevaPartida = true;
          break;
        }
      }
    }  
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
    this.numeros = [];
    this.jugadores = [];
    this.mostrarBotonInicio = true;
    this.mostrarGanador = false;
    this.mostrarNumeros = false;
    this.mostrarBotonNuevaPartida = false;
    this.ngOnInit();
  }

}
