class DNA extends Array {
    _fitness = 0;

    constructor(length) {
        super(length);

        for (let i = 0; i < length; i++) {
            this[i] = Math.random() <= 0.5; // Um gene tem 50% de chance de incluir ou não um Item
        }
    }

    calculateFitness(cargo) {
        let total_mass = 0;
        let total_volume = 0;
        let item_count = 0;

        this.forEach((item, index) => {
            if (this[index]) {
                total_mass += cargo[index].mass;
                total_volume += cargo[index].volume;
                item_count++;
            }
        });

        // Quanto mais itens incluidos, maior a aptidão
        this._fitness = item_count / cargo.length;

        // Combinações que ultrapassem o limite máximo de massa sofrem uma redução de 70% na aptidão
        if (total_mass > Cargo.MAX_MASS) {
            this._fitness *= Cargo.OVERMASS_PENALTY;
        }

        // Combinações que ultrapassem o limite máximo de volume sofrem uma redução de 70% na aptidão
        if (total_volume > Cargo.MAX_VOLUME) {
            this._fitness *= Cargo.OVERVOLUME_PENALTY;
        }

        // OBS.: A maior redução possível, caso ultrapasse ambos os limites, é de 91%

        // Transforma a função de fitness em uma função exponencial para considerar valores mais altos
        // como tendo um peso maior
        this._fitness = Math.pow(this._fitness, 4);
    }

    crossover(partner) {
        const child = new DNA(this.length);
        const midpoint = Math.floor(Math.random() * this.length);

        child.forEach((gene, index) => {
            child[index] = index > midpoint ? this[index] : partner[index];
        });

        return child;
    }

    mutate(mutation_rate) {
        this.forEach((gene, index) => {
            if (Math.random() < mutation_rate) {
                this[index] = Math.random() <= 0.5;
            }
        });

        return this;
    }

    getFitness() {
        return this._fitness;
    }

    toCargo(cargo) {
        // Converte a encodificação do gene (genótipo) numa representação (fenótipo) a ser utilizada
        let list = [];
        let total_mass = 0;
        let total_volume = 0;
        let item_count = 0;

        this.forEach((gene, index) => {
            if (gene) {
                let item = cargo[index];

                list.push(item.name);
                total_mass += item.mass;
                total_volume += item.volume;
                item_count++;
            }
        });

        return {
            list: list,
            total_mass,
            total_volume,
            item_count,
        };
    }
}
