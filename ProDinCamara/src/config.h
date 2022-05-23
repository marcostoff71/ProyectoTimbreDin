#include <SocketIOclient.h>
#include <Arduino.h>
#define pinsCamera_H
#ifdef pinsCamera_H

// const char *ssid = "TP-Link_8BB6";
// const char *password = "71904382";
const char *ssid = "Redmi 9";
const char *password = "1234567890";

// const String hostServerSk = "192.168.0.102";
 const String hostServerSk = "192.168.54.252";
const uint16_t portServerSk = 3000;

// pines
uint8_t pinBtn = 2;
uint8_t pinFlash = 4;
uint8_t pinLedInternal = 33;

void configPines()
{
  pinMode(pinBtn,INPUT_PULLDOWN);
}

#endif