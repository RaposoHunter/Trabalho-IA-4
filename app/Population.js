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

        this._cargo = Cargo.generateCargo();

        for(let i = 0; i < size; i++) {
            this[i] = new DNA(this._cargo.length);
        }

        this.calculateFitness();
    }

    calculateFitness()
    {
        this.forEach(dna => dna.calculateFitness(this._cargo));
    }

    naturalSelection()
    {
        this._mating_pool = [];
        const total_fitness = this.reduce((carry, dna) => carry + dna.getFitness() , 0);

        this.forEach((dna, index) => {
            if(dna.getFitness() != 0) {
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