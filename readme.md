# TypeScript & postinumerot

Tämän koodaustehtävän tavoitteena on luoda tarvittavat pohjatiedot myöhemmille tehtäville, joissa käsittelemme dataa ja testaamme ohjelmistoja [TypeScript-kielellä](https://www.typescriptlang.org/). Kaikkien kielen ominaisuuksien opetteleminen etukäteen ei ole tarkoituksenmukaista, joten tässä tehtävässä tutustutaan tarvittaviin työkaluihin sekä perusrakenteisiin.

Tehtävässä voi olla hyötyä esim. omista funktioista ja omien tietotyyppien määrittelemisestä, mutta ne eivät ole välttämättömiä.


## GitHub actions

Tehtävä testataan käyttäen [GitHub actions](https://github.com/features/actions) -palvelua, joka suorittaa testaa ohjelmasi automaattisesti, kun päivität lähdekoodisi GitHubiin. Kun GitHub Actions on saanut koodisi suoritettua, näet tuloksen GitHub-repositoriosi [Actions-välilehdellä](../../actions/workflows/classroom.yml). Arvioinnin valmistumiseen menee tyypillisesti noin pari minuuttia.

Tehtävien toimintalogiikan ja tekstikäyttöliittymän ei tarvitse noudattaa pilkulleen annettuja esimerkkejä, mutta niiden tulee olla oleellisilta osin samanlaiset. Automaattisen testauksen vuoksi ohjelmasi tulee toimia samoilla komennoilla ja syötteillä kuin esimerkit ja tulosteiden täytyy olla samankaltaiset.


## Riippuvuuksien asentaminen

Tehtävän suorittamiseksi tarvitset [Node.js-suoritusympäristön](https://nodejs.org/) sekä npm-pakettienhallintasovelluksen, joka tulee tyypillisesti Node.js-asennuksissa mukana. Suosittelemme käyttämään tehtävissä [uusinta LTS-versiota (Long Term Support)](https://github.com/nodejs/release#release-schedule).

Tehtävässä käytetään [npm-rekisteristä](https://www.npmjs.com/) löytyviä [`typescript`-](https://www.npmjs.com/package/typescript) sekä [`@types/node`-paketteja](https://www.npmjs.com/package/@types/node). Nämä paketit on valmiiksi määritettynä tämän tehtäväpohjan [package.json](./package.json)-tiedostossa, joten niiden asentamiseksi sinun tarvitsee vain ajaa komento `npm install` tehtävän päähakemistossa:

```sh
npm install
```

Sekä `typescript`- että `@types/node`-paketit tarvitaan vain kehitysvaiheessa, joten ne on määritetty `devDependencies`-osioon `package.json`-tiedostossa. Mikäli sovelluksesta tehdään julkaistava tuotantoversio, koodi voidaan kääntää JavaScriptiksi ja sovellusta voidaan suorittaa ilman näitä paketteja.


## Ohjelman suorittaminen

Kun riippuvuudet on asennettu, voit kokeilla skriptin suorittamista `node`-komennolla esim. seuraavasti:

```sh
# etsitään postitoimipaikka postinumerolla 00100
node src/postalcodes.ts 00100

# etsitään postinumerot postitoimipaikalla porvoo
node src/postalcodes.ts porvoo
```

Tulosteiden pitäisi aluksi näyttää muutama ensimmäinen rivi postinumeroaineistosta sekä komentoriviparametrit taulukkona, ja tätä toimintalogiikkaa on tarkoitus muokata tehtävän seuraavissa osissa.


## "Full TypeScript support"

Node.js:n uusimmat versiot tukevat TypeScript-koodin suorittamista suoraan, mutta tietyillä rajoituksilla. Esimerkiksi `tsconfig.json`-tiedoston asetuksia ei tueta ja oletuksena koodissa saa olla vain sellaisia ominaisuuksia, jotka voidaan yksinkertaisesti poistaa:

> *"By default Node.js will execute TypeScript files that contains only erasable TypeScript syntax. Node.js will replace TypeScript syntax with whitespace, and no type checking is performed."*
>
> https://nodejs.org/docs/v24.12.0/api/typescript.html#type-stripping

Node.js:n dokumentaation artikkeli [Running TypeScript Natively](https://nodejs.org/en/learn/typescript/run-natively) tarjoaa lisätietoja TypeScript-koodin suorittamisesta Node.js:ssä. Käytännössä edistyneemmän TypeScript-koodin suorittamiseksi on kaksi lähestymistapaa: joko kääntää koodi JavaScriptiksi etukäteen TypeScript-kääntäjällä (ahead-of-time) tai käyttää työkaluja, jotka kääntävät TypeScriptiä samalla kun sitä suoritetaan (just-in-time).

## TypeScript-kääntäjä eli `tsc` (TypeScript compiler)

**Tsc** on TypeScript-kääntäjä, joka tarkastaa TypeScript-lähdekoodisi virheiden varalta sekä kääntää koodisi standardin mukaiseksi JavaScriptiksi. Kun siis haluat kääntää kirjoittamasi ohjelman TypeScript-kielestä JavaScriptiksi, onnistuu se `npx`- ja `tsc`-komennoilla:

```sh
npx tsc
```

Yllä esiintyvä `npx` on komento, joka suorittaa npm-paketteja ilman, että niitä tarvitsee asentaa globaalisti. Tässä tapauksessa `npx tsc`-yhdistelmä saa aikaan sen, että TypeScript-paketista löytyvä `tsc`-kääntäjä käynnistetään.

> _"\[npx\] command allows you to run an arbitrary command from an npm package (either one installed locally, or fetched remotely), in a similar context as running it via `npm run`._"
>
> https://docs.npmjs.com/cli/v10/commands/npx

Jos kääntäminen onnistuu, syntyy `build`-hakemistoon JavaScript-tiedostot, jotka voidaan suorittaa Node.js:llä tai muissa JavaScript-ympäristöissä:

```sh
node build/postalcodes.js 00100
```

Tässä vaiheessa käännetty JavaScript-koodi näyttää melko samalta kuin alkuperäinen TypeScript-koodi, mutta laajemmissa projekteissa erot nousevat selkeämmin esiin.


## TypeScript Execute eli `tsx`

Vaihtoehtoisesti, jos haluat suorittaa edistynyttä TypeScript-koodia ilman etukäteiskääntämistä, voit käyttää [`tsx`-työkalua](https://github.com/privatenumber/tsx), joka kääntää TypeScriptiä automaattisesti taustalla. Asenna `tsx`-paketti ensin projektin kehitysriippuvuuksiin:

```sh
npm install tsx --save-dev
```

Tämän jälkeen voit suorittaa TypeScript-skriptin `npx`:n ja `tsx`-komennon avulla:

```sh
npx tsx src/postalcodes.ts 00100
```

Node.js:n sisäänrakennettuun TypeScript-tukeen verrattuna `tsx`-työkalu tarjoaa tuen kaikille TypeScriptin ominaisuuksille, joten se soveltuu myös monimutkaisempien TypeScript-projektien suorittamiseen ilman etukäteiskääntämistä. Lisäksi se hyödyntää `tsconfig.json`-tiedostossa määritettyjä asetuksia.

Node.js:n TypeScript-ekosysteemissä on myös muita tapoja suorittaa koodia, esimerkiksi [`ts-node`-työkalu](https://www.npmjs.com/package/ts-node), jonka kehitys vaikuttaa tosin olevan hiipumassa.


## Tehtäväpohja [./src/postalcodes.ts](./src/postalcodes.ts)

[Tehtäväpohjassa](./src/postalcodes.ts) on valmiiksi kirjoitettuna esimerkit tekstitiedostojen lukemiseen ja komentoriviparametrien käsittelyyn. Kuten edellä on mainittu, koodi voidaan suorittaa eri tavoin, esimerkiksi seuraavasti:

```sh
# suoritetaan suoraan Node.js:llä (rajoitettu TypeScript-tuki):
node src/postalcodes.ts 00100

# suoritetaan TypeScript-koodi suoraan tsx-työkalulla (edellyttää asennusta):
npx tsx src/postalcodes.ts 00100

# käännetään TypeScript-koodi JavaScriptiksi tsc-komennolla ja
# suoritetaan käännetty JavaScript-koodi Node.js:llä:
npx tsc
node build/postalcodes.js 00100
```

Suoritustavasta riippumatta tehtäväpohjan koodin tulosteen pitäisi olla seuraavanlainen:

```
The first 5 lines read from CSV file:
┌─────────┬────────────────────┐
│ (index) │       Values       │
├─────────┼────────────────────┤
│    0    │ '79700,Heinävesi'  │
│    1    │ '86240,Pyhänkoski' │
│    2    │  '97390,Kierinki'  │
...
```

Jos komentoriviparametreja on annettu, ne tulostetaan myös taulukkona. Näiden tulosteiden on tarkoitus auttaa sinua alkuun pääsemisessä ja voit muokata koodin kaikkia osia tarpeidesi mukaan.


## Postinumeroaineisto

Tässä tehtävässä hyödynnetään CSV-muotoon tallennettua postinumeroaineistoa, joka löytyy tiedostosta [postalcodes.csv](./postalcodes.csv). Aineisto on muodostettu [Postin postiumerotiedostojen](https://www.posti.fi/fi/asiakastuki/postinumerotiedostot) pohjalta 5.1.2023.

Tiedostossa kukin postinumero ja siihen liittyvä nimi esiintyvät omalla rivillään, esimerkiksi seuraavasti:

```
79700,Heinävesi
86240,Pyhänkoski
97390,Kierinki
00900,Helsinki
02760,Espoo
02140,Espoo
...
```

Huomaa, että sama toimipaikan nimi voi esiintyä tiedostossa monen eri postinumeron kohdalla. Postinumerot puolestaan ovat uniikkeja ja esiintyvät aineistossa vain kerran. Numerot ja nimet ovat tiedostossa sekalaisessa järjestyksessä.


## Osa 1: Postitoimipaikka (40 %)

Kirjoita TypeScript-kielinen ohjelma [`src/postalcodes.ts`](./src/postalcodes.ts), joka kertoo postitoimipaikan nimen, kun sille annetaan parametrina postinumero.

Tehtävän ratkaisemiseksi ohjelmasi tulee etsiä csv-muotoisesta postinumeroaineistosta syötettyä postinumeroa vastaava nimi ja tulostaa se `console.log`-komennolla.

Esimerkkisuoritus:

```sh
# komento:
$ node src/postalcodes.ts 00100

# ohjelman tuloste:
Helsinki
```

[`postalcodes.ts`](./src/postalcodes.ts)-tiedostossa on valmiiksi toteutettuna operaatioita mm. tiedoston lukemiseksi sekä parametrien käsittelemiseksi, joista voi olla apua alkuun pääsemisessä.

Huolehdi ratkaisussasi siitä, että tuntemattoman postinumeron syöttäminen tai postinumeron syöttämättä jättäminen eivät kaada ohjelmaasi. Voit näissä tapauksissa joko tulostaa vapaamuotoisen virheilmoituksen tai jättää tulosteet kokonaan tekemättä.


## Osa 2: Postinumerot (40 %)

Muokkaa tässä osassa ohjelmaasi siten, että käyttäjä voi antaa komentoriviparametrina postinumeron sijasta myös postitoimipaikan nimen. Ohjelmasi tulee tässä tapauksessa listata kaikki kyseiseen nimeen liittyvät postinumerot yhdellä rivillä **kasvavassa järjestyksessä**.

Tehtävän voi ratkaista useilla tavoilla, joten käytä hetki ongelman pohtimiseen ennen kuin ryhdyt koodaamaan. Olisiko esimerkiksi helpompaa jäsentää postinumeroaineisto etukäteen uudenlaiseksi tietorakenteeksi?

Esimerkkisuoritus:

```sh
# komento (listaa Porvoon postinumerot):
$ node src/postalcodes.ts porvoo

# tulostaa Porvoon postinumerot kasvavassa järjestyksessä:
06100, 06101, 06150, 06151, 06200, 06400, 06401, 06450, 06500
```

Toteuta ohjelmasi siten, että syötetyn postitoimipaikan **kirjainkoolla ei ole merkitystä**. Huolehdi myös siitä, että tuntemattoman nimen syöttäminen ei kaada ohjelmaa.


## Osa 3: Koodin kääntäminen ja npm-skriptit (20 %)

Npm:n ja [package.json](./package.json)-tiedoston avulla voidaan määritellä [projektikohtaisia komentoja](https://docs.npmjs.com/cli/using-npm/scripts), jotka esimerkiksi suorittavat testejä tai kääntävät TypeScript-koodia JavaScriptiksi.

Lisää `package.json`-tiedostoon uusi `scripts`-lohko ja lohkoon uusi komento nimeltä `build`. Tämän komennon tulee kääntää TypeScript-tiedostot JavaScriptiksi käyttäen `tsc`-komentoa.

Tämän jälkeen voit kääntää koodin ja suorittaa sen esimerkiksi seuraavilla komennoilla:

```sh
# kääntää TypeScript-koodin JavaScriptiksi build-hakemistoon
npm run build

# käännetty koodi voidaan nyt suorittaa tavallisena JavaScriptinä:
node build/postalcodes.js 00100
node build/postalcodes.js porvoo
```

👆 *Käännetyt tiedostot tallentuvat `build`-hakemistoon, koska se on määritetty `tsconfig.json`-tiedostossa `outDir`-hakemistoksi.*


## Vinkkejä

Valmiiksi asetettujen pakettien lisäksi saat lisätä `package.json`-tiedostoon myös muita paketteja, mutta se ei ole tehtävän ratkaisemiseksi välttämätöntä. Seuraavat JavaScriptin standardikirjaston metodit saattavat olla tässä tehtävässä avuksi.


### String.split

CSV-tiedostossa olevien rivien pilkkominen onnistuu merkkijonon [`split`-metodilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split):

```js
let rivi = "00730,Helsinki";
let [numero, nimi] = rivi.split(",");
```


### Array.sort

Postinumeroiden **järjestäminen** onnistuu taulukon [`sort`-metodilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort):

```ts
let codes: string[] = ...;
codes.sort();
```


### Array.join

Postinumeroiden yhdistäminen taulukosta pilkuilla erotelluksi listaksi onnistuu esim. [`join`-metodilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join):

```ts
let output = codes.join(", ");
console.log(output);
```

### Oman tyypin määrittely

Mikäli haluat hyödyntää ohjelmassasi TypeScriptin tyyppimäärittelyjä, voit määritellä postinumerotietuetta varten esimerkiksi seuraavanlaisen `type`:n:

```ts
// Katso lisää: https://www.typescriptlang.org/docs/handbook/2/objects.html
type PostOffice = {
  name: string;
  code: string;
};
```

## Lisenssit ja tekijänoikeudet

### Postinumeroaineisto

Tehtävän postinumeroaineiston käyttäminen edellytää [Postin postiumerotiedostoja koskevien käyttöehtojen](https://www.posti.fi/fi/asiakastuki/postinumerotiedostot) noudattamista. Voit tutustua [postinumeroaineiston palvelukuvaukseen ja käyttöehtoihin postin sivuilla](https://www.posti.fi/mzj3zpe8qb7p/1eKbwM2WAEY5AuGi5TrSZ7/33cfc2c66d2649af885b36e3935556a1/posti-postinumeropalvelut-palvelukuvaus-ja-kayttoehdot-20150101.pdf).

> _"Tietoja voi luovuttaa edelleen, mutta aineistoja luovutettaessa on huolehdittava siitä, että luovutuksensaajalla on tieto palvelun käyttöehdoista sekä tietojen latauspäivämäärästä."_
>
> Postinumero­tiedostot. https://www.posti.fi/fi/asiakastuki/postinumerotiedostot

### Node.js

> _"Node.js is available under the [MIT license](https://opensource.org/licenses/MIT). Node.js also includes external libraries that are available under a variety of licenses. See [LICENSE](https://github.com/nodejs/node/blob/HEAD/LICENSE) for the full license text."_
>
> https://github.com/nodejs/node#license

### TypeScript

TypeScript itsessään on lisensoitu Apache-2.0 -lisenssillä: https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt

### Tsx

Tsx-työkalu on lisensoitu MIT-lisenssillä: https://github.com/privatenumber/tsx/blob/master/LICENSE

### Tämä oppimateriaali

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Tehtävänannon, lähdekoodien ja testien toteutuksessa on hyödynnetty ChatGPT- sekä GitHub copilot -tekoälytyökaluja.
