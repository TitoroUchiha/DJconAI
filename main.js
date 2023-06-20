var manoIzquierdax = 0;
var manoIzquierday = 0;
var manoDerechax = 0;
var manoDerechay = 0;
var manoDerechaPuntos = 0;
var manoIzquierdaPuntos = 0;
var valocidad = 1;
var volumen = 1;
var cancion = "";
function preload(){
  cancion = loadSound("Dragon Ball Super Opening 2 (copy).mp3");
}
function setup(){
  canvas = createCanvas(400,400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(400, 400);
  modelo = ml5.poseNet(video, modeloListo);
  modelo.on("pose", usarResultados);
}
function draw(){
  image(video, 0, 0, 400, 400);
  if(manoIzquierdaPuntos > 0.2){
    fill("blue");
    circle(manoIzquierdax, manoIzquierday, 20);
    volumen = (manoIzquierday * 2) / 400;
    volumen = 2 - volumen;
    volumen = Math.round(volumen * 10)/10;
    cancion.setVolume(volumen);
    document.getElementById("volumen").innerHTML = "Volumen " + volumen;
  }
  if(manoDerechaPuntos > 0.2){
    fill("red");
    circle(manoDerechax, manoDerechay, 20);
    if(manoDerechay < 100){
      velocidad = 3;
    }else if(manoDerechay < 200){
      velocidad = 2;
    }else if(manoDerechay < 300){
      velocidad = 1;
    }else if(manoDerechay < 400){
      velocidad = 0.5;
    }
    cancion.rate(velocidad);
    document.getElementById("velocidad").innerHTML = "Velocidad" + velocidad;
  }
}
function reproducir(){
  if(!cancion.isPlaying()){
  cancion.play();  
  cancion.setVolume(2)
  cancion.rate(1)
  }
}
function detener(){
  cancion.stop();
}
function modeloListo(){
  console.log("ya esta listo poseNet");
}

function usarResultados(resultados){
  if(resultados.length > 0){
    console.log(resultados);
    manoIzquierdax = resultados[0].pose.leftWrist.x;
    manoIzquierday = resultados[0].pose.leftWrist.y;

    manoDerechax = resultados[0].pose.rightWrist.x;
    manoDerechay = resultados[0].pose.rightWrist.y;

    manoIzquierdaPuntos = resultados[0].pose.keypoints[9].score;
    manoDerechaPuntos = resultados[0].pose.keypoints[10].score;
  }
}