#include <Arduino.h>
#include <LedLib.h>
void ledLibClass::begin()const{
    if(pinLed){
        pinMode(pinLed,OUTPUT);
    }
}

void ledLibClass::prender(){
    digitalWrite(this->pinLed,tipo==Anodo?HIGH:LOW);
}

void ledLibClass::prender(ulong tiempo,ulong tiempoEn, ulong tiempoApa,uint veces){
    this->tiempoIni=millis();
    this->tiempoPrendido=tiempoEn;
    this->tiempoApagado=tiempoApa;
    this->veces=veces;

}
ledLibClass::ledLibClass(){
    this->pinLed=0;
    this->tiempoIni=0;
    this->tipo=Anodo;
}
void ledLibClass::parar(){
    this->tiempoIni=0;
    digitalWrite(pinLed,tipo==Anodo?LOW:HIGH);
}
void ledLibClass::loop(){
    
    if(tiempoIni==0)return;

    u_long tiempoActual=millis();

    u_long tiempoTranscurrido=tiempoActual-tiempoIni;
    u_long tiempoCiclo=tiempoPrendido+tiempoApagado;
    u_long tiempoTotal=tiempoCiclo*veces;

    u_long tiempoSecuencia=tiempoTranscurrido%tiempoTotal;

    if(tiempoTranscurrido<tiempoTotal){
        
        if(tiempoSecuencia%tiempoCiclo<tiempoPrendido){
            
            digitalWrite(pinLed,tipo==Anodo?HIGH:LOW);

        }else{

            digitalWrite(pinLed,tipo==Anodo?LOW:HIGH);
        }
    }
    else{
        tiempoIni=0;
        digitalWrite(pinLed,tipo==Anodo?LOW:HIGH);
    }

    
}