'use strict'


class ZaznamyPojistencu {
    constructor(jazyk = "cs-CZ") {
        const zaznamyZeStorage = localStorage.getItem("zaznamy");
        this.zaznamy = zaznamyZeStorage ? JSON.parse(zaznamyZeStorage) : [];
        this.jazyk = jazyk;


        this.jmenoInput = document.getElementById("jmeno");
        this.prijmeniInput = document.getElementById("prijmeni");
        this.vekInput = document.getElementById("vek");
        this.telefonInput = document.getElementById("telefon");
        this.ulozBtn = document.getElementById("ulozBtn");
        this.vypisElement = document.getElementById("seznam-pojistencu");

        this._nastavUdalost();
        this.validace = new ValidaceFormulare(this.jmenoInput, this.prijmeniInput, this.vekInput, this.telefonInput);
        
    }




    //nastavení tlačítka ulož
    _nastavUdalost() {

        this.ulozBtn.onclick = () => {

            if (this.validace.validaceForm()) {
                const zaznam = new ZaznamPojistence(this.jmenoInput.value, this.prijmeniInput.value, this.vekInput.value, this.telefonInput.value);
                this.zaznamy.push(zaznam);
                this.ulozZaznamy();
                this.vypisZaznamy();
            }
        };
    }

    
    

    //vypsání záznamu pojištěnců do tabulky
    vypisZaznamy() {
        const zaznamy = this.zaznamy;
        const nadpis = document.createElement('h2');
        nadpis.innerHTML = 'Seznam pojištěnců';
        nadpis.classList.add('mt-5')

        const tabulka = document.createElement('table');
        tabulka.classList.add('table', 'table-striped', 'table-hover');
        const hlavicka = document.createElement('thead');
        hlavicka.innerHTML = `
            <tr>
                <th scope="col">#</th>
                <th scope="col">Jméno</th>
                <th scope="col">Příjmení</th>
                <th scope="col">Věk</th>
                <th scope="col">Telefon</th>
                <th scope="col"></th>
            </tr>
        `;
        tabulka.appendChild(hlavicka);

        const telo = document.createElement('tbody')

        for (let i = 0; i < zaznamy.length; i++) {
            const radek = document.createElement('tr');
            radek.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${zaznamy[i].jmeno}</td>
            <td>${zaznamy[i].prijmeni}</td>
            <td>${zaznamy[i].vek}</td>
            <td class="text-nowrap">${zaznamy[i].telefon}</td>
            `;
            telo.appendChild(radek);

            const tlacitkoSmazat = document.createElement('button');
            tlacitkoSmazat.innerHTML = 'Smazat';
            tlacitkoSmazat.classList.add('btn', 'btn-danger')
            tlacitkoSmazat.addEventListener('click', () => {
                if (confirm('Opravdu si přejete smazat tento záznam?')) {
                    zaznamy.splice(i, 1);
                    localStorage.setItem('zaznamy', JSON.stringify(zaznamy));
                    this.vypisZaznamy();
                }
            });

            const sloupecSmazat = document.createElement('td');
            sloupecSmazat.appendChild(tlacitkoSmazat);
            radek.appendChild(sloupecSmazat);

            tabulka.appendChild(telo);
        }

        const container = document.getElementById('container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(nadpis);
        container.appendChild(tabulka);
        
    }


    //uloz zaznamy do storage
    ulozZaznamy() {
        localStorage.setItem("zaznamy", JSON.stringify(this.zaznamy));
    }
}




