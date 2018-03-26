---
layout: post
title: Günstige Wifi-Steckdose von OBI als Alternative zu Sonoff&nbsp;S20
date: 2018-03-23 00:00:00 +0100
description: Dieser Beitrag beschreibt die notwendigen Anpassungen an der preiswerten OBI-Wifi-Steckdose, um diese per Mqtt in die Hausautomation zu integrieren.
img: obi-wifi-socket/smartsocket.jpg
tags: [openHAB, Automation, Mqtt, Diy]
author: "Björn Engel"
lang: de
ref: obi-wifi-socket
permalink: OBI-Wifi-Steckdose
---
In der c't 02/2018 entdeckte ich einen [Artikel][ct-article] zu einer günstigen Wifi-Steckdose mit einem umprogrammierbaren ESP8266 - die Sonoff S20. Nachdem ich den Artikel gelesen hatte, habe ich gleich eine S20 bestellt und dann umprogrammiert. Ich war und bin zufrieden.

Nun entdeckte ich bei [OBI eine vergleichbare Wifi-Steckdose][obi-shop-socket] für unter 10 €. Im Internet findet man relativ wenig über das Gerät, weshalb ich meine geistreichen Ergüsse nun hier zusammentrage.

Hinweis: Die Wifi-Steckdose hat nichts in einer Steckdose zu suchen, solange daran herumgebastelt wird. Hier besteht Gefahr für Leib und Leben!

# Hardware
Die Gehäusehälften sind mit 2 Sicherheitsschrauben verschraubt. 

![Gehäuse][case]

Ich habe sie mit einem halbwegs passenden Schlitzschraubendreher entfernen können. Danach lassen sich die Gehäusehälften mit sanftem Druck links und rechts und etwas ruckeln von einander lösen.

![Sicherheitsschrauben][security-screws]
![Gehäuse öffnen][opening-case]
![Gehäuseklemmen][clamps]

Nun lässt sich die Platine mit einer Schraube abschrauben.

![Platine abschrauben][pcb]

Zum Vorschein kommt der senkrecht verbaute ESP8266. Die Pins auf der Trägerplatine sind unerwarteterweise beschriftet. 

![ESP8266][esp8266]

An diese Pins lässt sich nun [eine Buchsenleiste löten][tasmota-wiki-obi-socket]. Alternativ habe ich für mich die quick-'n'-dirty-Variante umgesetzt. Sie besteht aus einer zweireihigen Stiftleiste und einem gefalteten Notizzettel, der die Stiftleiste festhält.

![Adapter vorn][adapter-front]
![Adapter hinten][adapter-back]

Jetzt lässt sich ein handelsüblicher FTDI-Adapter anschließen.

* VCC -> 3,3V (FTDI)
* RESET -> n.c.
* TXD -> RXD (FTDI)
* GND -> GND (FTDI)
* RXD -> TXD (FTDI)
* GPIO0 -> gebrückt auf GND
* GND -> gebrückt auf GPIO0

# Software
Ich habe mir [Atom][atom] und das Plugin [platform-io][platform-io] installiert. Außerdem habe ich die Sourcen [des letzten Releases vom Tasmota-Projekt][tasmota-release] heruntergeladen, entpackt und in Atom geöffnet. 

In platformio.ini habe ich die Zeile "env_default = sonoff-DE" einkommentiert, um lediglich die diese Variante bauen zu lassen.

![platformio.ini][platformio.ini]

In sonoff/user_config.h habe ich mir dann noch verschiedene Standardwerte gesetzt, um nach einem Reset mit der Konfiguration nicht bei "0" anfangen zu müssen. Da wären:

* die Sprache (MY_LANGUAGE)
* Wlan-Konfiguration (STA_SSID1 und STA_PASS1)
* Mqtt-Konfiguration (MQTT_HOST und MQTT_PORT)
* NTP-Server (NTP_SERVER*)

Außerdem habe ich noch für mich unnötige Services deaktiviert, indem ich die Attribute auskommentiert habe:

* Domoticz (USE_DOMOTICZ)
* HomeAssistant (USE_HOME_ASSISTANT)
* mDNS (USE_DISCOVERY)

