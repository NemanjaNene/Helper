# Helper - Platforma za kućne usluge

Helper je moderna web platforma koja povezuje ljude koji pružaju kvalitetne kućne usluge sa onima koji ih traže. Kao "Facebook za kućne pomoćnike", platforma omogućava lako pronalaženje pouzdanih pomoćnika za sve vaše kućne potrebe.

## 🚀 Funkcionalnosti

### Za sve korisnike:

- **Registracija i prijava** - Jednostavan sistem registracije sa razlikovanjem između pružalaca i klijenata
- **Pretraga i filtriranje** - Napredna pretraga usluga po kategorijama, lokaciji i ceni
- **Sistem poruka** - Direktna komunikacija između korisnika
- **Ocene i recenzije** - Sistem ocenjivanja i komentarisanja usluga
- **Responzivni dizajn** - Optimizovano za sve uređaje (desktop, tablet, mobilni)

### Za pružaoce usluga:

- **Kreiranje profila** - Detaljni profil sa slikom, opisom i uslugama
- **Upravljanje uslugama** - Dodavanje, uređivanje i brisanje usluga
- **Statistike** - Pregled ocena, recenzija i poruka
- **Podešavanja** - Uređivanje ličnih podataka

### Za klijente:

- **Pregled profila** - Detaljni pregled pružalaca usluga
- **Kontakt** - Direktna komunikacija sa pružaocima
- **Rezervacija** - Dogovaranje termina i usluga

### Admin panel:

- **Dashboard** - Pregled statistika platforme
- **Upravljanje korisnicima** - Dodavanje, uređivanje i brisanje korisnika
- **Upravljanje uslugama** - Moderacija usluga
- **Pregled poruka** - Monitoring komunikacije
- **Podešavanja** - Konfiguracija platforme

## 🛠️ Tehnologije

- **HTML5** - Struktura stranica
- **CSS3** - Stilizovanje sa modernim CSS Grid i Flexbox
- **JavaScript (ES6+)** - Interaktivnost i logika aplikacije
- **LocalStorage** - Lokalno skladištenje podataka
- **Font Awesome** - Ikone
- **Google Fonts** - Tipografija (Inter)

## 📁 Struktura projekta

```
Helper/
├── index.html          # Glavna stranica
├── search.html         # Stranica pretrage
├── admin.html          # Admin panel
├── styles.css          # Glavni CSS fajl
├── script.js           # Glavni JavaScript fajl
└── README.md           # Dokumentacija
```

## 🚀 Pokretanje

1. **Preuzmite fajlove** u lokalni folder
2. **Otvorite `index.html`** u web pregledniku
3. **Koristite platformu** - registrujte se ili se prijavite

## 📱 Kako koristiti

### Registracija

1. Kliknite "Registruj se" u gornjem desnom uglu
2. Popunite formular (ime, email, lozinka)
3. Izaberite tip korisnika (tražim usluge / pružam usluge)
4. Kliknite "Registruj se"

### Pretraga usluga

1. Idite na stranicu pretrage
2. Unesite šta tražite u polje pretrage
3. Filtrirate po lokaciji i ceni
4. Kliknite "Pretraži"

### Komunikacija

1. Kliknite "Kontakt" na profilu pružaoca
2. Pošaljite poruku
3. Dogovorite detalje usluge

## 🎨 Dizajn

Platforma koristi moderni, čist dizajn sa:

- **Gradient pozadine** za hero sekciju
- **Kartice** za usluge i profile
- **Responzivni grid** za različite veličine ekrana
- **Hover efekti** za interaktivnost
- **Modal prozori** za forme
- **Tab navigacija** za profile

## 🔧 Konfiguracija

### Dodavanje novih usluga

U `script.js` fajlu, u `sampleServices` nizu dodajte nove usluge:

```javascript
{
    id: 7,
    name: "Nova usluga",
    description: "Opis usluge",
    icon: "fas fa-icon-name",
    price: "500 RSD/sat",
    rating: 4.8,
    reviews: 15,
    provider: {
        name: "Ime Prezime",
        avatar: "https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=IP",
        location: "Lokacija"
    }
}
```

### Dodavanje novih korisnika

U `sampleUsers` nizu dodajte nove korisnike:

```javascript
{
    id: 3,
    name: "Ime Prezime",
    email: "email@example.com",
    password: "lozinka",
    type: "provider", // ili "client"
    avatar: "https://via.placeholder.com/120x120/4F46E5/FFFFFF?text=IP",
    location: "Lokacija",
    phone: "+381 11 123 4567",
    rating: 4.9,
    reviews: 23,
    services: ["Usluga 1", "Usluga 2"],
    description: "Opis korisnika",
    joined: "2024-01-01"
}
```

## 📊 Podaci

Platforma koristi `localStorage` za skladištenje podataka:

- `helper-users` - Korisnici
- `helper-services` - Usluge
- `helper-current-user` - Trenutno prijavljeni korisnik

## 🔒 Bezbednost

- Lozinke se čuvaju u plain text-u (za demo svrhe)
- U produkciji koristiti hash-ovanje lozinki
- Validacija na frontend-u
- Sanitizacija korisničkih unosa

## 🚀 Buduća poboljšanja

- [ ] Backend integracija
- [ ] Real-time poruke
- [ ] Push notifikacije
- [ ] Geolokacija
- [ ] Plaćanje online
- [ ] Mobilna aplikacija
- [ ] AI preporuke
- [ ] Kalendar rezervacija

## 📞 Kontakt

Za pitanja i podršku:

- Email: info@helper.rs
- Telefon: +381 11 123 4567
- Adresa: Knez Mihailova 1, Beograd

## 📄 Licenca

Ovaj projekat je kreiran za demo svrhe. Sva prava zadržana.

---

**Helper** - Povezujemo ljude, olakšavamo život! 🏠✨

