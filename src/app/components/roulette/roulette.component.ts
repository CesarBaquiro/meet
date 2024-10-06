import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private slices: string[] = [ 'DESCUENTO', 'RETO', 'DULCE', 'SEGUIRNOS'];
  private colors: string[] = ['#8889A2', '#DBDBE2', '#8889A2', '#DBDBE2'];
  private startAngle = 0;
  private spinAngle = 0;
  private spinTimeout: any;

  ngOnInit() {
    this.canvas = document.getElementById('rouletteCanvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.drawRoulette();
      this.drawPointer();  // Llamamos a la función que dibuja el puntero
    }
  }

  drawRoulette() {
    if (!this.ctx) return;
  
    const radius = this.canvas!.width / 2;
    const arcSize = (2 * Math.PI) / this.slices.length;
  
    // Colores predefinidos para los textos de los segmentos
    const textColors = ['#DBDBE2', '#8889A2', '#DBDBE2', '#8889A2', '#E74C3C'];  // Puedes agregar más colores si tienes más segmentos
  
    this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
  
    this.slices.forEach((slice, i) => {
      const angle = this.startAngle + i * arcSize;
      
      // Dibuja los segmentos de la ruleta
      this.ctx.beginPath();
      this.ctx.moveTo(radius, radius);
      this.ctx.arc(radius, radius, radius, angle, angle + arcSize);
      this.ctx.fillStyle = this.colors[i % this.colors.length];
      this.ctx.fill();
  
      // Cambia el color del borde a #244E6B
      this.ctx.strokeStyle = '#244E6B';  // Color del borde
      this.ctx.stroke();
  
      // Dibuja el texto en el centro de cada segmento sin rotación
      this.ctx.save();
      this.ctx.translate(radius, radius);  // Mueve el contexto al centro de la ruleta
      
      // Posiciona el texto en el borde externo del segmento
      const textX = Math.cos(angle + arcSize / 2) * (radius * 0.65);  // Posición en el eje X
      const textY = Math.sin(angle + arcSize / 2) * (radius * 0.65);  // Posición en el eje Y
  
      // Asigna un color específico al texto de cada segmento
      this.ctx.fillStyle = textColors[i % textColors.length];  // Cicla entre los colores definidos
      this.ctx.font = 'bold 16px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(slice, textX, textY);  // Texto siempre horizontal
      
      this.ctx.restore();
    });
  
    this.drawPointer();  // Llamamos al puntero
  }
  

  

  drawPointer() {
    if (!this.ctx) return;
  
    const radius = this.canvas!.width / 2;
    
    this.ctx.beginPath();
    
    // Ajustamos la posición de la flecha 5px por encima de la ruleta
    this.ctx.moveTo(radius - 10, -5);   // Puntos laterales de la flecha
    this.ctx.lineTo(radius + 10, -5);   // Puntos laterales de la flecha
    this.ctx.lineTo(radius, 25);        // Punto inferior de la flecha (5px por encima del borde superior)
    
    this.ctx.closePath();
    this.ctx.fillStyle = '#d72d21';  // Color de la flecha
    this.ctx.fill();
  }

  spin() {
    if (this.spinTimeout) {
      clearTimeout(this.spinTimeout);
    }
    this.spinAngle = Math.random() * 10 + 10;  // Set random spin speed
    this.animateSpin();
  }

  animateSpin() {
    this.startAngle += this.spinAngle;
    this.spinAngle *= 0.98;  // Gradually slow down
    this.drawRoulette();

    if (this.spinAngle > 0.1) {
      this.spinTimeout = setTimeout(() => this.animateSpin(), 12);
    }
  }
}
