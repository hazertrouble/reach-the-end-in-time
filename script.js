var n;
var max;
var lineas = [];
var mov = 0;
var respuesta = "NO";

function insertarN(){
  do{
    n = parseInt( prompt("N de strings a ingresar ( solo numeros enteros )") );
  }while(isNaN(n));
  document.getElementById('n').innerHTML = "Numero de lineas : "+n;
}

function insertarMax(){
  do{
    max = parseInt( prompt("Maximo de movimientos ( solo numeros enteros )") );
  }while(isNaN(max));
  document.getElementById('max').innerHTML = "Numero de movimientos : "+max;
}

function insertarLineas(){
  for (let i=0; i<n; i++) {
    let c = generarCadena(i)
    lineas.push(c);
  }
  //console.log(lineas);
}

function generarCadena(i){
  let linea = []
  let text = "";
  for (let j=0; j<n; j++) {
    let x = "";
    if( (Math.floor(Math.random() * 10) < 4) && (i+j)!=0 )x="#";
    else x=". ";
    linea.push(x);
    text+=x;
  }
  document.getElementById('strings').innerHTML += text+"</br>";
  return linea;
}

/// Funciones para el calcular la cantidad de movimientos necesarios
function calcularMovimientos(){
  try{
    if(movimientoRecursivo(0,0));
  }catch(err){
    respuesta = "Error";
  }//*/
  
  document.getElementById('output').innerHTML = "¿Es posible el recorrido? : "+respuesta;
}

// Funcion recursiva para analizar el siguiente movimiento
function movimientoRecursivo(i, j){
  if(meta(i,j)){
    respuesta="YES";
    return;
  }

  // se muestra en consola la posicion actual y los movimientos realizados
  console.log("["+i+"]["+j+"] : "+mov);

  // Verificar Derecha
  console.log("derecha");
  if(verificarPosicion(i, (j+1) )){
    mov++;
    movimientoRecursivo(i, (j+1) );
  }

  console.log("abajo");
  // Verificar Abajo
  if(verificarPosicion((i+1), j)){
    mov++;
    movimientoRecursivo((i+1), j);
  }

  // si no es posible recorrerse a ningun lado es porque hay un bloqueo.
  console.log("bloqueo");
  return;
}

// Verifica que la posicion se encuentre dentro de los limites
// y devuelve true si la posicion es un '.'
function verificarPosicion(y,x){
  if(y<0 || y>(n-1) || x<0 || x>(n-1) ) return false;
  
  console.log(lineas[y][x]);
  if(lineas[y][x] == ". ") return true;
  else return false;
}

// Verificamos si la posicion concuerda con la meta
// y si aun no pasa de los movimientos requeridos.
function meta(i,j){
  if(i==(n-1) && j==(n-1) && mov<max )return true;
}


////// Funcion principal que inicializa todo el programa.  //////
function comenzar(){
  document.getElementById('strings').innerHTML = "";
  lineas = [];
  mov = 0;
  respuesta = "NO";
  insertarN();
  insertarLineas();
  insertarMax();
  calcularMovimientos();
}