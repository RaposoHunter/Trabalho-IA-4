class Population extends Array
{
    generations = 0;
    _finished = false;
    _mating_pool = [];
    _best = null;

    constructor(max_generations, mutation_rate, size)
    {
        super(size);

        this._max_generations = max_generations;
        this._mutation_rate = mutation_rate;

        // Gera os itens e seus parâmetros de maneira pseudo-randômica
        this._cargo = Cargo.generateCargo();

        for(let i = 0; i < size; i++) {
            this[i] = new DNA(this._cargo.length);
        }

        this.calculateFitness();
    }

    calculateFitness()
    {
        // Chama a função de fitness de cada cromossomo
        this.forEach(dna => dna.calculateFitness(this._cargo));
    }

    naturalSelection()
    {
        this._mating_pool = [];
        const total_fitness = this.reduce((carry, dna) => carry + dna.getFitness() , 0);

        // Gera a "Roda da Fortuna" de cromossomos
        this.forEach((dna, index) => {
            if(dna.getFitness() != 0) {
                // Cada cromossomo possuirá uma chance de ser escolhido baseado na
                // sua própria aptidão em relação com a aptidão todas da população
                if(this._mating_pool.length === 0) {
                    this._mating_pool.push({
                        dna,
                        prob: dna.getFitness() / total_fitness
                    });
                } else {
                    this._mating_pool.push({
                        dna,
                        prob: Math.min(this._mating_pool.at(-1).prob + (dna.getFitness() / total_fitness), 1)
                    });
                }
            }
        });
    }

    generate()
    {
        // Escolhe dois cromossomos aleatórios e os cruza para gerar um descendente
        this.forEach((dna, index) => {
            let random_pick = Math.random();
            const partner_a = this._mating_pool.find(function (area) {
                return area.prob >= random_pick;
            }).dna;

            random_pick = Math.random();
            const partner_b = this._mating_pool.find(function (area) {
                return area.prob >= random_pick;
            }).dna;

            const child = partner_a.crossover(partner_b);
            child.mutate(this._mutation_rate);

            this[index] = child;
        });

        this.generations++;
    }

    evaluate()
    {
        let max_fitness = 0;

        // Define qual o maior valor de fitness encontrado na geração e qual cromossomo o possui
        // Decide também se o algoritmo deve finalizar baseado no número máixmo de gerações
        this.forEach((dna) => {
            if(dna.getFitness() > max_fitness) {
                this._best = dna;
                max_fitness = dna.getFitness();
            }

            if(this.generations >= this._max_generations) {
                this._finished = true;
            }
        });
    }

    getAverageFitness()
    {
        // Cálcula a aptidão média
        // OBS.: o Math.pow está sendo utilizado para "reverter" o valor da aptidão
        // retornado pela função de fitness
        return this.reduce((carry, dna) => carry + Math.pow(dna.getFitness(), 1/4) , 0) / this.length;
    }

    getMutationRate()
    {
        return this._mutation_rate;
    }

    getCargo()
    {
        return this._cargo
    }

    isFinished()
    {
        return this._finished;
    }

    getBest()
    {
        return this._best?.toCargo(this._cargo);
    }
}