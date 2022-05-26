import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string= '', columna:string = 'title'): any[] {

    if(texto === ''){
      return arreglo;
    }

    if(!arreglo){
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();



    console.log(arreglo);
    

    return arreglo.filter( 
      item => item[columna].toLocaleLowerCase().includes(texto)
     );
  }

}
