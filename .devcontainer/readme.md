# Kehityskontti

Jos haluat välttää asennusongelmia ja käyttää valmista ympäristöä, voit käyttää tässä projektissa olevaa valmista [kehityskontin määritystä](./devcontainer.json). Kehityskontti on ympäristö, jossa projektia ja VS Coden laajennoksia ajetaan [Docker-kontissa](https://www.docker.com/resources/what-container/). Kontti sisältää tyypillisesti valmiiksi kaikki tarvittavat työkalut ja riippuvuudet, mikä mahdollistaa työn yhtenäisessä ja toistettavassa ympäristössä.

Kontin avulla projektin työkalut ja riippuvuudet pysyvät erillään muusta järjestelmästä, mikä helpottaa projektin käyttöönottoa ja vähentää asennusongelmia. Kehityskonteilla voi olla myös tietoturvaetuja, sillä ne rajoittavat pääsyä muuhun järjestelmään ja tiedostoihin.


## Kontin suorittaminen paikallisesti

Jos haluat käyttää kehityskonttia paikallisesti, tarvitset [Docker-työkalun](https://www.docker.com/get-started) ja [Visual Studio Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) -laajennuksen.

Kun Docker ja laajennus ovat asennettu, avaa projekti VS Codessa. VS Code ehdottaa yleensä kansion avaamista kontissa. Jos ehdotusta ei näy, avaa komentopalkki (Ctrl+Shift+P) ja suorita komento "Dev Containers: Reopen in Container". Tämä rakentaa konttikuvan ja käynnistää uuden kontin, jonka sisään projektikansio on liitetty. Voit käyttää VS Code -terminaalia ajaaksesi komentoja kontissa.


### Paikallisten konttien pysäyttäminen ja poistaminen

Kehityskontit liittyvät tyypillisesti tiettyihin projekteihin ja kansioihin. Kun työskentelet useiden projektien parissa ajan myötä, saatat päätyä useisiin tarpeettomiin kontteihin, jotka vievät levytilaa.

Voit pysäyttää tai poistaa kontin Dockerin komentorivillä (`docker stop`, `docker rm`), Docker Desktopissa tai useilla VS Code -laajennuksilla. Voit myös käyttää VS Code -laajennuksen "Dev Containers: Clean Up Dev Containers" -komentoa poistaaksesi tarpeettomat kontit.


## Kontin suorittaminen pilvessä

Jos Dockerin asentaminen paikallisesti ei ole hyvä vaihtoehto, voit myös käyttää samaa kehityskonttia pilvipohjaisessa ympäristössä, kuten [GitHub Codespaces](https://github.com/features/codespaces). GitHub Codespaces mahdollistaa kehitysympäristön luomisen pilveen, johon voit käyttää selainta tai [paikallisesti asennettua VS Codea](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-github-codespaces-in-visual-studio-code). Käyttökokemus Codespacesissa on hyvin samankaltainen kuin paikallisen kehityskontin tai paikallisen asennuksen käyttäminen.

Voit avata projektin GitHub Codespacesissa noudattamalla [tätä ohjetta](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository). Kun olet avannut repositorion GitHubin verkkokäyttöliittymässä, voit luoda uuden codespacen napsauttamalla "Code"-painiketta repositorion etusivulla ja valitsemalla "Open with Codespaces". Tämä luo codespacen, joka käyttää samaa kehityskontin määritystä, joten saat käyttöön samat työkalut ja riippuvuudet kuin paikallisessa kontissa. Tämä voi olla kätevä vaihtoehto, jos haluat välttää Dockerin asentamisen tai työskennellä eri koneilla ilman ympäristön toistuvaa konfigurointia.


> [!NOTE]
> Pilvipohjaiset kehitysympäristöt ovat kaupallisia palveluita ja saattavat vaatia maksullisen tilauksen. Tarkista valitsemasi palvelun hinnoittelutiedot. Kirjoitushetkellä GitHub Codespaces tarjoaa ilmaisen tason, jossa on rajoitettu käyttöaika kuukaudessa, ja tarvittaessa lisäaikaa voidaan ostaa (katso [docs.github.com](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces)).


### Pilvipohjaisten konttien pysäyttäminen ja poistaminen

Kehityskonteilla on aika- ja tallennusrajoituksia, ja tallennustilan kulutus voi kasvaa nopeasti, erityisesti jos käytät useita suuria konteja tai säilytät niissä paljon dataa. Pysäytä ja poista kontit, joita et käytä, jotta et kuluta turhaan resursseja. Kontin pysäyttäminen lopettaa CPU-resurssien kulutuksen, mutta pysäytetyt kontit varaavat yhä tallennustilaa, kunnes ne poistetaan. Konttien poistaminen on turvallista, jos olet vienyt tekemäsi muutokset repositorioon, sillä kontti on vain väliaikainen työskentelyympäristö.

Lisätietoja konttien [pysäyttämisestä](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace) ja [poistamisesta](https://docs.github.com/en/codespaces/developing-in-a-codespace/deleting-a-codespace) löydät käyttämäsi palvelun dokumentaatiosta.
