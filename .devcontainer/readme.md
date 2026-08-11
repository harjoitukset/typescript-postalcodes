# Kehityskontti

Jos haluat välttää asennusongelmia ja käyttää valmista ympäristöä, voit käyttää tässä projektissa valmiina olevaa [kehityskontin määritystä](./devcontainer.json). [Kehityskontti](https://code.visualstudio.com/docs/devcontainers/containers) mahdollistaa projektin ja VS Code -ympäristön suorittamisen [Docker-kontissa](https://www.docker.com/resources/what-container/).

Kontin avulla projektin työkalut ja riippuvuudet ovat eristetty muusta järjestelmästä, mikä helpottaa projektien käyttöönottoa ja vähentää asennusongelmia. Kehityskonteilla voi olla myös tietoturvaan liittyviä etuja, koska ne rajoittavat pääsyä muuhun järjestelmään ja tiedostoihin.


## Kontin suorittaminen paikallisesti

Jos haluat käyttää kehityskonttia paikallisesti, tarvitset [Docker-työkalun](https://www.docker.com/get-started) ja [Visual Studio Code Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) -laajennuksen.

Kun Docker ja laajennus on asennettu, voit avata projektin VS Codessa ja sen pitäisi ehdottaa kansion avaamista kontissa. Jos näin ei tapahdu, voit avata komentopalkin (Ctrl+Shift+P) ja suorittaa komennon "Dev Containers: Reopen in Container". Tämä käynnistää uuden konttin ja voit käyttää VS Coden terminaalia ajaaksesi komentoja kontissa.


### Paikallisten konttien pysäyttäminen ja poistaminen

Kehityskontit liittyvät tyypillisesti tiettyihin projekteihin ja kansioihin. Kun työskentelet useiden projektien parissa ajan myötä, saatat päätyä useisiin tarpeettomiin kontteihin, jotka vievät levytilaa.

Voit pysäyttää tai poistaa kontin Docker CLI -komentorivityökalulla, Docker Desktop -sovelluksella tai useilla VS Code -laajennuksilla. Voit myös käyttää VS Coden Dev Containers -laajennusta poistaksesi tarpeettomat kontit: avaa komentopalkki (Ctrl+Shift+P) ja suorita komento "Dev Containers: Clean Up Dev Containers".


## Kontin suorittaminen pilvessä

Jos Dockerin asentaminen paikallisesti ei ole hyvä vaihtoehto, voit myös käyttää samaa kehityskonttia pilvipohjaisessa ympäristössä, kuten [GitHub Codespaces](https://github.com/features/codespaces). GitHub Codespaces mahdollistaa kehitysympäristön luomisen pilveen, johon voit käyttää selainta tai [paikallisesti asennettua VS Codea](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-github-codespaces-in-visual-studio-code). Käyttökokemus Codespacesissa on hyvin samankaltainen kuin paikallisen kehityskontin tai paikallisen asennuksen käyttäminen.

Voit avata projektin GitHub Codespacesissa noudattamalla [tätä ohjetta](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository). Kun olet avannut repositorion GitHubin web-käyttöliittymässä, voit luoda uuden codespacen napsauttamalla "Code" -painiketta repositorion etusivulla ja valitsemalla "Open with Codespaces". Tämä luo uuden codespacen, joka käyttää samaa kehityskontin määritystä, joten saat käyttöön samat työkalut ja riippuvuudet kuin jos käyttäisit sitä paikallisesti. Tämä voi olla kätevä vaihtoehto, jos haluat välttää Dockerin asentamisen tai jos haluat työskennellä eri koneilla ilman, että sinun tarvitsee asettaa ympäristöä joka kerta uudelleen.

>![NOTE]
> Pilvipohjaiset kehitysympäristöt ovat kaupallisia palveluita ja saattavat vaatia maksullisen tilauksen. Tarkista aina valitsemasi palvelun hinnoittelutiedot. Kirjoitushetkellä GitHub Codespaces tarjoaa ilmaisen tason, jossa on rajoitettu käyttöaika kuukaudessa, ja tarvittaessa lisäaikaa voidaan ostaa (katso [docs.github.com](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces)).


### Pilvipohjaisten konttien pysäyttäminen ja poistaminen

Kehityskonteilla on aika- ja tallennusrajoituksia, ja tallennusrajoja voidaan ylittää, erityisesti mikäli sinulla on useita suuria kontteja tai paljon dataa kontissa. Jotta et kuluta turhaan resursseja, sinun kannattaa pysäyttää ja poistaa kontit, joita et käytä. Kontin pysäyttäminen lopettaa CPU-resurssien kulutuksen, mutta pysäytetyt kontit varaavat yhä tallennustilaa, kunnes ne poistetaan. Konttien poistaminen on turvallista, jos olet vienyt tekemäsi muutokset repositorioon, sillä kontti on vain väliaikainen ympäristö projektin työskentelyyn.

Lisätietoja konttien [pysäyttämisestä](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace) ja [poistamisesta](https://docs.github.com/en/codespaces/developing-in-a-codespace/deleting-a-codespace) löydät käyttämäsi palvelun dokumentaatiosta.
