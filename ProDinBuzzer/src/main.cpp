#include <Arduino.h>
#include <EasyBuzzer.h>
#include <ArduinoJson.h>
#include <LedLib.h>
#include <WiFi.h>
#include <SocketIOclient.h>
#include "config.h"


ledLibClass ledLib;
SocketIOclient socketIO;
void setupWiFi(){
  WiFi.begin(SSID,PASSWORD);

  ledLib.prender(1000,100,100,10000);
  while(WiFi.status()!=WL_CONNECTED){
    ledLib.loop();
  }
  ledLib.parar();
  ledLib.prender();

}
void verificaEvento(uint8_t *payload,size_t length){
  if(payload){
    String strEv((char*)payload);

    StaticJsonDocument<1000> json;

    deserializeJson(json,strEv);
    
    JsonArray jsonArr=json.as<JsonArray>();

    if(jsonArr[0].as<String>()== "sonar"){
      EasyBuzzer.beep(
        1000,
        1000,
        1000,
        3,
        100,
        1
      );
    }
  }
}
void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length){
  switch(type){
    case socketIOmessageType_t::sIOtype_ACK:
    break;
    case socketIOmessageType_t::sIOtype_BINARY_ACK:
    break;
    case socketIOmessageType_t::sIOtype_BINARY_EVENT:
    break;
    case socketIOmessageType_t::sIOtype_CONNECT:
        // Serial.printf("[IO] Conectado %s ",payload);
        ledLib.parar();
        ledLib.prender();
        socketIO.send(socketIOmessageType_t::sIOtype_CONNECT,"/");
    break;
    case socketIOmessageType_t::sIOtype_DISCONNECT:
        ledLib.prender(0,100,100,10000);
    break;
    case socketIOmessageType_t::sIOtype_ERROR:
    break;
    case socketIOmessageType_t::sIOtype_EVENT:
      verificaEvento(payload,length);
    break;
    
    default:

    break;
  }
}
void setupSocket(){
  socketIO.begin(HOST,PORT,"/socket.io/?EIO=4");
  socketIO.onEvent(socketIOEvent);
}

void setup()
{
  ledLib.setPin(LED);
  EasyBuzzer.setPin(PINBUZZER);
  // put your setup code here, to run once:
  Serial.begin(9600);
  ledLib.begin();
  

  setupWiFi();
  setupSocket();
}

void loop()
{
  EasyBuzzer.update();
  ledLib.loop();
  socketIO.loop();
}