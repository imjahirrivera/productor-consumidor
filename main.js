var buffer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var eleccion = true;
//Eleccion = true : Es turno del productor
//Eleccion = false: Es turno del consumidor

var productor = {
    produce: 0,
    index: 0
};

var consumidor = {
    consume: 0,
    index: 0
};

final_productor = false;
final_consumidor = false;
bufferFull = false;

if(eleccion)
{
    comenzar();
}

function comenzar(){
    if(eleccion == true){
        var numeroAleatorio = Math.floor(Math.random() * 4) + 4;
        //var numeroAleatorio = 2;
        productor.produce = numeroAleatorio; //Se le asigna la cantidad de producciones que hará
        console.log("Productor: "+numeroAleatorio);
        intervalId = setInterval(function() {
            funcionProductor(numeroAleatorio);
        }, 1000);
    }
    else{
        var numeroAleatorio = Math.floor(Math.random() * 4) + 4;
        //var numeroAleatorio = 7;
        consumidor.consume = numeroAleatorio; //Se le asigna la cantidad que consumira
        console.log("Consumidor: "+numeroAleatorio);
        intervalId = setInterval(function() {
            funcionConsumidor(numeroAleatorio);
        }, 1000);
    }
}

var contador = 0;

function funcionProductor(tiempo){
    console.log(contador+1);

    //Escribimos la accion que se ejecutara
    document.getElementById('titulo').innerHTML = "El productor producirá " + tiempo + " elementos.";
    document.getElementById('progreso').innerHTML = 0 + " de " + tiempo + " elementos.";

    //Revisamos espacio en el buffer
    if(buffer[productor.index] == 0){
        //Escribimos el status del productor (trabajando)
        let statusProductor = document.getElementById('status-productor');
        statusProductor.innerHTML = "Trabajando"
        statusProductor.style.backgroundColor = "#6AFF60";

        //Escribimos el status del consumidor (dormido)
        let statusConsumidor = document.getElementById('status-consumidor');
        statusConsumidor.innerHTML = "Dormido"
        statusConsumidor.style.backgroundColor = "#D20000";

        //Escribimos el progreso
        document.getElementById('progreso').innerHTML = (contador+1) + " de " + tiempo + " elementos.";

        //Asignamos 1 al espacio en el buffer
        buffer[productor.index] = 1;
        //Ponemos de color azul el espacio que produce
        let casilla_prod = document.getElementById('arriba-'+(productor.index+1));
        let img = document.createElement('img');
        img.src = 'hamburguesa.png';
        img.width = 50;
        img.height = 50;
        casilla_prod.appendChild(img);
        casilla_prod.style.backgroundColor = "#60F8FF"; //Color azul

        //Borramos el caracter anterior
        if(productor.index!=0){
            let casilla = document.getElementById('abajo-'+productor.index);
            casilla.innerHTML = "";
            casilla.style.backgroundColor = "#fff";
        }
        if(final_productor){
            let casilla1 = document.getElementById('abajo-20');
            casilla1.style.backgroundColor = "#fff";
            casilla1.innerHTML = '';
            final_productor = false;
        }
        //Movemos el caracter del productor
        let casilla1 = document.getElementById('abajo-'+(productor.index+1));
        casilla1.style.backgroundColor = "#6AFF60"; // Color verde
        casilla1.innerHTML = 'P<sup>↑</sup>';

        //Incrementamos el indice del productor y regresamos el indice en caso de llegar al final del buffer
        productor.index++;
        if(productor.index == 20){
            productor.index = 0;
            if(!(contador+1 == tiempo)){
                if(buffer[productor.index] == 1){

                }else{
                    let contador_secundario = 0;
                    intervalId2 = setInterval(function() {
                        let casilla1 = document.getElementById('abajo-20');
                        casilla1.style.backgroundColor = "#fff";
                        casilla1.innerHTML = '';
                        contador_secundario++;
                        if(contador_secundario == 1){
                            clearInterval(intervalId2);
                        }
                    }, 1000);
                }
            }
            else{
                final_productor = true;
            }
        }
    }else{
        console.log("Ya no hay espacio en el buffer");
        document.getElementById('progreso').innerHTML = "No hay espacio en el buffer para producir.";

        contador = tiempo-1;
        bufferFull = true;
    }

    //Incrementamos el contador y condicional para terminar el tiempo
    contador++;
    if(contador == tiempo){
        if(productor.index == 0){
            let casilla1 = document.getElementById('abajo-20');
            casilla1.style.backgroundColor = "#D20000";
        }else{
            let casilla1 = document.getElementById('abajo-'+(productor.index));
            casilla1.style.backgroundColor = "#D20000";
        }

        if(bufferFull){
            //Escribimos el status del productor (intentando entrar)
            let statusProductor = document.getElementById('status-productor');
            statusProductor.innerHTML = "Intentando entrar..."
            statusProductor.style.backgroundColor = "#FF8142";
            bufferFull = false
        }
        else{
            //Escribimos el status del productor (dormido)
            let statusProductor = document.getElementById('status-productor');
            statusProductor.innerHTML = "Dormido"
            statusProductor.style.backgroundColor = "#D20000";
        }

        contador = 0;
        clearInterval(intervalId);
        eleccionAzar();
    }
}

