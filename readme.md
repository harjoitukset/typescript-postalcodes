# TypeScript & postinumerot

Tämän koodaustehtävän tavoitteena on luoda tarvittavat pohjatiedot seuraavien viikkojen tehtäville, joissa käsittelemme dataa ja testaamme ohjelmistoja [TypeScript-kielellä](https://www.typescriptlang.org/). Kaikkien kielen ominaisuuksien opetteleminen etukäteen ei ole kurssin kannalta tarkoituksenmukaista, joten tässä tehtävässä tutustutaan tarvittaviin työkaluihin sekä perusrakenteisiin.

Tehtävässä voi olla hyötyä esim. omista funktioista ja omien tietotyyppien määrittelemisestä, mutta ne eivät ole välttämättömiä.


## GitHub classroom

Tehtävät arvostellaan käyttäen [GitHub classroom](https://classroom.github.com/) -palvelua, joka suorittaa ohjelmasi ja tarkastaa sekä pisteyttää tulokset automaattisesti. Taustalla GitHub classroom hyödyntää [GitHub actions](https://github.com/features/actions) -nimistä jatkuvan integroinnin palvelua, johon tutustumme kurssilla lisää myöhemmillä viikoilla.

Voit tarvittaessa lähettää tehtävän tarkastettavaksi monta kertaa. Tee tällöin uusi commit ja vie (push) muutokset GitHubiin.

Tehtävien toimintalogiikan ja "käyttöliittymän" ei tarvitse noudattaa pilkulleen annettuja esimerkkejä, mutta toimintalogiikan tulee olla oleellisilta osin samanlainen. Automaattisen arvioinnin vuoksi ohjelmasi tulee toimia täsmälleen samoilla komennoilla ja syötteillä kuin esimerkit.


## Tehtävän kloonaaminen

Kun olet hyväksynyt tehtävän GitHub classroomissa ja saanut repositoriosta henkilökohtaisen kopion, kloonaa se itsellesi `git clone` -komennolla. Siirry sen jälkeen VS Codeen editoimaan tiedostoja.

Kloonatessasi repositoriota **varmista, että Git-osoitteen lopussa on oma GitHub-käyttäjänimesi**. Jos käyttäjänimesi puuttuu osoitteesta, kyseessä ei ole henkilökohtainen kopiosi tehtävästä. Luo tässä tapauksessa oma classroom-kopio tehtävästä itsellesi Teams-tehtävästä löytyvän linkin avulla.


## Ratkaisun lähettäminen

Kun olet saanut tehtävät tai osan niistä ratkaistua, lisää tiedostoihin tekemäsi muutokset versionhallintaan `git add` ja `git commit` -komennoilla. Lähetä ratkaisut arvioitavaksi `git push`-komennolla. Git push käynnistää automaattisesti workflow:n, joka testaa ohjelmasi ja antaa sen eri kohdista joko hyväksytyn tai hylätyn tuloksen.

Kun GitHub Actions on saanut koodisi suoritettua, näet tuloksen GitHub-repositoriosi [Actions-välilehdellä](../../actions/workflows/classroom.yml). Arvioinnin valmistumiseen menee tyypillisesti noin pari minuuttia.

Klikkaamalla yllä olevan linkin takaa viimeisintä "GitHub Classroom Workflow" -suoritusta, saat tarkemmat tiedot tehtävän arvioinnista. Sivun alaosassa näkyy myös saamasi pisteet. Klikkaamalla "Autograding"-työvaihetta pääset katsomaan tarkemmin arvioinnissa suoritetut yksittäiset vaiheet ja niiden tulokset:

![GitHub actions](./github-actions.png)


## Riippuvuuksien asentaminen ja ohjelman suoritus

Tehtävän suorittamiseksi tarvitset Node.js:n, [`typescript`-paketin](https://www.npmjs.com/package/typescript) sekä [`ts-node`-paketin](https://www.npmjs.com/package/ts-node). Node.js:n tulee löytyä kehitysympäristöstäsi valmiina.

`typescript` ja `ts-node` ovat valmiiksi määritettynä tämän tehtäväpohjan [package.json](./package.json)-tiedostossa, joten niiden asentamiseksi sinun tarvitsee vain ajaa komento `npm install` tehtävän päähakemistossa:

```
$ npm install
```

Kun edellä mainitut paketit on asennettu, suosittelemme kokeilemaan asennuksen onnistumista seuraavasti esim. seuraavasti:

```
$ npx ts-node src/postalcodes.ts 00100
```

Tehtäväpohjassa on valmiiksi kirjoitettuna esimerkit tekstitiedostojen lukemiseen ja komentoriviparametrien käsittelyyn, ja sen tulosteen pitäisi näyttää esim. seuraavalta:

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

Edellä käytetty komento skriptin suorittamiseksi koostuu muutamista osista/vaiheista, joista voit lukea lisää niiden alkuperäisistä lähteistä:

### Npx

> *"\[npx\] command allows you to run an arbitrary command from an npm package (either one installed locally, or fetched remotely), in a similar context as running it via `npm run`.*"
>
> https://docs.npmjs.com/cli/v9/commands/npx

### Ts-node

> *"`ts-node` is a TypeScript execution engine and REPL for Node.js. It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling. "*
>
> https://www.npmjs.com/package/ts-node

### Tsc

Jos haluat kääntää kirjoittamasi ohjelman TypeScript-kielestä JavaScriptiksi, onnistuu se `tsc`-komennolla (TypeScript compiler).

```
$ npx tsc
```

`tsc`-komento kääntää kirjoittamasi TypeScript-tiedostot JavaScript-tiedostoiksi `build`-hakemistoon, josta ne voidaan suorittaa Node.js:llä seuraavasti:

```
$ node build/postalcodes.js 00100
```

**Huom!** Ohjelmasi ei saa aiheuttaa käännösvirheitä tai varoituksia. Voit tarkastaa koodisi mahdollisten virheiden varalta komennolla [tsc --noEmit](https://www.typescriptlang.org/tsconfig#noEmit):

```
$ npx tsc --noEmit
```

Jos yllä oleva komento ei tulosta mitään, kaikki on kunnossa. `--noEmit` tarkoittaa, että käännettyjä tiedostoja ei tallenneta `build`-hakemistoon.

> *"Do not emit compiler output files like JavaScript source code, source-maps or declarations. This makes room for another tool like Babel, or swc to handle converting the TypeScript file to a file which can run inside a JavaScript environment."*
>
> No Emit - noEmit. https://www.typescriptlang.org/tsconfig#noEmit


## Postinumeroaineisto

Tässä tehtävässä hyödynnetään CSV-muotoon tallennettua postinumeroaineistoa, joka löytyy tiedostosta [postalcodes.csv](./postalcodes.csv). Aineisto on muodostettu [Postin postiumerotiedostojen](https://www.posti.fi/fi/asiakastuki/postinumerotiedostot) pohjalta 5.1.2023.

Tiedostossa kukin postinumero ja siihen liittyvä nimi esiintyvät omalla rivillään, esim. seuraavasti:

```
79700,Heinävesi
86240,Pyhänkoski
97390,Kierinki
00900,Helsinki
02760,Espoo
02140,Espoo
...
```

Sama nimi voi esiintyä tiedostossa monen eri numeron kohdalla. Numerot ja nimet ovat tiedostossa sekalaisessa järjestyksessä.


## Osa 1: Postitoimipaikka (2 pistettä)

Kirjoita TypeScript-kielinen ohjelma `src/postalcodes.ts`, joka kertoo postitoimipaikan nimen, kun sille annetaan parametrina postinumero.

Tehtävän ratkaisemiseksi ohjelmasi tulee etsiä csv-muotoisesta postinumeroaineistosta syötettyä postinumeroa vastaava nimi ja tulostaa se `console.log`-komennolla.

Esimerkkisuoritus:

    $ npx ts-node src/postalcodes.ts 00100
    Helsinki

Huolehdi siitä, että tuntemattoman postinumeron syöttäminen tai postinumeron syöttämättä jääminen ei kaada ohjelmaa. Voit näissä tapauksissa joko tulostaa vapaamuotoisen virheilmoituksen tai jättää tulosteet kokonaan tekemättä.

Tiedoston pohjassa [src/postalcodes.ts](./src/postalcodes.ts) on valmiiksi esimerkkikoodeja, jotka auttavat sinut alkuun tiedoston lukemisessa ja parametrin käsittelyssä.


## Osa 2: Postinumerot (3 pistettä)

Muokkaa ohjelmaasi siten, että käyttäjä voi antaa komentoriviparametrina postinumeron sijasta myös nimen. Ohjelmasi tulee tällöin listata kaikki kyseiseen nimeen liittyvät postinumerot samalla rivillä **kasvavassa järjestyksessä**.

Tehtävän voi ratkaista useilla tavoilla, joten käytä hetki ongelman pohtimiseen ennen kuin ryhdyt koodaamaan. Olisiko esimerkiksi helpompaa jäsentää postinumeroaineisto etukäteen uudenlaiseksi tietorakenteeksi?

Esimerkkisuoritus:

    $ npx ts-node src/postalcodes.ts porvoo
    06100, 06101, 06150, 06151, 06200, 06400, 06401, 06450, 06500

Toteuta ohjelmasi siten, että syötetyn postitoimipaikan **kirjainkoolla ei ole merkitystä**. Huolehdi myös siitä, että tuntemattoman nimen syöttäminen ei kaada ohjelmaa.


## Vinkkejä

CSV-tiedostossa olevien rivien pilkkominen onnistuu merkkijonon [`split`-metodilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split):

```js
let [numero, nimi] = '00730,Helsinki'.split(',');
```

Mikäli haluat hyödyntää ohjelmassasi TypeScriptin tyyppimäärittelyjä, voit määritellä postinumerotietuetta varten esimerkiksi seuraavanlaisen `interface`:n:

```ts
// Katso lisää: https://www.typescriptlang.org/docs/handbook/2/objects.html
interface PostOffice {
    name: string;
    code: string;
}
```

Postinumeroiden järjestäminen onnistuu taulukon [`sort`-metodilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort):

```ts
let codes: string[] = ...;
codes.sort();
```

Postinumeroiden yhdistäminen taulukosta pilkuilla erotelluksi listaksi onnistuu esim. [`join`-metodilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join):


```ts
console.log(codes.join(', '));
```

Valmiiksi asetettujen pakettien lisäksi saat lisätä `package.json`-tiedostoon myös muita paketteja, mutta se ei ole tehtävän ratkaisemiseksi välttämätöntä.


## Tehtävän ratkaiseminen JavaScriptillä

Tehtävä on mahdollista ratkaista myös JavaScriptillä, joskin se ei ole oppimisen näkökulmasta suositeltavaa. Mikäli ratkaiset tehtävän ilman TypeScriptiä, luo itse tarvitsemasi JS-tiedostot ja muuta [package.json](./package.json)-tiedostossa `start`-skriptin tilalle oman ohjelmasi käynnistyskomento, esim. `node ./src/postalcodes.js`. Tehtävän tarkastuksessa ohjelmasi suoritetaan esim. seuraavilla komennoilla, joten varmista että ne toimivat:

```sh
$ npm install

$ npm start 00100
Helsinki

$ npm start helsinki
00002, 00100, 00101, 00120...
```


## Lisenssit ja tekijänoikeudet

Tehtävän postinumeroaineiston käyttäminen edellytää [Postin postiumerotiedostoja koskevien käyttöehtojen](https://www.posti.fi/fi/asiakastuki/postinumerotiedostot) noudattamista. Voit tutustua [postinumeroaineiston palvelukuvaukseen ja käyttöehtoihin postin sivuilla](https://www.posti.fi/mzj3zpe8qb7p/1eKbwM2WAEY5AuGi5TrSZ7/33cfc2c66d2649af885b36e3935556a1/posti-postinumeropalvelut-palvelukuvaus-ja-kayttoehdot-20150101.pdf).

> *"Tietoja voi luovuttaa edelleen, mutta aineistoja luovutettaessa on huolehdittava siitä, että luovutuksensaajalla on tieto palvelun käyttöehdoista sekä tietojen latauspäivämäärästä."*
>
> Postinumero­tiedostot. https://www.posti.fi/fi/asiakastuki/postinumerotiedostot

