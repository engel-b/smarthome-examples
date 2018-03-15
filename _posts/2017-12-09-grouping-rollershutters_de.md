---
layout: post
title: Rollläden gruppieren
date: 2017-12-09 00:00:00 +0100
description: dieses Beispiel zeigt, wie Rollladengruppen in openHAB geschaltet werden können # Add post description (optional)
img: shutters.png # Add image post (optional)
tags: [openHAB, Rollladen, Automation, Regeln]
author: "Björn Engel" # Add name author (optional)
lang: de
ref: grouping-rollershutters
permalink: Rolllaeden-gruppieren
---
Dieses Beispiel zeigt, wie Rollladengruppen in openHAB geschaltet werden können.

Die Konfigurationsdateien können [hier][download-shutters] gefunden werden. Sie brauchen nur in den openHAB Konfigurationsordner entpackt werden.

Gruppieren von Rollläden funktioniert ein wenig anders als das Gruppieren von Kontakten oder Schaltern. Es wird ein Dummy Rollladen Item gebraucht, welches in einer items-Datei:

~~~ ruby
Rollershutter AllShutters "All shutters"
~~~

Dieses virtuelle Item wird genutzt, um Schaltbefehle für die Rollladengruppe entgegen zu nehmen. Für die eigentliche Funktionalität wird eine Regel benötigt, die Kommandos auf dem virtuellen Item registriert und diese dann an alle Gruppenmitglieder weiterleitet.

~~~ ruby
rule "Grouping shutters"
when 
	Item AllShutters received command
then
	ShuttersGroup.members.forEach[shutter|
			shutter.sendCommand(receivedCommand)
		]
end
~~~

[Bildnachweis Banner][piccredit]

[download-shutters]: https://github.com/justcoke/smarthome-examples/tree/master/GroupingShutters
[piccredit]: https://pixabay.com/de/fensterl%C3%A4den-fenster-1039996/
