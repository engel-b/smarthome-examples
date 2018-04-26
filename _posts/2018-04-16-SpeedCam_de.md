---
layout: post
title: SPEED CAMERA auf Raspberry Pi installieren
date: 2018-04-16 00:00:00 +0100
description: Dieser Beitrag beschreibt die Installation und Inbetriebnahme von SPEED CAMERA auf einem Raspberry Pis.
img: banner.jpg
imgfolder: /assets/img/speedcam/
tags: [raspberry pi, speedcam]
author: "Björn Engel"
lang: de
ref: speedcam
permalink: SPEED-CAMERA-auf-Raspberry-Pi
---
# Kamera in Betrieb nehmen

Nachdem das Kamera-Modul angeschlossen wurde, muss es noch aktiviert werden

~~~shell
sudo raspi-config
~~~

Dann zu **5 Interfacing Options** und **P1 Camera**. Die Frage, ob das Camera-Modul aktiviert werden soll, mit **Yes** beantworten.

Raspberry Pi auf den aktuellen Stand bringen

~~~shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
~~~

Herunterladen und Ausführen des Installationsskriptes:

~~~shell
curl -L https://raw.github.com/pageauc/speed-camera/master/speed-install.sh | bash
~~~

[Bildnachweis Banner][piccredit]

[piccredit]: https://pixabay.com/de/blitzer-geschwindigkeitskontrolle-502970/
