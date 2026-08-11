# Node.js ja TypeScript

Tämän koodaustehtävän tavoitteena on luoda tarvittavat pohjatiedot myöhemmille tehtäville, joissa käsittelemme dataa ja testaamme ohjelmistoja [TypeScript-kielellä](https://www.typescriptlang.org/) Node.js-kehitysympäristössä. Kaikkien TypeScriptin ominaisuuksien opetteleminen etukäteen ei ole tarkoituksenmukaista, joten tässä tehtävässä tutustutaan tarvittaviin työkaluihin sekä perusrakenteisiin.

Tehtävän suorittamiseksi tarvitset [Node.js-suoritusympäristön](https://nodejs.org/) sekä npm-pakettienhallintasovelluksen, joka tulee tyypillisesti Node.js-asennuksissa mukana. Suosittelemme käyttämään tehtävissä [uusinta LTS-versiota (Long Term Support)](https://github.com/nodejs/release#release-schedule).

> ![TIP]
> Suosittelemme ratkaisemaan tämän tehtävän kehityskontissa, joka tarjoaa valmiiksi määritetyn ympäristön, jossa Node.js ja npm ovat asennettuina. Kehityskontti eristää projektin muusta käyttöjärjestelmästä, joten sillä voi olla myös positiivisia tietoturvavaikutuksia. Katso lisätietoja [kehityskontin readme.md-tiedostosta](./.devcontainer/readme.md).


## Tehtävän lähtökohta ja projektin valmistelu

Tästä projektista löytyy valmiina postinumeroaineistoa sisältävä CSV-tiedosto, joka on tallennettu [postalcodes.csv](./postalcodes.csv)-tiedostoon. Tehtävän tavoitteena on kirjoittaa TypeScript-kielinen ohjelma, joka pystyy etsimään postitoimipaikan nimen postinumeron perusteella sekä etsimään kaikki postinumerot tietyn postitoimipaikan nimen perusteella.

Projektista löytyy valmiina [src/postalcodes.ts](./src/postalcodes.ts)-tiedosto, johon sinun tulee kirjoittaa ohjelmasi. Tiedostossa on valmiiksi toteutettuna joitakin esimerkkejä, jotka helpottavat tiedoston lukemista ja komentoriviparametrien käsittelyä. Tehtävän ratkaisemiseksi sinun tulee muokata tätä tiedostoa siten, että se toteuttaa halutun toiminnallisuuden.

Aloita kokeilemalla annetun `postalcodes.ts`-tiedoston suorittamista komentoriviltä Node.js:llä:

```sh
node src/postalcodes.ts helsinki
```

```sh
node src/postalcodes.ts 00100
```

Jos Node.js on asennettu oikein, ohjelman pitäisi tulostaa taulukkona ensimmäiset rivit postinumeroaineistosta sekä toisessa taulukossa komentoriviparametrit. Tutustu myös lähdekooditiedostoon jotta ymmärrät miten esimerkit on toteutettu. Tehtävän seuraavissa vaiheissa koodia muokataan siten, että se pystyy etsimään postitoimipaikan nimen postinumeron perusteella sekä etsimään kaikki postinumerot postitoimipaikan nimen perusteella.


### TypeScriptin suorittaminen ja kääntäminen

Edellisessä komennossa TypeScript-kielinen lähdekooditiedosto suoritettiin suoraan Node.js:llä. Node.js:n uusimmat versiot tukevat TypeScript-koodin suorittamista suoraan, mutta merkittävillä rajoituksilla. Esimerkiksi [`tsconfig.json`-tiedoston](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) asetuksia ei tueta ja koodissa saa olla vain sellaisia ominaisuuksia, jotka voidaan yksinkertaisesti poistaa. Vastaavasti muissa suoritusympäristöissä, kuten selaimissa, TypeScript-koodia ei voida suorittaa suoraan, vaan ne vaativat koodin kääntämistä JavaScriptiksi.

TypeScript-koodin kääntämiseen käytetään [TypeScript-kääntäjää](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html), joka on asennettavissa npm-pakettina.


### Npm-projektin luominen (10 %)

Tässä tehtävässä tarvitset npm-pakettienhallinnasta sekä TypeScript-kääntäjän että Node.js:n tyyppimääritykset TypeScript-kielelle. Projektin riippuvuuksien hallitsemiseksi sinun tulee luoda npm-projekti, joka sisältää [package.json](./package.json)-tiedoston. Tämän tiedoston voit luoda suorittamalla projektin juurihakemistossa seuraavan komennon:

```sh
npm init
```

Anna komennon kysymyksiin sopivat vastaukset, mutta voit myös hyväksyä oletusarvoja painamalla Enter-näppäintä. Komento luo projektin juurihakemistoon [package.json](./package.json)-tiedoston, joka sisältää projektin perustiedot ja johon voidaan määritellä sen riippuvuudet.

Varmista projektin luonnin jälkeen, että TypeScript-tiedoston suorittaminen onnistuu edelleen:

```sh
node src/postalcodes.ts helsinki
```

Suorittaminen saattaa nyt kaatua virheeseen *"SyntaxError: Cannot use import statement outside a module"*. Tämä johtuu siitä, että Node.js ei oletuksena käytä ESM-syntaksia (`import` ja `export`), jota TypeScript käyttää, vaan CommonJS-syntaksia (`require` ja `module.exports`). Tämän ongelman ratkaisemiseksi sinun tulee lisätä [package.json](./package.json)-tiedostoon seuraava rivi tai muokata olemassa olevaa riviä vastaavasti:

```json
{
  "type": "module"
}
```

ESM-syntaksin käyttäminen on suositeltavaa ja voit tutustua aiheeseen tarkemmin [lukuisista eri lähteistä](https://www.google.com/search?q=commonjs+vs+esm+in+nodejs).


### Tietoturva ja .npmrc-tiedosto (10 %)

Ennen riippuvuuksien asentamista on hyvä varmistaa, että projektin asetukset ovat kunnossa. Npm-pakettien asentaminen lisää koneellesi uutta ohjelmakoodia, joka mahdollisesti suoritetaan heti asennuksen yhteydessä, joten on tärkeää huolehtia siitä, että asennettavat paketit ovat turvallisia. Paketeilla on usein riippuvuuksia toisiin paketteihin, mikä on johtanut aikaisemmin [ikäviin tietoturvaongelmiin myös luotettavien tahojen paketeissa](https://www.google.com/search?q=security+vulnerabilities+in+npm+packages) ([Axios]()).

Tässä tehtävässä sinun tulee lisätä projektin juurihakemistoon `.npmrc`-tiedosto, [johon voidaan määritellä npm:n asetuksia](https://docs.npmjs.com/cli/configuring-npm/npmrc).

**Ignore scripts**

Tiedostoon tulee lisätä seuraava rivi, joka estää skriptien suorittamisen pakettien asennuksen yhteydessä:

```sh
ignore-scripts=true
```

Kyseinen rivi estää npm-pakettien asennuksen yhteydessä mahdollisesti suoritettavat skriptit, jotka voivat olla haitallisia. Joissain tapauksissa ei-haitallisten pakettien asennus saattaa epäonnistua, mikäli ne vaativat skriptien suorittamista. Tällöin voit joutua tapauskohtaisesti sallimaan skriptien suorittamista. Voit lukea aiheesta lisää esimerkiksi [tästä blogista](https://www.nodejs-security.com/blog/npm-ignore-scripts-best-practices-as-security-mitigation-for-malicious-packages).

**Minimum release age**

Tapauksissa, joissa tunnettuun pakettiin on päätynyt syystä tai toisesta haavoittuva versio, ongelma havaitaan usein nopeasti ja ongelmaan julkaistaan korjaus. Tämän vuoksi [on suositeltavaa estää uusien pakettiversioiden asentaminen heti niiden julkaisun jälkeen](https://daniakash.com/posts/simplest-supply-chain-defense/), jolloin mahdolliset haavoittuvuudet voidaan havaita ja korjata. Tämä voidaan tehdä lisäämällä `.npmrc`-tiedostoon seuraava rivi:

```sh
minimum-release-age=7
```

Kyseinen rivi asentaa vain vähintään 7 päivää vanhoja pakettiversioita, jolloin mahdolliset haavoittuvuudet voidaan havaita ja korjata ennen kuin ne päätyvät asennettavaksi. Voit halutessasi määritellä myös toisen arvon kuin 7 päivää.

**Npmrc kotihakemistossa**

`.npmrc`-tiedosto voidaan lisäksi määritellä myös omaan kotihakemistoon, jolloin se vaikuttaa myös muihin kuin tämän projektin asetuksiin. Voit halutessasi luoda myös kotihakemistoon `.npmrc`-tiedoston, jota käytetään oletuksena myös niissä projekteissa, joissa ei ole omaa `.npmrc`-tiedostoa.


### TypeScriptin asentaminen (10 %)

[TypeScript-kääntäjä](https://www.npmjs.com/package/typescript) asennetaan tyypillisesti projektikohtaisesti kehitysaikaiseksi riippuvuudeksi eli se määritellään `package.json`-tiedostossa `devDependencies`-osioon. Asenna TypeScript [sen omien asennusohjeiden mukaisesti](https://www.typescriptlang.org/download/) npm-komennon avulla.

TypeScript ei sisällä oletuksena tietoa Node.js:n omien kirjastojen tyypeistä, joten asenna lisäksi [`@types/node`-paketti](https://www.npmjs.com/package/@types/node) kyseisen paketin asennusohjeiden mukaisesti.


### TypeScript-kääntäjä eli `tsc` (TypeScript compiler)

**Tsc** on TypeScript-kääntäjä, joka tarkastaa TypeScript-lähdekoodisi virheiden varalta sekä kääntää koodisi standardin mukaiseksi JavaScriptiksi. Kun siis haluat kääntää kirjoittamasi ohjelman TypeScript-kielestä JavaScriptiksi, onnistuu se `npx`- ja `tsc`-komennoilla. Varmista edellisen vaiheen asennuksen jäljiltä, että TypeScript-kääntäjä on asennettu oikein suorittamalla projektin juurihakemistossa seuraava komento:

```sh
npx tsc --version
```

```sh
npx tsc --help
```

Yllä `tsc`:n edessä esiintyvä `npx` on komento, joka suorittaa skriptejä npm-paketeista ilman, että paketteja tarvitsee asentaa globaalisti. Tässä tapauksessa `npx tsc`-yhdistelmä saa aikaan sen, että TypeScript-paketista löytyvä `tsc`-kääntäjä käynnistetään.

> _"\[npx\] command allows you to run an arbitrary command from an npm package (either one installed locally, or fetched remotely), in a similar context as running it via `npm run`._"
>
> https://docs.npmjs.com/cli/commands/npx


### Projektin kääntäminen (10 %)

Kun `tsc`:n toiminta on varmistettu, on aika kääntää projektin TypeScript-koodi JavaScriptiksi. Tämä onnistuu suorittamalla `tsc` juurihakemistossa ilman lisäparametreja:

```sh
npx tsc
```

Jos kääntäminen onnistuu, ei ruudulle tulostu mitään. Kääntäjä kuitenkin luo projektiin uuden hakemiston nimeltä `build`. Tähän hakemistoon luotiin TypeScript-lähdekoodien perusteella vastaavat JavaScript-tiedostot, jotka voidaan suorittaa Node.js:llä tai muissa JavaScript-ympäristöissä.

Tässä vaiheessa käännetty JavaScript-koodi näyttää melko samalta kuin alkuperäinen TypeScript-koodi, mutta laajemmissa projekteissa erot nousevat selkeämmin esiin.

Kokeile seuraavaksi suorittaa käännetty JavaScript-koodi `build`-hakemistosta Node.js:llä:

```sh
node build/postalcodes.js 00100
node build/postalcodes.js helsinki
```

> ![NOTE]
> TypeScript-kääntäjä lukee kääntämiseen liittyvät asetukset [`tsconfig.json`-tiedostosta](./tsconfig.json), joka on luotu valmiiksi mukana projektin juurihakemistossa. Siellä on määritettynä myös `outDir`- ja `rootDir`-asetukset, jotka kertovat kääntäjälle, että käännetyt JavaScript-tiedostot luodaan `build`-hakemistoon ja TypeScript-lähdekoodit löytyvät `src`-hakemistosta.
>
> Tässä tehtävässä sinun ei tarvitse tehdä muutoksia `tsconfig.json`-tiedostoon, mutta voit tutustua sen sisältöön ja asetuksiin, jotta ymmärrät miten TypeScript-kääntäjä toimii. Voit lukea lisää TypeScriptin asetuksista [TypeScriptin dokumentaatiosta](https://www.typescriptlang.org/tsconfig).


### `.gitignore`-tiedosto (10 %)

`node_modules`-hakemistoon asennettuja riippuvuuksia ja käännettyjä JavaScript-tiedostoja ei ole tapana lisätä versionhallintaan. Ne veisivät ylimääräistä tilaa ja lisäksi niihin tulevat muutokset aiheuttaisivat tarpeettomia konflikteja eri kehittäjien välillä. Tämän vuoksi on suositeltavaa lisätä projektin juurihakemistoon `.gitignore`-tiedosto, johon määritellään tiedostot ja hakemistot, joita ei haluta lisätä versionhallintaan. Lisää projektiin uusi `.gitignore`-tiedosto, johon määrittelet `node_modules`-hakemiston ja `build`-hakemiston pois versionhallinnasta.

Lisää `.gitignore` versionhallintaan ja varmista, että siinä määritellyt hakemistot eivät näy `git status`-komennon tulosteessa.


### Omat npm-skriptit (10 %)

Npm:n ja [package.json](./package.json)-tiedoston avulla voidaan määritellä [projektikohtaisia komentoja](https://docs.npmjs.com/cli/using-npm/scripts), jotka esimerkiksi suorittavat testejä tai kääntävät TypeScript-koodia JavaScriptiksi.

Lisää `package.json`-tiedostoon uusi `scripts`-lohko ja lohkoon uusi komento nimeltä `build`. Tämän komennon tulee kääntää TypeScript-tiedostot JavaScriptiksi käyttäen `tsc`-työkalua.

Tämän jälkeen voit kääntää koodin ja suorittaa sen esimerkiksi seuraavilla komennoilla:

```sh
# kääntää TypeScript-koodin JavaScriptiksi build-hakemistoon
npm run build

# käännetty koodi voidaan nyt suorittaa tavallisena JavaScriptinä:
node build/postalcodes.js 00100
node build/postalcodes.js porvoo
```

### "Full TypeScript support"

Node.js:n uusimmat versiot tukevat TypeScript-koodin suorittamista suoraan, mutta tietyillä rajoituksilla. Esimerkiksi `tsconfig.json`-tiedoston asetuksia ei tueta ja oletuksena koodissa saa olla vain sellaisia ominaisuuksia, jotka voidaan yksinkertaisesti poistaa:

> *"By default Node.js will execute TypeScript files that contains only erasable TypeScript syntax. Node.js will replace TypeScript syntax with whitespace, and no type checking is performed."*
>
> https://nodejs.org/docs/v24.12.0/api/typescript.html#type-stripping

Node.js:n dokumentaation artikkeli [Running TypeScript Natively](https://nodejs.org/en/learn/typescript/run-natively) tarjoaa lisätietoja TypeScript-koodin suorittamisesta Node.js:ssä. Käytännössä edistyneemmän TypeScript-koodin suorittamiseksi on kaksi lähestymistapaa: joko kääntää koodi JavaScriptiksi etukäteen TypeScript-kääntäjällä (ahead-of-time) tai käyttää työkaluja, jotka kääntävät TypeScriptiä samalla kun sitä suoritetaan (just-in-time).


### TypeScript Execute eli `tsx` (valinnainen)

> *"If you want more advanced processing of TypeScript than the built-in support, you have 2 options: use a runner (which handles much of the complexity for you), or handle it all yourself via transpilation."*
>
> https://nodejs.org/learn/typescript/run

Jos haluat suorittaa edistyneempää TypeScript-koodia ilman jatkuvaa kääntämistä, voit käyttää [esimerkiksi Node.js:n dokumentaatiossa](https://nodejs.org/learn/typescript/run) mainittua [`tsx`-työkalua](https://github.com/privatenumber/tsx). `tsx`-paketti voidaan asentaa projektin kehitysriippuvuuksiin seuraavasti:

```sh
npm install tsx --save-dev
```

Tämän jälkeen voit suorittaa TypeScript-koodisi suoraan `npx`:n ja `tsx`:n avulla:

```sh
npx tsx src/postalcodes.ts 00100
```

Node.js:n sisäänrakennettuun TypeScript-tukeen verrattuna `tsx`-työkalu tarjoaa tuen kaikille TypeScriptin ominaisuuksille, joten se soveltuu myös monimutkaisempien TypeScript-projektien suorittamiseen ilman etukäteiskääntämistä. Lisäksi se hyödyntää `tsconfig.json`-tiedostossa määritettyjä asetuksia.

Node.js:n TypeScript-ekosysteemissä on myös muita tapoja suorittaa koodia, esimerkiksi [`ts-node`-työkalu](https://www.npmjs.com/package/ts-node), jonka kehitys vaikuttaa olevan hiipumassa. Node.js:n "kilpailijat" kuten [Deno](https://deno.land/) ja [Bun](https://bun.sh/) tarjoavat myös TypeScriptin suorittamisen suoraan, mutta ne eivät ole yhteensopivia Node.js:n kanssa, joten niitä ei käsitellä tässä tehtävässä.


## Koodaustehtävä [./src/postalcodes.ts](./src/postalcodes.ts)

Kun projekti on valmisteltu, seuraa varsinainen koodaustehtävä, jossa valmista TypeScript-koodia jatkokehitetään siten, että se pystyy etsimään postitoimipaikan nimen postinumeron perusteella sekä etsimään kaikki postinumerot tietyn postitoimipaikan nimen perusteella. Voit halutessasi muokata koodia myös muilla tavoin, mutta tehtävän automaattisen testauksen vuoksi ohjelmasi tulee toimia samoilla komennoilla ja syötteillä kuin esimerkit ja tulosteiden täytyy olla samankaltaiset.

[Tehtäväpohjassa](./src/postalcodes.ts) on valmiiksi kirjoitettuna esimerkit tekstitiedostojen lukemiseen ja komentoriviparametrien tutkimiseen. Hyödynnä aikaisempien osioiden esimerkkejä ja suorita ohjelmasi. Suoritustavasta riippumatta tehtäväpohjan koodin tulosteen pitäisi olla seuraavanlainen:

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

CSV-tiedoston sisällön jälkeen tulostetaan toinen taulukko, jossa näkyy `process.argv`-arvot. Näiden tulosteiden on tarkoitus auttaa sinua alkuun pääsemisessä ja voit muokata koodin kaikkia osia tarpeidesi mukaan. Kokeile myös suorittaa ohjelmaa siten, että annat komentoriviparametrina postinumeron tai postitoimipaikan nimen, esimerkiksi seuraavasti:

```sh
# koodin kääntäminen:
npx tsc

# yksi parametri:
node build/postalcodes.js 00100

# kaksi parametria:
node build/postalcodes.js Napapiiri Rovaniemi

# yksi parametri, jossa on välilyöntejä:
node build/postalcodes.js "Napapiiri Rovaniemi"
```


### Postinumeroaineisto

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

Huomaa, että sama toimipaikan nimi voi esiintyä tiedostossa monen eri postinumeron kohdalla. Postinumerot puolestaan ovat uniikkeja ja esiintyvät aineistossa vain kerran. Rivit ovat tiedostossa sekalaisessa järjestyksessä.


### Ominaisuus 1: Postitoimipaikka (20 %)

Kirjoita TypeScript-kielinen ohjelma [`src/postalcodes.ts`](./src/postalcodes.ts), joka kertoo postitoimipaikan nimen, kun sille annetaan parametrina postinumero.

Tehtävän ratkaisemiseksi ohjelmasi tulee etsiä csv-muotoisesta postinumeroaineistosta syötettyä postinumeroa vastaava nimi ja tulostaa se `console.log`-komennolla.

> Esimerkkisuoritus:
>
> ```
> npx tsc
> node build/postalcodes.js 00100
> ```
>
> Ohjelman tuloste:
>
> ```
> Helsinki
> ```

[`postalcodes.ts`](./src/postalcodes.ts)-tiedostossa on valmiiksi toteutettuna operaatioita mm. tiedoston lukemiseksi sekä parametrien käsittelemiseksi, joista voi olla apua alkuun pääsemisessä.

Huolehdi ratkaisussasi siitä, että tuntemattoman postinumeron syöttäminen tai postinumeron syöttämättä jättäminen eivät kaada ohjelmaasi. Voit näissä tapauksissa joko tulostaa vapaamuotoisen virheilmoituksen tai jättää tulosteet kokonaan tekemättä.

> ![IMPORTANT]
> Tehtävien toimintalogiikan ja tekstikäyttöliittymän ei tarvitse noudattaa pilkulleen annettuja esimerkkejä, mutta niiden tulee olla oleellisilta osin samanlaiset. Automaattisen testauksen vuoksi ohjelmasi tulee toimia samoilla komennoilla ja syötteillä kuin esimerkit ja tulosteiden täytyy olla samankaltaiset.


### Ominaisuus 2: Postinumerot (20 %)

Muokkaa tässä osassa ohjelmaasi siten, että käyttäjä voi antaa komentoriviparametrina postinumeron sijasta myös postitoimipaikan nimen. Ohjelmasi tulee tässä tapauksessa listata kaikki kyseiseen nimeen liittyvät postinumerot yhdellä rivillä **kasvavassa järjestyksessä**.

Tehtävän voi ratkaista useilla tavoilla, joten käytä hetki ongelman pohtimiseen ennen kuin ryhdyt koodaamaan. Olisiko esimerkiksi helpompaa jäsentää postinumeroaineisto etukäteen uudenlaiseksi tietorakenteeksi, vai käydä läpi kaikki rivit ja kerätä arvoja taulukkoon?

> Esimerkkisuoritus:
>
> ```
> npx tsc
> node src/postalcodes.ts porvoo
> ```
>
> Ohjelman tulee tulostaa Porvoon postinumerot kasvavassa järjestyksessä:
>
> ```
> 06100, 06101, 06150, 06151, 06200, 06400, 06401, 06450, 06500
> ```

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
