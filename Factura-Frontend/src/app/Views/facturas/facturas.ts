import { Component } from '@angular/core';
import { IFactura } from '../../Interfaces/ifactura';
import { SFacturas } from '../../Services/sfacturas';

@Component({
  selector: 'app-facturas',
  imports: [],
  templateUrl: './facturas.html',
  styleUrl: './facturas.css'
})
export class Facturas {

   lista_facturas$!: IFactura[];

  constructor(private SFacturas: SFacturas) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.SFacturas.todos().subscribe((facturas) => {
      this.lista_facturas$ = facturas;
      console.log(this.lista_facturas$)
    });
  }

  imprimir() {
    const html = document.querySelector('.factura-container')?.innerHTML;
    const ventana = window.open('', '', 'height=600, width=900');
    ventana?.document.open();
    ventana?.document.write(
      `<!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Nuevo</title>
          <base href="/">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" type="image/x-icon" href="favicon.ico">
          <style>
        @media print{
          button{
            display: none;
          }
        }
        @page{
          size: A4 portrait;
          margin: 12mm
        }
          </style>
        </head>
        <body onload="window.print(); window.close();">
        ${html}        
        </body>
        </html>`
    );
 
  }

}
