
class ValidaceFormulare {
    constructor(jmenoInput, prijmeniInput, vekInput, telefonInput) {
        this.jmenoInput = jmenoInput;
        this.prijmeniInput = prijmeniInput;
        this.vekInput = vekInput;
        this.telefonInput = telefonInput;

        this.formatTelefonu();
    }



    
    //Validace formuláře
    validaceForm() {
        
        (() => {
        
        // Validace na straně uživatele
        // Načíst všechny formuláře, na které chceme aplikovat vlastní Bootstrap validační styly
        const forms = document.querySelectorAll('.needs-validation')

        // Procházení formulářů pomoci smyčky a zabaranění odeslání formuláře
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            this.jmenoInput.classList.add('was-validated');
            this.prijmeniInput.classList.add('was-validated');
            form.classList.add('was-validated')
            }, false)
        })
        })();

        
        /**
         *  Validace na straně aplikace
         *  @overeniValidaceFormulare = bolean, který se posílá do _nastav událost
         * 
         */

        let overeniValidaceFormulare = true;
        //validace jmena
        if (!this.jmenoInput.value || !/^[A-Z][a-z ]+$/.test(this.jmenoInput.value)) {
            overeniValidaceFormulare = false;
            this.jmenoInput.classList.add("is-valid");
        } else {
            this.jmenoInput.classList.remove("is-valid");
        }

        //validace prijmeni
        if (!this.prijmeniInput.value || !/^[A-Z][a-z ]+$/.test(this.prijmeniInput.value)) {
            overeniValidaceFormulare = false;
            this.prijmeniInput.classList.add("is-valid");
        } else {
            this.prijmeniInput.classList.remove("is-valid");
        }

        //validace věku
        if (!this.vekInput.value || !Number(this.vekInput.value) || Number(this.vekInput.value) < 0) {
            overeniValidaceFormulare = false;
            this.prijmeniInput.classList.add("is-valid");
        } else {
            this.prijmeniInput.classList.remove("is-valid");
        }

        //validace telefonního čísla
        if (!this.telefonInput.value || !/^\d{3} \d{3} \d{3}$/.test(this.telefonInput.value)) {
            overeniValidaceFormulare = false;
            this.telefonInput.classList.add("is-valid");
        } else {
            this.telefonInput.classList.remove("is-valid")
        }

        return overeniValidaceFormulare;

    }
        
    // Funkce, která přijíma vstup od uživatele a upravuje jí do požadovaného formátu v HTML inputu
    formatTelefonu() {
        const telefonInput = document.getElementById("telefon");

        telefonInput.addEventListener("input", (event) => {
            const cislo = event.target.value.replace(/\s/g, "");
            event.target.value = cislo.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
        });
    }




        
        
    

        
        


}