function funcionConsumidor(tiempo){
    console.log(contador+1);

    //Escribimos la accion que se ejecutara
    document.getElementById('titulo').innerHTML = "El consumidor comerá " + tiempo + " elementos.";
    document.getElementById('progreso').innerHTML = 0 + " de " + tiempo + " elementos.";

    //Revisamos espacio en el buffer
    if(buffer[consumidor.index] == 1){
        //Escribimos el status del consumidor (trabajando)
        let statusConsumidor = document.getElementById('status-consumidor');
        statusConsumidor.innerHTML = "Trabajando"
        statusConsumidor.style.backgroundColor = "#6AFF60";

        //Escribimos el status del productor (dormido)
        let statusProductor = document.getElementById('status-productor');
        statusProductor.innerHTML = "Dormido"
        statusProductor.style.backgroundColor = "#D20000";

        //Escribimos el progreso
        document.getElementById('progreso').innerHTML = (contador+1) + " de " + tiempo + " elementos.";

        //Asignamos 0 al espacio en el buffer
        buffer[consumidor.index] = 0;

        //Ponemos de color gris el espacio que come
        let casilla_prod = document.getElementById('arriba-'+(consumidor.index+1));
        let img = casilla_prod.querySelector('img');
        img.remove();
        casilla_prod.style.backgroundColor = "#B0B0B0";

        //Borramos el caracter anterior
        if(consumidor.index!=0){
            let casilla = document.getElementById('jeje-'+consumidor.index);
            casilla.innerHTML = "";
            casilla.style.backgroundColor = "#fff";
        }
        if(final_consumidor){
            let casilla1 = document.getElementById('jeje-20');
            casilla1.style.backgroundColor = "#fff";
            casilla1.innerHTML = '';
            final_consumidor = false;
        }
        //Movemos el caracter del consumidor
        let casilla1 = document.getElementById('jeje-'+(consumidor.index+1));
        casilla1.style.backgroundColor = "#6AFF60";
        casilla1.innerHTML = 'C<sup>↓</sup>';

        //Incrementamos el indice del consumidor y regresamos el indice en caso de llegar al final del buffer
        consumidor.index++;
        if(consumidor.index == 20){
            consumidor.index = 0;
            if(!(contador+1 == tiempo)){
                if(buffer[consumidor.index] == 0){

                }
                else{
                    let contador_secundario = 0;
                    intervalId2 = setInterval(function() {
                        let casilla1 = document.getElementById('jeje-20');
                        casilla1.innerHTML = '';
                        casilla1.style.backgroundColor = "#fff";
                        contador_secundario++;
                        if(contador_secundario == 1){
                            clearInterval(intervalId2);
                        }
                    }, 1000);
                }
            }
            else{
                final_consumidor = true;
            }
        }
    }else{
        console.log("Ya no hay espacio en el buffer");
        document.getElementById('progreso').innerHTML = "No hay elementos que comer.";
        contador = tiempo-1;
        bufferFull = true;
    }

    //Incrementamos el contador y condicional para terminar el tiempo
    contador++;
    if(contador == tiempo){
        if(consumidor.index == 0){
            let casilla1 = document.getElementById('jeje-20');
            casilla1.style.backgroundColor = "#D20000";
        }else{
            let casilla1 = document.getElementById('jeje-'+(consumidor.index));
            casilla1.style.backgroundColor = "#D20000";
        }

        if(bufferFull){
            //Escribimos el status del productor (intentando entrar)
            let statusConsumidor = document.getElementById('status-consumidor');
            statusConsumidor.innerHTML = "Intentando entrar..."
            statusConsumidor.style.backgroundColor = "#FF8142";
            bufferFull = false
        }
        else{
            //Escribimos el status del productor (dormido)
            let statusConsumidor = document.getElementById('status-consumidor');
            statusConsumidor.innerHTML = "Dormido"
            statusConsumidor.style.backgroundColor = "#D20000";
        }

        contador = 0;
        clearInterval(intervalId);
        eleccionAzar();
    }
}

function eleccionAzar(){
    eleccion = Math.random() < 0.5;
    //eleccion = !eleccion;
    //eleccion = true;
    console.log(eleccion);
    comenzar();
}


document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      // Detener el setInterval al presionar "Esc"
      clearInterval(intervalId);
      console.log("setInterval detenido");
    }
});
