# Koszulka Fachowca · propozycje logo

Prezentacja siedmiu koncepcji logo Koszulki Fachowca w marce Code&Pixel: każda koncepcja ma animowaną planszę z logo, wersję jednobarwną i jedenaście zastosowań. Na końcu koncepcja 01 w czterech paletach.

## Podgląd lokalny

Strona jest statyczna, bez budowania. Wideo i podgląd zdjęć wymagają serwera, samo otwarcie pliku z dysku nie wystarczy:

```bash
python3 -m http.server 8000
```

Potem `http://localhost:8000`.

## Struktura

| Ścieżka | Zawartość |
|---|---|
| `index.html` | cała prezentacja na jednej stronie |
| `assets/css/style.css` | wygląd, kolory Code&Pixel |
| `assets/js/main.js` | odtwarzanie animacji po wejściu w kadr, aktywny numer w pasku, podgląd zdjęć |
| `assets/img/` | zastosowania w dwóch szerokościach (800 i 1600 px), logo Code&Pixel |
| `assets/video/` | animacje logo (MP4, 1920×1080, 3,2 s w pętli) i plakaty z końcową klatką |
| `assets/fonts/` | Manrope i Inter z własnego serwera, tylko znaki łacińskie z polskimi |

## Uwagi

- Plik `index.html` i obrazy generuje skrypt w projekcie graficznym. Poprawki wchodzą tam, ręczne zmiany w `index.html` znikną przy następnym złożeniu.
- Zastosowania są wizualizacjami poglądowymi. Kolory na zdjęciach odbiegają od kodów palet; kody przy próbkach są wartościami docelowymi do wersji wektorowej.
- Przy włączonym w systemie ograniczeniu ruchu animacje się nie odtwarzają, zostaje plakat z gotowym logo.

## Prywatność (RODO)

Strona nie ładuje zasobów z zewnętrznych serwerów i nie śledzi odwiedzających. Nie ma formularzy ani ciasteczek.
