
#ifndef _LEDLIB_H
#define _LEDLIB_H

#include <Arduino.h>

class ledLibClass
{
private:
    u_long tiempoIni;
    u_long tiempoPrendido;
    u_long tiempoApagado;
    uint veces;
    uint8_t pinLed;

public:
    void inline setPin(uint8_t pinLed)
    {
        this->pinLed = pinLed;
    }
    void begin() const;
    void parar();
    void prender();
    void prender(ulong,ulong,ulong,uint);
    void loop();
    ledLibClass();
};

#endif