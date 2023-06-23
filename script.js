let max_generations = 3000;
let mutation_rate = 0.01;
let population_size = 200;
let loop = null;
const select_max_generations = document.getElementById("max_generations");
const select_mutation_rate = document.getElementById("mutation_rate");
const select_population_size = document.getElementById("population_size");
const ul = document.getElementById("final__result__ul");

let li_elements = [];

function start() {
    const population = new Population(
        max_generations,
        mutation_rate,
        population_size
    );
    document.getElementById("statistics__total__population").innerHTML =
        population.length;
    document.getElementById("statistics__mutation__rate").innerHTML =
        population.getMutationRate() * 100 + "%";

    population.getCargo().forEach((element, index) => {
        const li = document.createElement("li");
        li.id = `Item_${index + 1}`;
        li.innerHTML = `${element.name} - ${element.volume} m³ - ${element.mass} Kg`;
        li_elements.push(li);
        ul.appendChild(li);
    });

    loop = setInterval(function () {
        population.naturalSelection();
        population.generate();
        population.calculateFitness();
        population.evaluate();

        li_elements.forEach((element, index) => {
            if (
                population.getBest().list.includes(element.id.replace("_", " "))
            ) {
                element.classList.add("selected");
            } else {
                element.classList.remove("selected");
            }
        });

        document.getElementById("statistics__total__generations").innerHTML =
            population.generations;
        document.getElementById("statistics__average__fitness").innerHTML =
            population.getAverageFitness().toFixed(4);

        // document.querySelectorAll('.attempt').forEach(el => el.remove());

        // for(let i = 0; i < Math.min(population.length, 50); i++) {
        //     const attemp = document.createElement('span');
        //     attemp.className = 'attempt';
        //     attemp.innerHTML = getPharse(this.getBest())
        //     document.getElementById('right__container').appendChild(attemp);
        // }

        if (population.isFinished()) {
            clearInterval(loop);

            document.getElementById("statistics__items__total").innerHTML =
                population.getBest().item_count;
            document.getElementById(
                "statistics__items__mass"
            ).innerHTML = `${population.getBest().total_mass.toFixed(2)} Kg`;
            document.getElementById(
                "statistics__items__volume"
            ).innerHTML = `${population.getBest().total_volume.toFixed(2)} m³`;
        }
    }, 1);
}

document.getElementById("reset__game__button").addEventListener("click", () => {
    select_max_generations.value = "3000";
    select_mutation_rate.value = "0.01";
    select_population_size.value = "200";
});

document.getElementById("start__game__button").addEventListener("click", () => {
    max_generations = parseInt(select_max_generations.value);
    mutation_rate = parseFloat(select_mutation_rate.value);
    population_size = parseInt(select_population_size.value);
    document.getElementById("start__game").style.display = "none";
    document.getElementById("show__statistics").style.display = "block";
    start();
});

document.getElementById("back__button").addEventListener("click", () => {
    document.getElementById("start__game").style.display = "block";
    document.getElementById("show__statistics").style.display = "none";
    document.getElementById("final__result__ul").innerHTML = "";
    document.getElementById("statistics__items__total").innerHTML =
        "Calculando...";
    document.getElementById("statistics__items__mass").innerHTML =
        "Calculando...";
    document.getElementById("statistics__items__volume").innerHTML =
        "Calculando...";
    clearInterval(loop);
});
