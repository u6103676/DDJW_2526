i. Introducció
L'objectiu principal és trobar grups de cartes idèntiques dins d'un tauler (memory), utilitzant un sistema de renderització basat en Canvas per optimitzar el rendiment i el control visual.


ii. Descripció del disseny del joc

- Mode 1 (Estandar): Permet a l'usuari configurar una partida única triant el nombre de parelles, la mida dels grups i la dificultat visual.

- Mode 2 (Infinit): És un mode progressiu on la dificultat augmenta automàticament cada cop que es supera un nivell, incrementant el nombre de cartes, la mida dels grups i la velocitat del joc.

- Interfície d'Usuari: En el menú principal ara hi ha rànquing de millors puntuacions, la gestió de partides guardades i un panell d'opcions.


iii. Descripció de les parts més rellevants de la implementació

- Motor de Joc en Canvas: No s'utilitza el DOM per a les cartes, ara s'utilitza l'API de Canvas 2D per dibuixar el tauler, gestionar les animacions i calcular les col·lisions dels clics de l'usuari.

- SVG: Les imatges de les cartes no són fitxers externs, sinó que es generen dinàmicament mitjançant codi SVG, complint amb el requisit de dibuix vectorial programat.

- Persistència de Dades: S'ha utilitzat localStorage per implementar un sistema de multi-save i un rànquing de puntuacions persistent que es manté entre sessions de navegació.


iv. Conclusions i problemes trobats
Un dels reptes més complicats va ser passar de la lògica clàssica de buscar parelles a permetre grups variables, ja que vaig haver de refer bona part de la funció que comprova si les cartes coincideixen.
D'altra banda, també vaig tenir algunes dificultats amb el sistema de guardat local (localStorage), sobretot perquè alguns selectors del menú d'opcions no es carregaven correctament al principi. Finalment, ho vaig poder resoldre aplicant un sistema de valors per defecte i assegurant-me que les dades es validessin bé abans de carregar la configuració del joc.