# Flashen
Der FTDI-Adapter wird mit dem PC verbunden. Hierbei darauf achten, dass GPIO0 und GND gebrückt sind. Anschließend die Brücke lösen.

Der Flashvorgang wird ganz einfach mittel ALT+STRG+U gestartet. 

![Flashen][atom-flash]

Wenn alles fertig ist, sollte eine Erfolgsmeldung ähnlich dieser hier zu sehen sein:

![Flashen erfolgreich][atom-success]

Der Programmieradapter kann nun entfernt und das Gehäuse wieder geschlossen werden.

# Konfiguration Tasmota

Wenn die Wifi-Steckdose nun in eine "richtige" Steckdose gesteckt wird, passiert ersteinmal nicht viel. Der Button funktioniert nicht und ob die Steckdose gerade eingeschaltet ist, hängt wohl vom Zufall ab.

Die Konfiguration erfolgt über das Webinterface. Klicks auf "Einstellungen" und "Gerät konfigurieren" folgen. Zuerst wird der "Geräte Typ" auf "18 Generic" gesetzt und gespeichert. Anschließend wie folgt:

![Gerätekonfiguration][tasmota-config]

# Konfiguration openHAB

Die Installation und Konfiguration eines Mqtt-Brokers wird an dieser Stelle vorausgesetzt und ist somit nicht Teil dieses Beitrags.

~~~ ruby
rule "Rollershutter up on sunrise"
when 
	Item Sunrise_Event changes from 0 to 1
then
	shutter.sendCommand(UP)
end
~~~

Beispieldateien zum Herunterladen [hier][download-mqtt-tasmota].

[Bildnachweis Banner][piccredit]

[ct-article]: https://www.heise.de/ct/ausgabe/2018-2-Steckdose-mit-eingebautem-ESP8266-mit-eigener-Firmware-betreiben-3929796.html
[obi-shop-socket]: https://www.obi.de/hausfunksteuerung/wifi-stecker-schuko/p/2291706
[tasmota-wiki-obi-socket]: https://github.com/arendst/Sonoff-Tasmota/wiki/Obi-Socket
[atom]: https://atom.io
[platform-io]: https://platformio.org/get-started/ide?install=atom
[tasmota-release]: https://github.com/arendst/Sonoff-Tasmota/releases

[case]: {{ "/assets/img/obi-wifi-socket/case.jpg" | prepend: site.baseurl}} "Gehäuse"
[security-screws]: {{ "/assets/img/obi-wifi-socket/security-screws.jpg" | prepend: site.baseurl}} "Sicherheitsschrauben"
[opening-case]: {{ "/assets/img/obi-wifi-socket/opening-case.jpg" | prepend: site.baseurl}} "Gehäuse öffnen"
[clamps]: {{ "/assets/img/obi-wifi-socket/clamps.jpg" | prepend: site.baseurl}} "Gehäuseklemmen"
[pcb]: {{ "/assets/img/obi-wifi-socket/pcb.jpg" | prepend: site.baseurl}} "Platine"
[esp8266]: {{ "/assets/img/obi-wifi-socket/esp8266.jpg" | prepend: site.baseurl}} "ESP8266"
[adapter-front]: {{ "/assets/img/obi-wifi-socket/adapter1.jpg" | prepend: site.baseurl}} "Adapter vorn"
[adapter-back]: {{ "/assets/img/obi-wifi-socket/adapter2.jpg" | prepend: site.baseurl}} "Adapter hinten"
[platformio.ini]: {{ "/assets/img/obi-wifi-socket/platformio.ini.jpg" | prepend: site.baseurl}} "platformio.ini"
[atom-flash]: {{ "/assets/img/obi-wifi-socket/atom-flash.jpg" | prepend: site.baseurl}} "Flashen"
[atom-success]: {{ "/assets/img/obi-wifi-socket/atom-success.jpg" | prepend: site.baseurl}} "Success"
[tasmota-config]: {{ "/assets/img/obi-wifi-socket/tasmota.jpg" | prepend: site.baseurl}} "Tasmota-Konfiguration"
[download-mqtt-tasmota]: https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/justcoke/smarthome-examples/trunk/master/TasmotaMqttSocket
[piccredit]: https://pixabay.com/de/gl%C3%BChbirne-idee-selbstst%C3%A4ndig-3104355/
