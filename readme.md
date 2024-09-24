# TypeScript & postinumerot

Tämän koodaustehtävän tavoitteena on luoda tarvittavat pohjatiedot myöhemmille tehtäville, joissa käsittelemme dataa ja testaamme ohjelmistoja [TypeScript-kielellä](https://www.typescriptlang.org/). Kaikkien kielen ominaisuuksien opetteleminen etukäteen ei ole tarkoituksenmukaista, joten tässä tehtävässä tutustutaan tarvittaviin työkaluihin sekä perusrakenteisiin.

Tehtävässä voi olla hyötyä esim. omista funktioista ja omien tietotyyppien määrittelemisestä, mutta ne eivät ole välttämättömiä.

## GitHub actions

Tehtävä testataan käyttäen [GitHub actions](https://github.com/features/actions) -palvelua, joka suorittaa testaa ohjelmasi automaattisesti, kun päivität lähdekoodisi GitHubiin. Kun GitHub Actions on saanut koodisi suoritettua, näet tuloksen GitHub-repositoriosi [Actions-välilehdellä](../../actions/workflows/classroom.yml). Arvioinnin valmistumiseen menee tyypillisesti noin pari minuuttia.

Tehtävien toimintalogiikan ja "käyttöliittymän" ei tarvitse noudattaa pilkulleen annettuja esimerkkejä, mutta toimintalogiikan tulee olla oleellisilta osin samanlainen. Automaattisen testauksen vuoksi ohjelmasi tulee toimia täsmälleen samoilla komennoilla ja syötteillä kuin esimerkit.

## Riippuvuuksien asentaminen ja ohjelman suoritus

Tehtävän suorittamiseksi tarvitset [Node.js-suoritusympäristön](https://nodejs.org/) sekä npm-pakettienhallintasovelluksen, joka tulee tyypillisesti Node.js-asennuksissa mukana. Suosittelemme käyttämään tehtävissä [uusinta LTS-versiota (Long Term Support)](https://github.com/nodejs/release#release-schedule).

Tehtävässä käytetään [npm-rekisteristä](https://www.npmjs.com/) löytyviä [`typescript`-](https://www.npmjs.com/package/typescript) sekä [`ts-node`-paketteja](https://www.npmjs.com/package/ts-node). Nämä paketit on valmiiksi määritettynä tämän tehtäväpohjan [package.json](./package.json)-tiedostossa, joten niiden asentamiseksi sinun tarvitsee vain ajaa komento `npm install` tehtävän päähakemistossa:

```
$ npm install
```

Kun edellä mainitut paketit on asennettu, suosittelemme kokeilemaan asennuksen onnistumista seuraavasti esim. seuraavasti:

```
$ npx ts-node src/postalcodes.ts 00100
```

## Tehtäväpohja [./src/postalcodes.ts](./src/postalcodes.ts)

[Tehtäväpohjassa](./src/postalcodes.ts) on valmiiksi kirjoitettuna esimerkit tekstitiedostojen lukemiseen ja komentoriviparametrien käsittelyyn. Kun suoritat komennon `npx ts-node src/postalcodes.ts 00100`, tulosteen pitäisi näyttää seuraavalta:

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

Yllä käytetty komento skriptin suorittamiseksi koostuu muutamista osista, joista voit lukea lisää niiden alkuperäisistä lähteistä:

### Npx

**Npx** on komento, joka suorittaa npm-paketteja ilman, että niitä tarvitsee asentaa globaalisti. Tässä tapauksessa `npx ts-node`-yhdistelmä saa aikaan sen, että `npm_modules`-hakemistoon asennettu `ts-node`-työkalu käynnistetään.

> _"\[npx\] command allows you to run an arbitrary command from an npm package (either one installed locally, or fetched remotely), in a similar context as running it via `npm run`._"
>
> https://docs.npmjs.com/cli/v10/commands/npx

### Ts-node

**Ts-node** on työkalu, joka mahdollistaa TypeScript-koodin suorittamisen suoraan Node.js-ympäristössä, kääntäen sen JavaScriptiksi taustalla reaaliaikaisesti.

> _"`ts-node` is a TypeScript execution engine and REPL for Node.js. It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling. "_
>
> https://www.npmjs.com/package/ts-node

💡 _Node.js ei **vielä** tue TypeScriptiä suoraan, mutta on odotettavissa, että tulevissa versioissa TypeScriptiä voidaan suorittaa ilman käännösvaihetta tai kokeellisia ominaisuuksia._

### Tsc (TypeScript compiler)

**Tsc** on TypeScript-kääntäjä, joka tarkastaa TypeScript-lähdekoodisi virheiden varalta sekä koodisi standardin mukaiseksi JavaScriptiksi. Kun siis haluat kääntää kirjoittamasi ohjelman TypeScript-kielestä JavaScriptiksi, onnistuu se `npx`- ja `tsc`-komennoilla:

```
$ npx tsc
```

`tsc`-komento kääntää kirjoittamasi TypeScript-tiedostot JavaScript-tiedostoiksi `build`-hakemistoon, josta ne voidaan suorittaa Node.js:llä esimerkiksi euraavasti:

```
$ node build/postalcodes.js 00100
```

**Huom!** Ohjelmasi ei saa sisältää käännösvirheitä, tai kääntäminen ei onnistu. Voit halutessasi vain tarkastaa koodisi mahdollisten virheiden varalta komennolla [tsc --noEmit](https://www.typescriptlang.org/tsconfig#noEmit):

```
$ npx tsc --noEmit
```

Jos yllä oleva komento ei tulosta mitään, kaikki on kunnossa. `--noEmit` tarkoittaa, että käännettyjä tiedostoja ei tallenneta `build`-hakemistoon.

> _"Do not emit compiler output files like JavaScript source code, source-maps or declarations. This makes room for another tool like Babel, or swc to handle converting the TypeScript file to a file which can run inside a JavaScript environment."_
>
> No Emit - noEmit. https://www.typescriptlang.org/tsconfig#noEmit

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

Huomaa, että sama nimi voi esiintyä tiedostossa monen eri postinumeron kohdalla. Postinumerot puolestaan ovat uniikkeja ja esiintyvät aineistossa vain kerran. Numerot ja nimet ovat tiedostossa sekalaisessa järjestyksessä.

## Osa 1: Postitoimipaikka (40 %)

Kirjoita TypeScript-kielinen ohjelma [`src/postalcodes.ts`](./src/postalcodes.ts), joka kertoo postitoimipaikan nimen, kun sille annetaan parametrina postinumero.

Tehtävän ratkaisemiseksi ohjelmasi tulee etsiä csv-muotoisesta postinumeroaineistosta syötettyä postinumeroa vastaava nimi ja tulostaa se `console.log`-komennolla.

Esimerkkisuoritus:

    $ npx ts-node src/postalcodes.ts 00100
    Helsinki

[`postalcodes.ts`](./src/postalcodes.ts)-tiedostossa on valmiiksi toteutettuna operaatioita mm. tiedoston lukemiseksi sekä parametrien käsittelemiseksi, joista voi olla apua alkuun pääsemisessä.

Huolehdi ratkaisussasi siitä, että tuntemattoman postinumeron syöttäminen tai postinumeron syöttämättä jättäminen eivät kaada ohjelmaasi. Voit näissä tapauksissa joko tulostaa vapaamuotoisen virheilmoituksen tai jättää tulosteet kokonaan tekemättä.

## Osa 2: Postinumerot (60 %)

Muokkaa ohjelmaasi siten, että käyttäjä voi antaa komentoriviparametrina postinumeron sijasta myös nimen. Ohjelmasi tulee tällöin listata kaikki kyseiseen nimeen liittyvät postinumerot samalla rivillä **kasvavassa järjestyksessä**.

Tehtävän voi ratkaista useilla tavoilla, joten käytä hetki ongelman pohtimiseen ennen kuin ryhdyt koodaamaan. Olisiko esimerkiksi helpompaa jäsentää postinumeroaineisto etukäteen uudenlaiseksi tietorakenteeksi?

Esimerkkisuoritus:

    $ npx ts-node src/postalcodes.ts porvoo
    06100, 06101, 06150, 06151, 06200, 06400, 06401, 06450, 06500

Toteuta ohjelmasi siten, että syötetyn postitoimipaikan **kirjainkoolla ei ole merkitystä**. Huolehdi myös siitä, että tuntemattoman nimen syöttäminen ei kaada ohjelmaa.

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

### Interface

Mikäli haluat hyödyntää ohjelmassasi TypeScriptin tyyppimäärittelyjä, voit määritellä postinumerotietuetta varten esimerkiksi seuraavanlaisen `interface`:n:

```ts
// Katso lisää: https://www.typescriptlang.org/docs/handbook/2/objects.html
interface PostOffice {
  name: string;
  code: string;
}
```

## Postinumeroaineiston isenssi ja tekijänoikeudet

Tehtävän postinumeroaineiston käyttäminen edellytää [Postin postiumerotiedostoja koskevien käyttöehtojen](https://www.posti.fi/fi/asiakastuki/postinumerotiedostot) noudattamista. Voit tutustua [postinumeroaineiston palvelukuvaukseen ja käyttöehtoihin postin sivuilla](https://www.posti.fi/mzj3zpe8qb7p/1eKbwM2WAEY5AuGi5TrSZ7/33cfc2c66d2649af885b36e3935556a1/posti-postinumeropalvelut-palvelukuvaus-ja-kayttoehdot-20150101.pdf).

> _"Tietoja voi luovuttaa edelleen, mutta aineistoja luovutettaessa on huolehdittava siitä, että luovutuksensaajalla on tieto palvelun käyttöehdoista sekä tietojen latauspäivämäärästä."_
>
> Postinumero­tiedostot. https://www.posti.fi/fi/asiakastuki/postinumerotiedostot

## Tämä oppimateriaali

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Tehtävänannon, lähdekoodien ja testien toteutuksessa on hyödynnetty ChatGPT-kielimallia sekä GitHub copilot -tekoälyavustinta.
