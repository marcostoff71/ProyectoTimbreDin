#include <Arduino.h>
#include <LedLib.h>
void ledLibClass::begin()const{
    if(pinLed){
        pinMode(pinLed,OUTPUT);
    }
}

void ledLibClass::prender(){
    digitalWrite(this->pinLed,HIGH);
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
}
void ledLibClass::parar(){
    this->tiempoIni=0;
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
            
            digitalWrite(pinLed,HIGH);

        }else{

            digitalWrite(pinLed,LOW);
        }
    }
    else{
        tiempoIni=0;
        digitalWrite(pinLed,LOW);
    }

    
}