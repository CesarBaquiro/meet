import { Component } from '@angular/core';

@Component({
  selector: 'app-roulette-prohibited',
  templateUrl: './roulette-prohibited.component.html',
  styleUrls: ['./roulette-prohibited.component.css']
})
export class RouletteProhibitedComponent {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private slices: string[] = [ 'SÍRVALOS',  'AGUA', 'LOS PROHIBIDOS', 'SIRVE EL DE LA RULETA', 'SÍRVALOS X2', 'AGUA'];
  private colors: string[] = ['#DBDBE2', '#DBDBE2', '#A901DB', '#DBDBE2', '#DBDBE2', 'DBDBE2', '#DBDBE2'];
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
    const textColors = ['#000000', '#000000', '#FFFFFF', '#000000', '#E74C3C', '#000000'];
  
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
      this.ctx.strokeStyle = '#000000';
      this.ctx.stroke();
  
      // Dibuja el texto en el centro de cada segmento sin rotación
      this.ctx.save();
      this.ctx.translate(radius, radius); // Mueve el contexto al centro de la ruleta
  
      // Posiciona el texto en el borde externo del segmento
      const textX = Math.cos(angle + arcSize / 2) * (radius * 0.68); // Ajusta la posición en el eje X
      const textY = Math.sin(angle + arcSize / 2) * (radius * 0.70); // Ajusta la posición en el eje Y
  
      // Configuración del texto
      this.ctx.fillStyle = textColors[i % textColors.length];
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
  
      // Tamaño inicial de la fuente
      let fontSize = radius * 0.08;
      this.ctx.font = `bold ${fontSize}px Arial`;
  
      // Dividir texto en líneas si es necesario
      const maxTextWidth = radius * 0.5; // Ancho máximo permitido para el texto
      const words = slice.split(' '); // Divide el texto en palabras
      let lines: string[] = [];
      let currentLine = '';
  
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = this.ctx.measureText(testLine).width;
  
        if (testWidth > maxTextWidth && currentLine) {
          lines.push(currentLine); // Agrega la línea actual
          currentLine = word; // Nueva línea
        } else {
          currentLine = testLine; // Continua en la misma línea
        }
      }
      lines.push(currentLine); // Agrega la última línea
  
      // Ajusta el tamaño de la fuente si hay demasiadas líneas
      while (lines.length > 2) { // Máximo 2 líneas para evitar saturación
        fontSize *= 0.9; // Reduce el tamaño de la fuente
        this.ctx.font = `bold ${fontSize}px Arial`;
        lines = []; // Recalcula las líneas
        currentLine = '';
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = this.ctx.measureText(testLine).width;
  
          if (testWidth > maxTextWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);
      }
  
      // Dibuja las líneas de texto
      lines.forEach((line, index) => {
        const lineHeight = fontSize + 2; // Espaciado entre líneas
        this.ctx.fillText(line, textX, textY - ((lines.length - 1) / 2 * lineHeight) + index * lineHeight);
      });
  
      this.ctx.restore();
    });
  
    this.drawPointer(); // Llamamos al puntero
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
    this.ctx.fillStyle = '#E74C3C';  // Color de la flecha
    this.ctx.fill();
  }

  spin() {
    if (this.spinTimeout) {
      clearTimeout(this.spinTimeout);
    }
    this.spinAngle = Math.random() *  8;  // Set random spin speed
    this.animateSpin();
  }

  animateSpin() {
    this.startAngle += this.spinAngle;
    this.spinAngle *= 0.97;  // Gradually slow down
    this.drawRoulette();

    if (this.spinAngle > 0.1) {
      this.spinTimeout = setTimeout(() => this.animateSpin(), 12);
    }
  }
}
