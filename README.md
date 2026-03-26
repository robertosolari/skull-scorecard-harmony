# Skull King Scorecard

Segnapunti digitale per il gioco di carte **Skull King**, con punteggio calcolato automaticamente secondo le regole ufficiali.

## Funzionalita

- **2-8 giocatori** con 10 round di gioco
- **Punteggio automatico** secondo il regolamento ufficiale "Skull King":
  - Previsione >= 1 azzeccata: 20 punti per ogni presa
  - Previsione >= 1 sbagliata: -10 punti per ogni presa di differenza
  - Previsione 0 azzeccata: +10 punti per ogni carta distribuita nel round
  - Previsione 0 sbagliata: -10 punti per ogni carta distribuita nel round
- **Punti bonus** (solo se la previsione e corretta):
  - Carte di valore 14 (semi normali): +10 ciascuna
  - Carta nera di valore 14: +20
  - Sirena catturata da Pirata: +20
  - Pirata catturato da Skull King: +30
  - Skull King catturato da Sirena: +40
- **8 giocatori**: i round 8, 9 e 10 hanno max 8 carte (il mazzo ha 70 carte)
- **Layout responsive**: cards su mobile, tabella su desktop
- **Classifica** in tempo reale con animazioni
- **Salvataggio automatico** su localStorage

## Come usare

1. Aggiungi i giocatori (minimo 2, massimo 8)
2. Premi "Start Game"
3. A ogni round inserisci le previsioni e conferma
4. Dopo aver giocato il round con le carte, inserisci le prese e i bonus
5. I punteggi vengono calcolati automaticamente
6. Dopo 10 round viene mostrata la classifica finale

## Sviluppo

Requisiti: Node.js e npm.

```sh
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Esegui i test
npm test

# Build di produzione
npm run build
```

## Test

I test coprono tutta la logica di punteggio con esempi presi direttamente dal regolamento ufficiale:

```sh
# Esecuzione singola
npx vitest run

# Watch mode
npm test
```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Vitest (test)
