---
layout: post
title: Hausautomationsserver mit Ansible aufsetzen
date: 2018-01-07 00:00:00 +0100
description: # Add post description (optional)
img: setup.png # Add image post (optional)
tags: [openHAB, ansible, Automation, Installation]
author: "Björn Engel" # Add name author (optional)
lang: de
ref: installation-using-ansible
permalink: Hausautomationsserver-mit-Ansible-aufsetzen
---
Als ich das erste Mal meinen Hausautomationsserver einrichtete, dokumentierte ich nichts.

Bei meinen nächsten Installationen pflegte ich zumindest einen Step-by-Step-Guide in einem Textfile, wo ich jedes Shell-Kommando auflistete. 

In einem Kundenprojekt bei meiner täglichen Arbeit lernte ich das Installationstool Ansible kennen und lieben. Die Aufgabe war das Aufsetzen einer kompletten Stage mit etlichen Maschinen mit unterschiedlichsten Aufgaben. 

Ich will hier jetzt keinen kompletten Einsteiger-Guide für Ansible geben - davon gibt es bereits genug. Aber einen kurzen Cheat-Sheet soll es geben:

* die Installationsanleitung ist in xml geschrieben
* anders als Puppet oder Chef wird hier kein Konfigurationsserver benötigt.
* die Systemvoraussetzungen sind überschaubar: Python und **nicht** Windows

![Ansible][ansible]

Die Funktionsweise kurz umrissen:

* auf der Installationsmaschine (muss nicht zwangsläufig eine der einzurichtenden Maschinen sein) wird das Ansible-Playbook gestartet
* Ansible prüft das Playbook syntaktisch
* Ansible prüft die (ssh-) Konnektivität zu den zu installierenden Maschinen
* nun wird das Playbook von oben nach unten Schritt für Schritt ausgeführt; dabei wird jeder Installationsschritt auf allen betroffenen Systemen parallel ausgeführt

Für mein Hausautomationsserver-Setup habe ich ein [Playbook][justcoke-ansible-playbook] geschrieben, das direkt auf dem Server ausgeführt werden kann. Auf dem frischen Ubuntu gibt es neben Python und git (für den Checkout des Playbooks) keine Abhängigkeiten.

~~~ shell
sudo ansible-playbook openhab.yml
~~~

Das Playbook installiert 

* ein paar nützliche Standardwerkzeuge (locate, mc, nano)
* Docker
* Mosquitto (Mqtt-Broker)
* openHAB 2 im Docker-Container
* owfs (OnewireFilesystem für Onewire-Support)
* *Dropbox* (Installationsschritte sind zwar vorbereitet, jedoch lassen sich einzelne Schritte nicht automatisieren...)

[Bildnachweis Banner][piccredit]

[ansible]: {{ "/assets/img/ansible.png" | prepend: site.baseurl}} "Ansible"
[piccredit]: https://pixabay.com/de/wer-wie-was-wo-warum-wann-fragen-2985525/ 
[justcoke-ansible-playbook]: https://github.com/justcoke/openHAB-ansible/