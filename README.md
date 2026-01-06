# Itinerari della Memoria 2.0 – Sito Web

Questo repository contiene il **sito web ufficiale** del progetto *Itinerari della Memoria 2.0*.

Il sito è pubblicato tramite **GitHub Pages** ed è pensato per essere
utilizzato **sul territorio**, tramite **QR code** posizionati fisicamente
nei vari punti dell’itinerario.

---

## Struttura generale del sito

```
/
│ index.html              ← Home page (scanner QR + accesso manuale)
│
├─ points/                ← Pagine dei punti dell’itinerario
│   ├─ point-01.html
│   ├─ point-02.html
│   ├─ point-03.html
│   └─ ...
│
├─ css/
│   └─ style.css          ← CSS comune (OBBLIGATORIO)
│
└─ assets/                ← Contenuti multimediali
    ├─ img/
    ├─ audio/
    └─ video/
```

⚠️ **Nota importante**  
Le cartelle su GitHub **non si creano vuote**: vengono create automaticamente
quando si crea un file indicando il percorso (es. `points/point-01.html`).

---

## Ruolo dei file principali

### `index.html`
- È la **porta di ingresso** del sito
- Permette:
  - la **scansione di QR code** tramite fotocamera
  - l’**accesso manuale** ai punti dell’itinerario (pulsanti)
- NON va modificato dagli studenti se non su indicazione del docente

### `points/point-XX.html`
- Ogni file rappresenta **un punto dell’itinerario**
- È la parte di sito **realizzata dagli studenti**
- Tutti i file devono seguire **lo stesso template HTML**
- Tutti i file devono usare **lo stesso CSS comune**

---

## Naming convention (OBBLIGATORIA)

Per evitare errori e problemi con i QR code:

- Tutti i nomi file **in minuscolo**
- Niente spazi, accenti o caratteri speciali
- Pagine punti:
  ```
  point-01.html
  point-02.html
  point-03.html
  ```
- Numerazione sempre a **2 cifre**
- Una volta stampati i QR code, i nomi dei file **NON devono più cambiare**

---

## CSS e template comune (OBBLIGATORIO)

- Tutte le pagine in `points/` devono includere:
  ```html
  <link rel="stylesheet" href="../css/style.css">
  ```
- È vietato:
  - copiare/incollare CSS dentro le singole pagine
  - creare CSS diversi per ogni gruppo

Lo stile grafico del sito deve risultare:
- coerente
- leggibile da smartphone
- uniforme tra tutte le pagine

---

## Contenuti minimi richiesti per ogni punto

Ogni pagina `point-XX.html` deve contenere almeno:

1. **Titolo del punto**
2. **Contesto storico**
   - dove siamo
   - periodo storico
   - evento/personaggi principali
3. **Significato come “luogo della memoria”**
   - perché è importante ricordarlo oggi
4. **Almeno un contenuto multimediale**
   - immagine, audio o video
   - con didascalia
5. **Fonti**
   - libri, siti, archivi, documenti consultati

---

## Accessibilità e qualità dei contenuti

Le pagine devono essere:

- leggibili su smartphone
- con testi chiari e sintetici
- con paragrafi brevi
- con immagini dotate di attributo `alt`
- con un contrasto sufficiente tra testo e sfondo

❌ Vietato copiare testi senza rielaborazione  
✔️ Consentito usare AI come supporto, ma **i contenuti devono essere compresi
e verificati**

---

## Link e navigazione

Ogni pagina punto deve contenere almeno:
```html
<a href="../index.html">Torna alla home</a>
```

Tutti i link devono essere:
- **relativi**
- funzionanti sia in locale sia su GitHub Pages

---

## Checklist prima della consegna

### Tecnica
- [ ] La pagina si apre correttamente da smartphone
- [ ] Il CSS comune viene caricato correttamente
- [ ] I link funzionano (Home ↔ Punto)
- [ ] I contenuti multimediali si caricano correttamente

### Contenuti
- [ ] Testi chiari, corretti e rielaborati
- [ ] Presente almeno un contenuto multimediale pertinente
- [ ] Presente la sezione Fonti

### Coerenza
- [ ] Template rispettato
- [ ] Naming convention corretta
- [ ] File posizionato nella cartella corretta (`points/`)

---

## Modalità di lavoro consigliata (gruppi)

All’interno di ogni gruppo è consigliato suddividere i ruoli:

- **HTML / struttura**
- **Contenuti testuali**
- **Ricerca e media**
- **Controllo qualità finale**

---

## Valutazione

Il lavoro sarà valutato considerando:
- qualità e correttezza dei contenuti
- chiarezza espositiva
- rispetto delle indicazioni tecniche
- collaborazione all’interno del gruppo

---

**Prof. Bernini**  
Progetto *Itinerari della Memoria 2.0*

