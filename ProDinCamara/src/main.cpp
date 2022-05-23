#include <Arduino.h>
#include <SocketIOclient.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <LedLib.h>
#include "esp_camera.h"
#include "config.h"
#include "configCam.h"
#include "base64.h"

SocketIOclient socketIO;
ledLibClass ledPlaca;

void sendPhotoSocketIO(String &fotoB64, String estado)
{
  DynamicJsonDocument doc(15000);
  JsonArray array = doc.to<JsonArray>();

  // add event name
  // Hint: socket.on('event_name', ....
  array.add("image");

  // add payload (parameters) for the event
  JsonObject param1 = array.createNestedObject();
  param1["estado"] = estado;
  param1["img"] = fotoB64;

  // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  // Send event
  socketIO.sendEVENT(output);
}
void takePhoto(String estado)
{
  camera_fb_t *foto = esp_camera_fb_get();

  if (foto)
  {

    String str = base64_encode(foto->buf, foto->len);
    sendPhotoSocketIO(str, estado);
  }
  else
  {
    Serial.println("Erro al tomar foto");
  }

  Serial.println(foto == NULL ? "NULL" : "No null");
  esp_camera_fb_return(foto);
}

void verificarEvento(uint8_t *payload, size_t &len)
{

  if (payload)
  {
    String datos((char *)(payload));

    // allocate the memory for the document
    StaticJsonDocument<300> doc;

    // parse a JSON array
    deserializeJson(doc, datos);

    // extract the values
    JsonArray array = doc.as<JsonArray>();
    
    String evento=array[0].as<String>();

    if(evento=="envTomarF"){
      takePhoto("PC");
    }
  }
}

void hexdump(const void *mem, uint32_t len, uint8_t cols = 16)
{
  const uint8_t *src = (const uint8_t *)mem;
  Serial.printf("\n[HEXDUMP] Address: 0x%08X len: 0x%X (%d)", (ptrdiff_t)src, len, len);
  for (uint32_t i = 0; i < len; i++)
  {
    if (i % cols == 0)
    {
      Serial.printf("\n[0x%08X] 0x%08X: ", (ptrdiff_t)src, i);
    }
    Serial.printf("%02X ", *src);
    src++;
  }
  Serial.printf("\n");
}

void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{

  switch (type)
  {
  case sIOtype_DISCONNECT:
    ledPlaca.prender(0,100,100,1000);
    Serial.printf("[IOc] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    Serial.printf("[IOc] Connected to url: %s\n", payload);
    
    
    socketIO.send(sIOtype_CONNECT, "/");
    ledPlaca.parar();
    ledPlaca.prender();
    break;
  case sIOtype_EVENT:
    Serial.printf("[IOc] get event: %s\n", payload);
    verificarEvento(payload, length);
    break;
  case sIOtype_ACK:
    Serial.printf("[IOc] get ack: %u\n", length);
    hexdump(payload, length);
    break;
  case sIOtype_ERROR:
    Serial.printf("[IOc] get error: %u\n", length);
    hexdump(payload, length);
    break;
  case sIOtype_BINARY_EVENT:
    Serial.printf("[IOc] get binary: %u\n", length);
    hexdump(payload, length);
    break;
  case sIOtype_BINARY_ACK:
    Serial.printf("[IOc] get binary ack: %u\n", length);
    hexdump(payload, length);
    break;
  }
}

void setupLed(){
  ledPlaca.setTipoLed(Catodo);
  ledPlaca.setPin(pinLedInternal);
  ledPlaca.begin();
}
bool setupCam()
{
  esp_err_t err = esp_camera_init(&configCamera);

  if (err == ESP_OK)
  {
    return true;
  }

  return false;
}
void setupWiFI()
{

  WiFi.begin(ssid, password);
  ledPlaca.prender(0,100,100,10000);
  while (WiFi.status() != WL_CONNECTED)
  {
    ledPlaca.loop();
  }
  ledPlaca.parar();
  ledPlaca.prender();
  IPAddress addres = WiFi.localIP();
  Serial.print("Conectado con la ip: " + addres.toString());
}
void setupSocketIO()
{

  socketIO.begin(hostServerSk, portServerSk, "/socket.io/?EIO=4");
  socketIO.onEvent(socketIOEvent);
}

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(9600);
  setupLed();
  if (!setupCam())
  {
    Serial.println("Error al iniciar la camara");
    ESP.restart();
    return;
  }
  setupWiFI();
  setupSocketIO();
  configPines();
}

void loop()
{
  socketIO.loop();
  ledPlaca.loop();
  
  if(digitalRead(pinBtn)==HIGH and socketIO.isConnected()){
    takePhoto("BTN");
    while(digitalRead(pinBtn)==HIGH){}
  }
}